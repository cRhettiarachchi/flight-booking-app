export interface TFlight {
  flightNumber: string;
  airline: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  aircraft: string;
  price: number;
  currency: string;
  availableSeats: number;
  flightClass: string;
}

export interface TFlightSearchParams {
  source?: string;
  destination?: string;
  departure?: string;
  arrival?: string;
  limit?: number;
  offset?: number;
}

export interface TPaginatedFlightsResponse {
  data: TFlight[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
