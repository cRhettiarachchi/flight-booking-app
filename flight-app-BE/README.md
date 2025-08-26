# Flight Booking App Backend

A modern, flexible flight booking API built with Express.js and TypeScript. This backend serves as a foundation for flight search and booking functionality with realistic flight data generation.

## Project Overview

This project provides a RESTful API for a flight booking application with the following key features:

- **Dynamic Flight Generation**: Generates realistic flight data on-demand without relying on external APIs
- **Flexible Search**: Search flights by airport codes, dates, with pagination and sorting
- **Round-trip Support**: Full support for one-way and round-trip itineraries
- **Clean Architecture**: Well-organized codebase with controllers, services, and routes
- **Data Validation**: Request validation using Zod schemas

## Technical Architecture

### Core Technologies

- **Express.js**: Fast, minimalist web framework for Node.js
- **TypeScript**: Strongly typed JavaScript for improved developer experience
- **Zod**: Schema validation library for type-safe request handling
- **Helmet**: Security middleware to protect against common vulnerabilities
- **CORS**: Cross-Origin Resource Sharing enabled for frontend integration

### Project Structure

```
src/
├── controllers/        # Request handlers for each resource
├── services/           # Business logic implementation
├── routes/             # API route definitions
├── utils/
│   ├── middleware/     # Express middleware (validation, etc.)
│   ├── types/          # TypeScript interfaces
│   └── validation/     # Zod validation schemas
├── server.ts           # Express app configuration
└── index.ts            # Application entry point
```

## Coding Patterns

This project follows several key coding patterns:

1. **Functional Programming Approach**: Uses method-based exports instead of classes for most components.

2. **Service-Controller Pattern**: Separates business logic (services) from request handling (controllers).

3. **Validation Middleware**: Centralized request validation using Zod schemas.

4. **Repository Pattern**: Flight data storage and retrieval is abstracted behind service interfaces.

5. **Deterministic Data Generation**: Consistent flight data generation for the same inputs.

6. **Immutable Data Structures**: No direct mutations of data objects.

7. **Pure Functions**: Most utility functions are pure with no side effects.

8. **Error Handling**: Consistent error response format throughout the API.

## Dynamic Flight Generation

The flight generation system is designed to create realistic flight data without depending on external APIs:

### Key Components

- **FlightGenerator Service**: Creates realistic flights using airport data with:
  - Accurate flight durations based on geographic distance calculations
  - Realistic airline assignments from 10 major carriers
  - Dynamic pricing based on distance, airline, and seat class
  - Deterministic flight IDs that encode route information

- **FlightStorage Service**: Manages in-memory flight data with:
  - Smart caching with automatic expiration (1-hour lifetime)
  - Fast flight lookup by ID
  - Popular route preloading for better performance

### Flight ID System

The system uses a sophisticated flight ID format:
```
JFKLAX202408250fd5b7cef
```

Breakdown:
- `JFK` - Source airport code
- `LAX` - Destination airport code
- `20240825` - Departure date (YYYYMMDD)
- `0` - Schedule index
- `fd5b7cef` - Hash for uniqueness

This design allows for:
- Deterministic flight generation (same route/date always generates same flights)
- Decodable IDs (can reconstruct flight from ID alone)
- Unique, compact identifiers

## Data Architecture

Important note: **This project has no database dependency**. Instead, it uses:

1. **In-memory Data Storage**: Flight data is generated and cached in memory
2. **Smart Caching**: Generated flights are cached with automatic expiration
3. **Deterministic Generation**: Same search parameters always produce same results

This approach provides several benefits:
- No external database configuration required
- Fast response times
- Consistent data generation
- Simplified deployment

## API Endpoints

### Flight Routes

- `GET /api/flights/search` - Search flights with various parameters
  - Query Parameters:
    - `source`: Origin airport code (e.g., JFK)
    - `destination`: Destination airport code (e.g., LAX)
    - `departure`: Departure date (YYYY-MM-DD format)
    - `return`: Return date (optional - makes it round-trip)
    - `limit`: Results per page (1-100, default: 10)
    - `page`: Page number (≥1, default: 1)
    - `sortBy`: Field to sort by (price, departure, arrival)
    - `sortOrder`: Sort direction (asc, desc)

- `GET /api/flights/:id` - Get flight by ID
- `GET /api/flights/:sourceId/:destinationId` - Get flight pair (round-trip)

### Airport Routes

- `GET /api/airports` - Get all airports
- `GET /api/airports/search` - Search airports by query

### Booking Routes

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID

## Implementation Notes

The `flightGenerator.service.ts` and `flightStorage.service.ts` files were largely AI-generated to implement the complex flight generation logic. These services work together to:

1. Generate realistic flight data based on airport coordinates
2. Calculate accurate flight times and pricing
3. Create deterministic flight IDs
4. Implement an efficient caching system

The backend primarily serves as a mock implementation rather than a production-ready system, but it includes proper validation and API routes to support the frontend application.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing

```bash
# Search for flights
curl "http://localhost:3001/api/flights/search?source=JFK&destination=LAX&departure=2024-08-25"

# Get flight by ID
curl "http://localhost:3001/api/flights/JFKLAX2024082500fd5b7c"
```

## Next Steps

Potential improvements for a production environment:
1. Add persistent storage with a database
2. Implement user authentication and authorization
3. Add advanced search filtering
4. Create a booking workflow with payment integration
