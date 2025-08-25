import { TFlight } from '@/utils/types'
import { flightGeneratorService } from './flightGenerator.service'

interface TFlightCache {
  flights: TFlight[]
  generatedAt: number
  expiresAt: number
}

interface TFlightIndex {
  [flightId: string]: TFlight
}

interface TRouteKey {
  source?: string
  destination?: string
  departure?: string
}

class FlightStorageService {
  private cache: Map<string, TFlightCache> = new Map()
  private flightIndex: TFlightIndex = {}
  private readonly CACHE_DURATION = 1000 * 60 * 60 // 1 hour
  private readonly MAX_CACHE_SIZE = 1000 // Maximum cached route combinations
  
  // Generate cache key from search parameters
  private generateCacheKey(params: TRouteKey): string {
    const { source, destination, departure } = params
    return `${source || 'ANY'}-${destination || 'ANY'}-${departure || 'ANY'}`
  }

  // Check if cache entry is valid
  private isCacheValid(cache: TFlightCache): boolean {
    return Date.now() < cache.expiresAt
  }

  // Generate flights for search parameters
  private async generateFlights(params: TRouteKey): Promise<TFlight[]> {
    const allFlights: TFlight[] = []
    
    if (params.source && params.destination) {
      // Specific route requested
      const departureDate = params.departure || new Date().toISOString().split('T')[0]
      const flights = await flightGeneratorService.generateFlightsForRoute(
        params.source,
        params.destination,
        departureDate
      )
      allFlights.push(...flights)
    } else {
      // Generate flights for popular routes
      const routes = await flightGeneratorService.getPopularRoutes()
      const departureDate = params.departure || new Date().toISOString().split('T')[0]
      
      // Filter routes based on source/destination if specified
      const filteredRoutes = routes.filter(route => {
        if (params.source && route.source !== params.source) return false
        if (params.destination && route.destination !== params.destination) return false
        return true
      })

      // Generate flights for filtered routes (limit to prevent too much data)
      // Process more routes to ensure ~100 results (since each route now generates 15-25 flights)
      const routesToProcess = filteredRoutes.slice(0, 6)
      
      for (const route of routesToProcess) {
        try {
          const flights = await flightGeneratorService.generateFlightsForRoute(
            route.source,
            route.destination,
            departureDate
          )
          allFlights.push(...flights)
        } catch (error) {
          console.error(`Error generating flights for route ${route.source}-${route.destination}:`, error)
        }
      }
    }

    return allFlights
  }

  // Get flights with caching
  public async searchFlights(params: TRouteKey): Promise<TFlight[]> {
    const cacheKey = this.generateCacheKey(params)
    const cachedEntry = this.cache.get(cacheKey)

    // Return cached data if valid
    if (cachedEntry && this.isCacheValid(cachedEntry)) {
      return cachedEntry.flights
    }

    // Generate new flights
    const flights = await this.generateFlights(params)
    
    // Cache the results
    const now = Date.now()
    this.cache.set(cacheKey, {
      flights,
      generatedAt: now,
      expiresAt: now + this.CACHE_DURATION
    })

    // Update flight index for ID-based lookups
    flights.forEach(flight => {
      this.flightIndex[flight.id] = flight
    })

    // Clean up cache if it gets too large
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      this.cleanupCache()
    }

    return flights
  }

  // Get flight by ID
  public async getFlightById(flightId: string): Promise<TFlight | null> {
    // First check if flight is in our index
    if (this.flightIndex[flightId]) {
      return this.flightIndex[flightId]
    }

    // If not in index, try to regenerate it by decoding the ID
    // For now, we'll return null and suggest a more sophisticated ID system
    return null
  }

  // Enhanced getFlightById that can reconstruct flight from ID
  public async getFlightByIdEnhanced(flightId: string): Promise<TFlight | null> {
    // First check cache
    if (this.flightIndex[flightId]) {
      return this.flightIndex[flightId]
    }

    // Try to decode flight ID to reconstruct the flight
    const decodedId = flightGeneratorService.decodeFlightId(flightId)
    if (decodedId) {
      // Reconstruct the flight by generating flights for the decoded route
      const flights = await flightGeneratorService.generateFlightsForRoute(
        decodedId.source,
        decodedId.destination,
        decodedId.departure
      )
      
      // Find the specific flight with matching ID
      const flight = flights.find(f => f.id === flightId)
      if (flight) {
        // Cache the flight for future lookups
        this.flightIndex[flightId] = flight
        return flight
      }
    }

    // Fallback: search through existing cache entries
    for (const [cacheKey, cache] of this.cache.entries()) {
      if (this.isCacheValid(cache)) {
        const flight = cache.flights.find(f => f.id === flightId)
        if (flight) {
          this.flightIndex[flightId] = flight
          return flight
        }
      }
    }

    return null
  }

  // Clean up expired cache entries
  private cleanupCache(): void {
    const now = Date.now()
    const expiredKeys: string[] = []
    
    for (const [key, cache] of this.cache.entries()) {
      if (now >= cache.expiresAt) {
        expiredKeys.push(key)
      }
    }

    // Remove expired entries
    expiredKeys.forEach(key => this.cache.delete(key))

    // If still too large, remove oldest entries
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      const entries = Array.from(this.cache.entries())
      entries.sort((a, b) => a[1].generatedAt - b[1].generatedAt)
      
      const toRemove = entries.slice(0, Math.floor(this.MAX_CACHE_SIZE * 0.2)) // Remove oldest 20%
      toRemove.forEach(([key]) => this.cache.delete(key))
    }

    // Clean up flight index from removed cache entries
    this.rebuildFlightIndex()
  }

  // Rebuild flight index from current cache
  private rebuildFlightIndex(): void {
    this.flightIndex = {}
    
    for (const cache of this.cache.values()) {
      if (this.isCacheValid(cache)) {
        cache.flights.forEach(flight => {
          this.flightIndex[flight.id] = flight
        })
      }
    }
  }

  // Preload popular routes for better performance
  public async preloadPopularRoutes(): Promise<void> {
    console.log('Preloading popular flight routes...')
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    // Preload some popular route combinations
    const popularSearches = [
      { source: 'JFK', destination: 'LAX', departure: tomorrowStr },
      { source: 'LAX', destination: 'JFK', departure: tomorrowStr },
      { source: 'LHR', destination: 'JFK', departure: tomorrowStr },
      { source: 'JFK', destination: 'LHR', departure: tomorrowStr },
      { departure: tomorrowStr }, // General search for tomorrow
    ]

    for (const search of popularSearches) {
      try {
        await this.searchFlights(search)
      } catch (error) {
        console.error('Error preloading route:', search, error)
      }
    }
    
    console.log(`Preloaded ${this.cache.size} route combinations`)
  }

  // Get cache statistics
  public getCacheStats(): {
    totalCacheEntries: number
    totalFlightsIndexed: number
    cacheHitRate: number
  } {
    return {
      totalCacheEntries: this.cache.size,
      totalFlightsIndexed: Object.keys(this.flightIndex).length,
      cacheHitRate: 0 // Would need request tracking to calculate this
    }
  }

  // Clear all cache (useful for testing)
  public clearCache(): void {
    this.cache.clear()
    this.flightIndex = {}
  }
}

export const flightStorageService = new FlightStorageService()
