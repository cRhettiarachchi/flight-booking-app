# Flight Booking API

A simple Express.js API with TypeScript, Zod validation, and clean architecture.

## Features

- **Express.js** with TypeScript
- **Zod** schema validation
- **Helmet** for security
- **CORS** enabled
- Clean architecture with controllers, services, and middleware
- Method-based exports instead of classes

## Project Structure

```
src/
├── controllers/        # Request handlers
├── services/          # Business logic
├── routes/            # Route definitions
├── middleware/        # Custom middleware
├── validation/        # Zod schemas
├── types/            # TypeScript interfaces
├── server.ts         # Express app configuration
└── index.ts          # Server entry point
```

## API Endpoints

### Base Routes
- `GET /` - API information
- `GET /health` - Health check

### Airport Routes
- `GET /api/airports` - Get all airports (dummy data)
- `GET /api/airports/search` - Search airports with validation

## Validation Example

The `/api/airports/search` endpoint uses Zod validation for query parameters:

```typescript
// Valid request
GET /api/airports/search?search=london&limit=10&offset=0

// Invalid request (validation will fail)
GET /api/airports/search?search=a&limit=200  // search too short, limit too high
```

### Validation Rules
- `search`: Optional string, 2-100 characters
- `country`: Optional string, exactly 2 characters
- `limit`: Optional number, 1-100
- `offset`: Optional number, >= 0

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

## Testing Validation

```bash
# Valid request
curl "http://localhost:3001/api/airports/search?search=london&limit=5"

# Invalid request (will return validation error)
curl "http://localhost:3001/api/airports/search?search=a&limit=200"
```

## Adding New Validation

1. Create schema in `src/validation/`
2. Import validation middleware in your route
3. Apply middleware to route

Example:
```typescript
import { validateQuery } from '../middleware';
import { mySchema } from '../validation';

router.get('/my-route', validateQuery(mySchema), controller.myMethod);
```
