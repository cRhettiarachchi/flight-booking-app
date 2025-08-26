import { TFlight, TFlightSearchResult, TFlightPair } from '@/utils/types'
import { TFlightQueryParams } from '@/utils/validation'
import { flightStorageService } from './flightStorage.service'

// Sorting utility functions
const sortFlights = (
  flights: TFlight[],
  sortBy: 'price' | 'departure' | 'arrival',
  sortOrder: 'asc' | 'desc',
): TFlight[] => {
  return [...flights].sort((a, b) => {
    let valueA: number | string
    let valueB: number | string

    switch (sortBy) {
      case 'price':
        valueA = a.price
        valueB = b.price
        break
      case 'departure':
        valueA = new Date(a.departure).getTime()
        valueB = new Date(b.departure).getTime()
        break
      case 'arrival':
        valueA = new Date(a.arrival).getTime()
        valueB = new Date(b.arrival).getTime()
        break
      default:
        return 0
    }

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })
}

const sortFlightPairs = (
  pairs: TFlightPair[],
  sortBy: 'price' | 'departure' | 'arrival',
  sortOrder: 'asc' | 'desc',
): TFlightPair[] => {
  return [...pairs].sort((a, b) => {
    let valueA: number | string
    let valueB: number | string

    switch (sortBy) {
      case 'price':
        valueA = a.totalPrice
        valueB = b.totalPrice
        break
      case 'departure':
        // Sort by outbound departure time for round trips
        valueA = new Date(a.outbound.departure).getTime()
        valueB = new Date(b.outbound.departure).getTime()
        break
      case 'arrival':
        // Sort by return arrival time for round trips
        valueA = new Date(a.return.arrival).getTime()
        valueB = new Date(b.return.arrival).getTime()
        break
      default:
        return 0
    }

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })
}

const searchFlights = async ({
  source,
  departure,
  destination,
  return: returnDate,
  page = 1,
  limit = 10,
  sortBy,
  sortOrder = 'asc',
}: TFlightQueryParams): Promise<TFlightSearchResult> => {
  // Validate required parameters
  if (!source || !destination || !departure) {
    throw new Error('Source, destination, and departure date are required')
  }

  // Normalize input parameters
  const normalizedSource = source.trim().toUpperCase()
  const normalizedDestination = destination.trim().toUpperCase()

  // Determine trip type based on return date
  const isRoundTrip = !!returnDate

  if (isRoundTrip) {
    return await handleRoundTripSearch({
      source: normalizedSource,
      destination: normalizedDestination,
      departure,
      returnDate: returnDate!,
      page,
      limit,
      sortBy,
      sortOrder,
    })
  } else {
    return await handleOneWaySearch({
      source: normalizedSource,
      destination: normalizedDestination,
      departure,
      page,
      limit,
      sortBy,
      sortOrder,
    })
  }
}

const handleOneWaySearch = async ({
  source,
  destination,
  departure,
  page,
  limit,
  sortBy,
  sortOrder,
}: {
  source: string
  destination: string
  departure: string
  page: number
  limit: number
  sortBy?: 'price' | 'departure' | 'arrival'
  sortOrder?: 'asc' | 'desc'
}): Promise<TFlightSearchResult> => {
  // Get all flights matching the criteria from storage
  const allFlights = await flightStorageService.searchFlights({
    source,
    destination,
    departure,
  })

  // Apply sorting if specified
  const sortedFlights = sortBy
    ? sortFlights(allFlights, sortBy, sortOrder || 'asc')
    : allFlights

  // Calculate pagination
  const total = sortedFlights.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedFlights = sortedFlights.slice(startIndex, endIndex)

  return {
    tripType: 'one-way',
    data: paginatedFlights,
    total,
    page,
    limit,
    hasNext: endIndex < total,
    hasPrevious: page > 1,
  }
}

const handleRoundTripSearch = async ({
  source,
  destination,
  departure,
  returnDate,
  page,
  limit,
  sortBy,
  sortOrder,
}: {
  source: string
  destination: string
  departure: string
  returnDate: string
  page: number
  limit: number
  sortBy?: 'price' | 'departure' | 'arrival'
  sortOrder?: 'asc' | 'desc'
}): Promise<TFlightSearchResult> => {
  // Get outbound flights (source -> destination)
  const outboundFlights = await flightStorageService.searchFlights({
    source,
    destination,
    departure,
  })

  // Get return flights (destination -> source)
  const returnFlights = await flightStorageService.searchFlights({
    source: destination, // Swap for return leg
    destination: source, // Swap for return leg
    departure: returnDate,
  })

  // Create flight pairs by combining outbound and return flights
  const flightPairs: TFlightPair[] = []

  for (const outbound of outboundFlights) {
    for (const returnFlight of returnFlights) {
      // Generate a unique pair ID
      const pairId = `${outbound.id}-${returnFlight.id}`

      // Calculate total price and duration
      const totalPrice = outbound.price + returnFlight.price
      const totalDuration = `${outbound.duration} + ${returnFlight.duration}`

      flightPairs.push({
        outbound,
        return: returnFlight,
        totalPrice,
        totalDuration,
        pairId,
      })
    }
  }

  // Apply sorting if specified
  const sortedPairs = sortBy
    ? sortFlightPairs(flightPairs, sortBy, sortOrder || 'asc')
    : flightPairs

  // Apply pagination to flight pairs
  const total = sortedPairs.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPairs = sortedPairs.slice(startIndex, endIndex)

  return {
    tripType: 'round-trip',
    data: paginatedPairs, // Flight pairs in outbound for consistency
    total,
    page,
    limit,
    hasNext: endIndex < total,
    hasPrevious: page > 1,
  }
}

const getFlightById = async (flightId: string): Promise<TFlight | null> => {
  return await flightStorageService.getFlightByIdEnhanced(flightId)
}

// Initialize popular routes on service startup
const initializeFlightService = async (): Promise<void> => {
  try {
    await flightStorageService.preloadPopularRoutes()
  } catch (error) {
    console.error('Error initializing flight service:', error)
  }
}

// Call initialization
initializeFlightService()

export const flightService = { searchFlights, getFlightById }
