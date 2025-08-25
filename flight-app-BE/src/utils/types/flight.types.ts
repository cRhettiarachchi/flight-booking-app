export interface TFlight {
  id: string // Unique flight identifier
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

export interface TFlightSearchParams {
  source?: string
  destination?: string
  departure?: string
  return?: string
  limit?: number
  page?: number
  sortBy?: 'price' | 'departure' | 'arrival'
  sortOrder?: 'asc' | 'desc'
}

export interface TFlightPair {
  outbound: TFlight
  return: TFlight
  totalPrice: number
  totalDuration: string
  pairId: string // Unique identifier for this flight pair combination
}

export interface TFlightSearchResult {
  tripType: 'one-way' | 'round-trip'
  data: TFlight[] | TFlightPair[] // One-way: flights, Round-trip: flight pairs
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface TPaginatedFlightsResponse {
  data: TFlight[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasNext: boolean
    hasPrevious: boolean
  }
}
