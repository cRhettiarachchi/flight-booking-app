import { fetchApi } from '../api/fetch'
import { API_ENDPOINTS } from '../config/api'
import type { 
  TFlightPaginatedResponse, 
  TFlight, 
  TFlightSearchParams 
} from '../types'

/**
 * Builds query string from flight search parameters
 */
const buildFlightSearchQuery = (params: TFlightSearchParams): string => {
  const searchParams = new URLSearchParams()
  
  searchParams.set('source', params.departureAirport.toUpperCase())
  searchParams.set('destination', params.arrivalAirport.toUpperCase())
  searchParams.set('departure', params.departureDate)
  
  if (params.arrivalDate) {
    searchParams.set('return', params.arrivalDate)
  }
  
  searchParams.set('page', String(params.page || 1))
  searchParams.set('limit', String(params.limit || 10))
  
  return searchParams.toString()
}

/**
 * Searches for flights based on search parameters
 */
export const searchFlightResults = async (
  params: TFlightSearchParams
): Promise<TFlightPaginatedResponse> => {
  const queryString = buildFlightSearchQuery(params)
  const url = `${API_ENDPOINTS.flights.search}?${queryString}`
  
  return await fetchApi<TFlightPaginatedResponse>(url)
}

/**
 * Retrieves a specific flight by its ID
 */
export const getFlightDetails = async (flightId: string): Promise<TFlight> => {
  const url = API_ENDPOINTS.flights.getById(flightId)
  
  return await fetchApi<TFlight>(url)
}

/**
 * Flight service object with all flight-related API methods
 */
export const flightService = {
  searchFlightResults,
  getFlightDetails,
} as const
