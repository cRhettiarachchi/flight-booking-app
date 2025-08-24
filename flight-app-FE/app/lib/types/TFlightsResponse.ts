import type { TPaginatedDataResponse } from './TResponse'

export type TFlight = {
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

export type TFlightPaginatedResponse = TPaginatedDataResponse<TFlight[]>
