import { fetchApi } from '../api/fetch'
import { API_ENDPOINTS } from '../config/api'
import type {
  TFlightPaginatedResponse,
  TFlightSearchParams,
  TFlightDetailResponse,
} from '../types'

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

  if (params.sortBy) {
    searchParams.set('sortBy', params.sortBy)
  }

  if (params.sortOrder) {
    searchParams.set('sortOrder', params.sortOrder)
  }

  return searchParams.toString()
}

export const searchFlightResults = async (
  params: TFlightSearchParams,
): Promise<TFlightPaginatedResponse> => {
  const queryString = buildFlightSearchQuery(params)
  const url = `${API_ENDPOINTS.flights.search}?${queryString}`

  return await fetchApi<TFlightPaginatedResponse>(url)
}

export const getFlightDetails = async (
  sourceId: string,
  destinationId?: string,
): Promise<TFlightDetailResponse> => {
  const url = API_ENDPOINTS.flights.getById(sourceId, destinationId)

  return await fetchApi<TFlightDetailResponse>(url)
}

export const flightService = {
  searchFlightResults,
  getFlightDetails,
} as const
