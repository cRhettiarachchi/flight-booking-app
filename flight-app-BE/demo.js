// Demo script to showcase the new flight architecture
// Run with: node demo.js (after building with npm run build)

const { flightService } = require('./dist/services/flight.service');
const { flightStorageService } = require('./dist/services/flightStorage.service');

async function demonstrateFlightSystem() {
  console.log('=== Flight Booking System Demo ===\n');

  try {
    // Demo 1: One-way flight search
    console.log('1. ONE-WAY SEARCH: JFK → LAX (departure 2024-08-25)');
    const oneWayResult = await flightService.searchFlights({
      source: 'JFK',
      destination: 'LAX',
      departure: '2024-08-25',
      limit: 3,
      page: 1
    });

    console.log(`   Trip Type: ${oneWayResult.tripType}`);
    console.log(`   Found ${oneWayResult.total} total flights, showing ${oneWayResult.outbound.length}:`);
    oneWayResult.outbound.forEach(flight => {
      console.log(`     ${flight.flightNumber} (${flight.airline}) - $${flight.price} - ${flight.duration}`);
    });
    console.log(`   Pagination: Page ${oneWayResult.page}/${Math.ceil(oneWayResult.total / oneWayResult.limit)}\n`);

    // Demo 2: Round-trip flight search
    console.log('2. ROUND-TRIP SEARCH: JFK ⇄ LAX (depart: 2024-08-25, return: 2024-08-27)');
    const roundTripResult = await flightService.searchFlights({
      source: 'JFK',
      destination: 'LAX',
      departure: '2024-08-25',
      return: '2024-08-27',
      limit: 2,
      page: 1
    });

    console.log(`   Trip Type: ${roundTripResult.tripType}`);
    console.log(`   Found ${roundTripResult.total} total flight pairs, showing ${roundTripResult.outbound.length}:`);
    roundTripResult.outbound.forEach((pair, index) => {
      console.log(`     Pair ${index + 1}: Total $${pair.totalPrice}`);
      console.log(`       Outbound: ${pair.outbound.flightNumber} (${pair.outbound.airline}) - $${pair.outbound.price}`);
      console.log(`       Return:   ${pair.return.flightNumber} (${pair.return.airline}) - $${pair.return.price}`);
      console.log(`       Pair ID:  ${pair.pairId}`);
    });
    console.log(); // Add newline after round-trip demo

    // Demo 3: Error handling - missing required parameters
    console.log('3. ERROR HANDLING: Search without required parameters');
    try {
      await flightService.searchFlights({
        source: 'JFK',
        // Missing destination and departure
        limit: 5,
        page: 1
      });
    } catch (error) {
      console.log(`   Expected error: ${error.message}\n`);
    }

    // Demo 4: Get specific flight by ID
    if (oneWayResult.outbound.length > 0) {
      const firstFlightId = oneWayResult.outbound[0].id;
      console.log(`4. GET FLIGHT BY ID: ${firstFlightId}`);
      const specificFlight = await flightService.getFlightById(firstFlightId);
      
      if (specificFlight) {
        console.log(`   Found: ${specificFlight.flightNumber} (${specificFlight.airline})`);
        console.log(`   Route: ${specificFlight.source} → ${specificFlight.destination}`);
        console.log(`   Price: $${specificFlight.price} (${specificFlight.flightClass})`);
      } else {
        console.log(`   Flight not found`);
      }
    }

    // Demo 5: Cache statistics
    console.log('\n5. CACHE STATISTICS:');
    const stats = flightStorageService.getCacheStats();
    console.log(`   Cached route combinations: ${stats.totalCacheEntries}`);
    console.log(`   Total flights indexed: ${stats.totalFlightsIndexed}`);

  } catch (error) {
    console.error('Demo error:', error);
  }
}

// Run the demo
demonstrateFlightSystem().then(() => {
  console.log('\n=== Demo Complete ===');
  process.exit(0);
}).catch(console.error);
