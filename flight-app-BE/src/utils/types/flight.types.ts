export interface TFlight {
  id: string; // Unique flight identifier
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
  page?: number;
}

export interface TFlightSearchResult {
  data: TFlight[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
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
