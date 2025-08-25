import { TFlight, TFlightSearchResult } from '@/utils/types'
import { TFlightQueryParams } from '@/utils/validation'
import { flightStorageService } from './flightStorage.service'

const searchFlights = async ({
  source,
  departure,
  destination,
  page = 1,
  limit = 10,
}: TFlightQueryParams): Promise<TFlightSearchResult> => {
  // Normalize input parameters
  const normalizedSource = source?.trim().toUpperCase()
  const normalizedDestination = destination?.trim().toUpperCase()

  // Get all flights matching the criteria from storage
  const allFlights = await flightStorageService.searchFlights({
    source: normalizedSource,
    destination: normalizedDestination,
    departure,
  })

  // Calculate pagination
  const total = allFlights.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedFlights = allFlights.slice(startIndex, endIndex)

  return {
    data: paginatedFlights,
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
