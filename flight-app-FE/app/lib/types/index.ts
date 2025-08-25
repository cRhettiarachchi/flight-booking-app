import type { z } from 'zod'

// Export existing types
export * from './TFlightsResponse'
export * from './TResponse'

// Import and re-export schema-derived types
import {
  flightSearchFormSchema,
  flightSearchQuerySchema,
} from '../schemas/flightSearchSchema'

export type TFlightSearchFormData = z.infer<typeof flightSearchFormSchema>
export type TFlightSearchQuery = z.infer<typeof flightSearchQuerySchema>

// Additional service-level types
export type TApiResponse<T = unknown> = {
  data: T
  success: boolean
  message?: string
}

export type TFlightSortOption = 'price' | 'departure' | 'arrival'

export type TFlightSortOrder = 'asc' | 'desc'

export type TFlightSearchParams = {
  departureAirport: string
  arrivalAirport: string
  departureDate: string
  arrivalDate?: string
  page?: number
  limit?: number
  sortBy?: TFlightSortOption
  sortOrder?: TFlightSortOrder
}

export type TPaginationInfo = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

// Error types
export type TApiErrorResponse = {
  message: string
  status: number
  statusText: string
  details?: unknown
}
