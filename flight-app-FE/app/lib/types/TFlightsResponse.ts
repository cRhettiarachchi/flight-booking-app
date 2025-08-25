import type { TPaginatedDataResponse } from './TResponse'

export type TFlight = {
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

export type TFlightPair = {
  outbound: TFlight
  return: TFlight
  totalPrice: number
  totalDuration: string
  pairId: string
}

export type TFlightPaginatedResponse = TPaginatedDataResponse<
  TFlight[] | TFlightPair[]
> & { tripType: 'one-way' | 'round-trip' }
