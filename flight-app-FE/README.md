# Flight Booking Application

A professional flight booking platform demonstrating modern web development practices with React Router v7, focusing on SEO optimization and user experience.

## Project Overview

This is a full-stack flight booking application that showcases several key technical decisions and implementations that would be valuable in a production environment.

## Why React Router v7?

### Server-Side Rendering (SSR) for SEO
The primary reason for choosing React Router v7 was its excellent SSR capabilities. In a flight booking application, SEO is crucial because:
- **Search Engine Indexing**: Flight search results and pricing information need to be crawlable by search engines
- **Social Media Sharing**: When users share flight deals, rich previews are essential
- **Performance**: Critical flight information loads faster with SSR, improving user experience

### URL-First Architecture
Every search and interaction is encoded in the URL, making the application:
```
/flights/jfk/lax/250125              # One-way: JFK → LAX on Jan 25
/flights/jfk/lax/250125/250201       # Round-trip with return date
/flights/jfk/lax/250125?page=2       # Paginated results
```

**Benefits:**
- **Shareable Links**: Users can bookmark and share exact search results
- **Deep Linking**: Direct access to any application state
- **Analytics**: Better tracking of user search patterns
- **User Experience**: Browser back/forward buttons work seamlessly

## Technical Architecture

### Project Structure
```
app/
├── components/          # Reusable UI components
│   ├── flightLeg.tsx   # Individual flight segment
│   └── flightSummary.tsx # Complete flight details
├── lib/
│   ├── services/       # API abstraction layer
│   ├── schemas/        # Zod validation schemas
│   └── types/          # TypeScript definitions
└── routes/             # Page components with data loaders
```

### Key Technical Decisions

**1. Type Safety**
- Full TypeScript implementation with Zod schemas
- Schema-first approach: types derived from validation schemas
- Consistent `TTypeName` convention across the application

**2. Service Layer**
```typescript
export const flightService = {
  searchFlightResults,    // Centralized API calls
  getFlightDetails,      // Single source of truth
} as const
```

**3. Component Architecture**
- Modular, reusable components following airline industry standards
- Professional flight display with proper IATA codes, timing, and pricing
- Responsive design with mobile-first approach

## Real-World Considerations

### SEO & Performance
- Server-side rendering ensures content is available to search crawlers
- URL structure supports SEO-friendly flight route pages
- Fast initial page loads with progressive enhancement

### User Experience
- Every search creates a shareable URL
- Form validation with real-time feedback
- Professional airline-industry UI patterns
- Proper error handling and loading states

### Scalability
- Clean separation of concerns (services, components, types)
- Easy to extend with additional features (filters, sorting, etc.)
- API abstraction allows for backend changes without frontend modifications

## Running the Application

```bash
npm install
npm run dev    # Development server at http://localhost:5173
npm run build  # Production build with SSR
```

## Technology Stack

- **React Router v7** - SSR and file-based routing
- **TypeScript** - Type safety and developer experience
- **Zod** - Schema validation and type inference
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Professional UI components

---

This project demonstrates production-ready patterns for SEO-optimized React applications with complex state management and professional UI design.
