import { TFlight, TFlightSearchResult, TFlightPair } from '@/utils/types'
import { TFlightQueryParams } from '@/utils/validation'
import { flightStorageService } from './flightStorage.service'

const searchFlights = async ({
  source,
  departure,
  destination,
  return: returnDate,
  page = 1,
  limit = 10,
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
    })
  } else {
    return await handleOneWaySearch({
      source: normalizedSource,
      destination: normalizedDestination,
      departure,
      page,
      limit,
    })
  }
}

const handleOneWaySearch = async ({
  source,
  destination,
  departure,
  page,
  limit,
}: {
  source: string
  destination: string
  departure: string
  page: number
  limit: number
}): Promise<TFlightSearchResult> => {
  // Get all flights matching the criteria from storage
  const allFlights = await flightStorageService.searchFlights({
    source,
    destination,
    departure,
  })

  // Calculate pagination
  const total = allFlights.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedFlights = allFlights.slice(startIndex, endIndex)

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
}: {
  source: string
  destination: string
  departure: string
  returnDate: string
  page: number
  limit: number
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

  // Apply pagination to flight pairs
  const total = flightPairs.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPairs = flightPairs.slice(startIndex, endIndex)

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
    console.log('Flight service initialized successfully')
  } catch (error) {
    console.error('Error initializing flight service:', error)
  }
}

// Call initialization
initializeFlightService()

export const flightService = { searchFlights, getFlightById }
