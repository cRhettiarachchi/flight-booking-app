import type { TDataResponse, TPaginatedDataResponse } from './TResponse'
import {
  flightSearchFormSchema,
  flightSearchQuerySchema,
} from '../schemas/flightSearchSchema'
import type z from 'zod'

export interface TFlight {
  id: string
  flightNumber: string
  airline: string
  source: string
  destination: string
  departure: string
  arrival: string
  duration: string
  aircraft: string
  price: number
  currency: string
  availableSeats: number
  flightClass: string
}

export interface TFlightPair {
  outbound: TFlight
  return: TFlight
  totalPrice: number
  totalDuration: string
  pairId: string
}

export type TTripTypeData = { tripType: 'one-way' | 'round-trip' }

export type TFlightPaginatedResponse = TPaginatedDataResponse<
  TFlight[] | TFlightPair[]
> &
  TTripTypeData

export type TFlightDetailResponse = TDataResponse<
  {
    outbound: TFlight
    return?: TFlight
    totalPrice: number
    totalDuration: string
  } & TTripTypeData
>

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
