import type { TDataResponse, TPaginatedDataResponse } from './TResponse'

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
