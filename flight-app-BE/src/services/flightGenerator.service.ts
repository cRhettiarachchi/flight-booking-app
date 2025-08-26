import { TFlight } from '@/utils/types'
import { readFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

interface TAirport {
  code: string
  city: string
  name: string
  country: string
  lat: number
  lon: number
}

interface TFlightTemplate {
  airline: string
  aircraftTypes: string[]
  basePrice: number
  classes: string[]
}

// Realistic airlines with their typical aircraft and pricing
const AIRLINES: TFlightTemplate[] = [
  { airline: 'American Airlines', aircraftTypes: ['Boeing 737', 'Boeing 777', 'Airbus A320'], basePrice: 300, classes: ['Economy', 'Business', 'First'] },
  { airline: 'Delta Airlines', aircraftTypes: ['Boeing 737', 'Airbus A330', 'Boeing 757'], basePrice: 320, classes: ['Economy', 'Premium Economy', 'Business'] },
  { airline: 'United Airlines', aircraftTypes: ['Boeing 737', 'Boeing 787', 'Airbus A320'], basePrice: 310, classes: ['Economy', 'Business'] },
  { airline: 'Emirates', aircraftTypes: ['Boeing 777', 'Airbus A380', 'Boeing 787'], basePrice: 800, classes: ['Economy', 'Business', 'First'] },
  { airline: 'British Airways', aircraftTypes: ['Boeing 787', 'Airbus A350', 'Boeing 777'], basePrice: 500, classes: ['Economy', 'Premium Economy', 'Business', 'First'] },
  { airline: 'Lufthansa', aircraftTypes: ['Boeing 747', 'Airbus A340', 'Boeing 787'], basePrice: 450, classes: ['Economy', 'Business'] },
  { airline: 'Air France', aircraftTypes: ['Airbus A350', 'Boeing 777', 'Airbus A320'], basePrice: 420, classes: ['Economy', 'Premium Economy', 'Business'] },
  { airline: 'Singapore Airlines', aircraftTypes: ['Airbus A380', 'Boeing 787', 'Boeing 777'], basePrice: 600, classes: ['Economy', 'Premium Economy', 'Business', 'First'] },
  { airline: 'Cathay Pacific', aircraftTypes: ['Boeing 777', 'Airbus A350', 'Boeing 747'], basePrice: 550, classes: ['Economy', 'Premium Economy', 'Business', 'First'] },
  { airline: 'Japan Airlines', aircraftTypes: ['Boeing 787', 'Boeing 777', 'Airbus A350'], basePrice: 580, classes: ['Economy', 'Business', 'First'] },
]

class FlightGeneratorService {
  private airports: TAirport[] = []
  private airportsLoaded = false

  private async loadAirports(): Promise<void> {
    if (this.airportsLoaded) return
    
    try {
      // Try multiple paths to find the airports data file
      const possiblePaths = [
        path.join(__dirname, '../utils/data/airports-data.json'), // Dev path
        path.join(__dirname, '../../src/utils/data/airports-data.json'), // Dist path
        path.join(process.cwd(), 'src/utils/data/airports-data.json'), // Root relative
      ]
      
      let airportsData: string | null = null
      for (const filePath of possiblePaths) {
        try {
          airportsData = await readFile(filePath, 'utf8')
          break
        } catch (error) {
          // Continue to next path
        }
      }
      
      if (!airportsData) {
        throw new Error('Could not find airports-data.json in any expected location')
      }
      
      this.airports = JSON.parse(airportsData) as TAirport[]
      this.airportsLoaded = true
    } catch (error) {
      console.error('Error loading airports:', error)
      this.airports = []
    }
  }

  // Generate deterministic flight ID based on route, date, and schedule
  private generateFlightId(source: string, destination: string, departure: string, scheduleIndex: number): string {
    const data = `${source}-${destination}-${departure}-${scheduleIndex}`
    const hash = crypto.createHash('md5').update(data).digest('hex').substring(0, 6)
    // Encode route info in the ID for reconstruction: SRC_DEST_DATE_II_HASH (II = 2-digit index)
    const paddedIndex = String(scheduleIndex).padStart(2, '0')
    return `${source}${destination}${departure.replace(/-/g, '')}${paddedIndex}${hash}`
  }

  // Decode flight ID to extract route information
  public decodeFlightId(flightId: string): { source: string, destination: string, departure: string, scheduleIndex: number } | null {
    try {
      // Expected format: SRCDESTYYYMMDDIIHHHHH (where II is 2-digit schedule index, H is hash)
      if (flightId.length < 16) return null
      
      const source = flightId.substring(0, 3)
      const destination = flightId.substring(3, 6)
      const dateStr = flightId.substring(6, 14) // YYYYMMDD
      const scheduleIndex = parseInt(flightId.substring(14, 16)) // 2 digits
      
      // Format date back to YYYY-MM-DD
      const departure = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`
      
      return { source, destination, departure, scheduleIndex }
    } catch (error) {
      return null
    }
  }

  // Generate flight number based on airline and route
  private generateFlightNumber(airline: string, source: string, destination: string, scheduleIndex: number): string {
    const airlineCode = this.getAirlineCode(airline)
    const routeHash = crypto.createHash('md5').update(`${source}${destination}`).digest('hex')
    const flightNum = (parseInt(routeHash.substring(0, 3), 16) % 900) + 100 + scheduleIndex
    return `${airlineCode}${flightNum}`
  }

  private getAirlineCode(airline: string): string {
    const codes: { [key: string]: string } = {
      'American Airlines': 'AA',
      'Delta Airlines': 'DL',
      'United Airlines': 'UA',
      'Emirates': 'EK',
      'British Airways': 'BA',
      'Lufthansa': 'LH',
      'Air France': 'AF',
      'Singapore Airlines': 'SQ',
      'Cathay Pacific': 'CX',
      'Japan Airlines': 'JL'
    }
    return codes[airline] || 'XX'
  }

  // Calculate flight duration based on distance
  private calculateDuration(source: TAirport, destination: TAirport): string {
    const R = 6371 // Earth's radius in km
    const dLat = (destination.lat - source.lat) * Math.PI / 180
    const dLon = (destination.lon - source.lon) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(source.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c

    // Approximate flight time (accounting for taxi, climb, descent)
    const avgSpeed = 800 // km/h average including all phases
    const flightTimeHours = distance / avgSpeed + 0.5 // Add 30min for takeoff/landing
    
    const hours = Math.floor(flightTimeHours)
    const minutes = Math.round((flightTimeHours - hours) * 60)
    return `${hours}h ${minutes}m`
  }

  // Calculate price based on distance, airline, and class
  private calculatePrice(distance: number, airline: TFlightTemplate, flightClass: string): number {
    let multiplier = 1
    switch (flightClass) {
      case 'Premium Economy': multiplier = 1.5; break
      case 'Business': multiplier = 3; break
      case 'First': multiplier = 5; break
    }

    // Price increases with distance but with diminishing returns
    const distanceMultiplier = Math.log(Math.max(distance, 100) / 100) + 1
    return Math.round(airline.basePrice * distanceMultiplier * multiplier)
  }

  private getDistance(source: TAirport, destination: TAirport): number {
    const R = 6371
    const dLat = (destination.lat - source.lat) * Math.PI / 180
    const dLon = (destination.lon - source.lon) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(source.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Generate multiple flights for a route on a given date
  public async generateFlightsForRoute(
    sourceCode: string, 
    destinationCode: string, 
    departureDate: string
  ): Promise<TFlight[]> {
    await this.loadAirports()

    const source = this.airports.find(a => a.code === sourceCode)
    const destination = this.airports.find(a => a.code === destinationCode)

    if (!source || !destination) {
      return []
    }

    const flights: TFlight[] = []
    const distance = this.getDistance(source, destination)
    const duration = this.calculateDuration(source, destination)

    // Generate 15-25 flights per route to ensure 100+ results
    const flightCount = 15 + (Math.abs(crypto.createHash('md5').update(`${sourceCode}${destinationCode}`).digest().readInt8(0)) % 11)
    
    for (let i = 0; i < flightCount; i++) {
      // Select airline deterministically based on route
      const airlineIndex = Math.abs(crypto.createHash('md5').update(`${sourceCode}${destinationCode}${i}`).digest().readInt8(0)) % AIRLINES.length
      const airlineTemplate = AIRLINES[airlineIndex]
      
      // Generate schedule (spread throughout the day - 24 hour coverage)
      const hourStep = 24 / flightCount // Distribute evenly across 24 hours
      const baseHour = Math.floor((i * hourStep) % 24)
      const minutes = [0, 15, 30, 45, 50][i % 5] // More minute variations
      
      const departureTime = new Date(`${departureDate}T${String(baseHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00Z`)
      const durationParts = duration.split(/[h m]/).filter(p => p)
      const durationMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1])
      const arrivalTime = new Date(departureTime.getTime() + durationMinutes * 60000)

      // Select class and aircraft
      const flightClass = airlineTemplate.classes[i % airlineTemplate.classes.length]
      const aircraft = airlineTemplate.aircraftTypes[i % airlineTemplate.aircraftTypes.length]
      
      const flightId = this.generateFlightId(sourceCode, destinationCode, departureDate, i)
      const price = this.calculatePrice(distance, airlineTemplate, flightClass)
      
      flights.push({
        id: flightId,
        flightNumber: this.generateFlightNumber(airlineTemplate.airline, sourceCode, destinationCode, i),
        airline: airlineTemplate.airline,
        source: sourceCode,
        destination: destinationCode,
        departure: departureTime.toISOString(),
        arrival: arrivalTime.toISOString(),
        duration,
        aircraft,
        price,
        currency: 'USD',
        availableSeats: 20 + (Math.abs(crypto.createHash('md5').update(flightId).digest().readInt8(0)) % 180),
        flightClass
      })
    }

    return flights
  }

  // Generate flight by ID (reconstruct from ID components)
  public async getFlightById(flightId: string): Promise<TFlight | null> {
    await this.loadAirports()
    
    // In a real implementation, you'd decode the flight ID to get route and schedule info
    // For now, we'll search through potential combinations (this is simplified)
    // In production, you'd store ID mappings or encode route info in the ID
    
    // This is a simplified approach - in reality you'd encode the route info in the ID
    // For now, return null to indicate we need a more sophisticated ID encoding system
    return null
  }

  // Get popular routes for generating default flights
  public async getPopularRoutes(): Promise<Array<{source: string, destination: string}>> {
    await this.loadAirports()

    // Major airport hubs for generating realistic routes
    const majorHubs = ['JFK', 'LAX', 'ORD', 'DFW', 'DEN', 'ATL', 'LAS', 'PHX', 'IAH', 'MIA', 
                       'LHR', 'CDG', 'FRA', 'AMS', 'MAD', 'FCO', 'ZUR', 'VIE', 'CPH', 'ARN',
                       'NRT', 'ICN', 'PVG', 'PEK', 'HKG', 'SIN', 'BKK', 'KUL', 'DEL', 'BOM',
                       'DXB', 'DOH', 'AUH', 'IST', 'CAI', 'JNB', 'CPT', 'SYD', 'MEL', 'BNE']

    const routes: Array<{source: string, destination: string}> = []
    const availableHubs = majorHubs.filter(code => this.airports.some(a => a.code === code))

    // Generate popular route combinations
    for (let i = 0; i < availableHubs.length; i++) {
      for (let j = i + 1; j < Math.min(availableHubs.length, i + 5); j++) {
        routes.push({ source: availableHubs[i], destination: availableHubs[j] })
        routes.push({ source: availableHubs[j], destination: availableHubs[i] })
      }
    }

    return routes.slice(0, 100) // Return top 100 routes
  }
}

export const flightGeneratorService = new FlightGeneratorService()
