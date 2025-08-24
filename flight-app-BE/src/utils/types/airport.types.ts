export interface TAirport {
  code: string;
  city: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface TAirportSearchParams {
  search?: string;
  country?: string;
  limit?: number;
  offset?: number;
}

export interface TPaginatedAirportsResponse {
  data: TAirport[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
