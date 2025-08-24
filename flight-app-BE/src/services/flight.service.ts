import { TFlight, TFlightSearchParams } from '@/utils/types'
import { TFlightQueryParams } from '@/utils/validation'

// Mock flight data
const mockFlights: TFlight[] = [
  {
    flightNumber: 'AA101',
    airline: 'American Airlines',
    source: 'JFK',
    destination: 'LAX',
    departure: '2024-08-25T08:00:00Z',
    arrival: '2024-08-25T11:30:00Z',
    duration: '5h 30m',
    aircraft: 'Boeing 777',
    price: 450,
    currency: 'USD',
    availableSeats: 45,
    flightClass: 'Economy',
  },
  {
    flightNumber: 'DL205',
    airline: 'Delta Airlines',
    source: 'JFK',
    destination: 'LAX',
    departure: '2024-08-25T14:00:00Z',
    arrival: '2024-08-25T17:30:00Z',
    duration: '5h 30m',
    aircraft: 'Airbus A330',
    price: 520,
    currency: 'USD',
    availableSeats: 23,
    flightClass: 'Economy',
  },
  {
    flightNumber: 'UA312',
    airline: 'United Airlines',
    source: 'LAX',
    destination: 'JFK',
    departure: '2024-08-26T09:00:00Z',
    arrival: '2024-08-26T17:45:00Z',
    duration: '5h 45m',
    aircraft: 'Boeing 737',
    price: 480,
    currency: 'USD',
    availableSeats: 67,
    flightClass: 'Economy',
  },
  {
    flightNumber: 'BA401',
    airline: 'British Airways',
    source: 'LHR',
    destination: 'JFK',
    departure: '2024-08-25T10:30:00Z',
    arrival: '2024-08-25T14:15:00Z',
    duration: '8h 45m',
    aircraft: 'Boeing 787',
    price: 750,
    currency: 'USD',
    availableSeats: 12,
    flightClass: 'Business',
  },
  {
    flightNumber: 'EK501',
    airline: 'Emirates',
    source: 'DXB',
    destination: 'JFK',
    departure: '2024-08-25T02:30:00Z',
    arrival: '2024-08-25T08:45:00Z',
    duration: '14h 15m',
    aircraft: 'Airbus A380',
    price: 1200,
    currency: 'USD',
    availableSeats: 8,
    flightClass: 'First',
  },
  {
    flightNumber: 'LH602',
    airline: 'Lufthansa',
    source: 'FRA',
    destination: 'LAX',
    departure: '2024-08-26T11:00:00Z',
    arrival: '2024-08-26T14:30:00Z',
    duration: '11h 30m',
    aircraft: 'Boeing 747',
    price: 680,
    currency: 'USD',
    availableSeats: 34,
    flightClass: 'Economy',
  },
  {
    flightNumber: 'QF801',
    airline: 'Qantas',
    source: 'SYD',
    destination: 'LAX',
    departure: '2024-08-25T22:00:00Z',
    arrival: '2024-08-26T16:30:00Z',
    duration: '13h 30m',
    aircraft: 'Boeing 787',
    price: 950,
    currency: 'USD',
    availableSeats: 19,
    flightClass: 'Premium Economy',
  },
  {
    flightNumber: 'AF901',
    airline: 'Air France',
    source: 'CDG',
    destination: 'JFK',
    departure: '2024-08-25T15:45:00Z',
    arrival: '2024-08-25T18:20:00Z',
    duration: '8h 35m',
    aircraft: 'Airbus A350',
    price: 720,
    currency: 'USD',
    availableSeats: 41,
    flightClass: 'Economy',
  },
]

const searchFlights = async ({
  source,
  departure,
  arrival,
  destination,
  page,
  limit,
}: TFlightQueryParams): Promise<TFlight[]> => {
  let results = [...mockFlights]

  // Filter by source
  if (source) {
    const normalizedSource = source.trim().toUpperCase()
    results = results.filter(
      (flight) => flight.source.toUpperCase() === normalizedSource,
    )
  }

  // Filter by destination
  if (destination) {
    const normalizedDestination = destination.trim().toUpperCase()
    results = results.filter(
      (flight) => flight.destination.toUpperCase() === normalizedDestination,
    )
  }

  // Filter by departure date (simplified - just checks if departure contains the date)
  if (departure) {
    results = results.filter((flight) => flight.departure.includes(departure))
  }

  // Filter by arrival date (simplified - just checks if arrival contains the date)
  if (arrival) {
    results = results.filter((flight) => flight.arrival.includes(arrival))
  }

  return results.slice(0, limit)
}

export const flightService = { searchFlights }
