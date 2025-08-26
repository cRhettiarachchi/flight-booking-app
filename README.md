# Flight Booking Application

A modern, full-stack flight booking platform demonstrating professional web development practices, built with React Router v7 for the frontend and Node.js/Express for the backend.

## Project Overview

This application showcases a complete flight booking system with emphasis on:
- **SEO-Optimized Architecture** using Server-Side Rendering
- **URL-First Design** for shareable and bookmarkable flight searches
- **Professional UI/UX** following airline industry standards
- **Type-Safe Development** with comprehensive TypeScript implementation
- **Scalable Architecture** with clean separation of concerns

## Key Features

### User Experience
- **Intuitive Flight Search** with real-time form validation
- **Professional Flight Display** showing complete flight information including aircraft, timing, and pricing
- **Responsive Design** optimized for desktop, tablet, and mobile devices
- **Smart URL Structure** where every search creates a unique, shareable link
- **Error Handling** with user-friendly error pages and graceful fallbacks

### Technical Implementation
- **Server-Side Rendering** for better SEO and faster initial page loads
- **Type-Safe API Layer** with consistent error handling
- **Component-Driven Architecture** with reusable flight display components
- **Real-time Validation** using Zod schemas for forms and API data
- **Scalable Service Architecture** abstracting business logic from UI components

## Architecture

The application follows a modern full-stack architecture:

### Frontend (React Router v7)
- **Server-Side Rendering** for SEO optimization
- **Component Library** built on shadcn/ui for consistent design
- **Type-Safe Services** with centralized API communication
- **URL-Based State Management** for deep linking and sharing

### Backend (Node.js/Express)
- **RESTful API Design** with proper HTTP status codes
- **Flight Data Generation** simulating real airline systems
- **Caching Layer** for performance optimization
- **Error Handling Middleware** for consistent API responses

## Project Structure

```
flight-booking-app/
├── flight-app-FE/          # Frontend React Router v7 application
└── flight-app-BE/          # Backend Node.js/Express API
```

Each directory contains its own comprehensive README with detailed setup instructions, architecture explanations, and development guidelines.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd flight-app-BE
npm install
npm run dev
```

### Frontend Setup
```bash
cd flight-app-FE  
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and will communicate with the backend API at `http://localhost:3001`.

## Implementation Highlights

### URL-First Architecture
Every flight search generates a unique URL that captures the complete search state:
- One-way flights: `/flights/jfk/lax/250125`
- Round-trip flights: `/flights/jfk/lax/250125/250201`
- With pagination: `/flights/jfk/lax/250125?page=2`

This approach enables:
- **Deep Linking**: Direct access to any search result
- **Bookmarking**: Users can save and revisit specific searches
- **Social Sharing**: Rich previews when sharing flight deals
- **Analytics**: Detailed tracking of user search patterns

### Component Design Philosophy
The UI follows airline industry best practices with:
- **Professional Flight Cards** displaying comprehensive flight information
- **Consistent Information Hierarchy** matching user expectations
- **Progressive Enhancement** ensuring functionality across devices
- **Accessibility First** with proper ARIA labels and semantic HTML

### Error Handling Strategy
Comprehensive error management includes:
- **User-Friendly Error Pages** with actionable recovery options
- **Graceful API Degradation** when services are unavailable
- **Development-Friendly Debugging** with detailed error information
- **Consistent Error Messaging** across the application

### Performance Considerations
Optimized for real-world usage:
- **Server-Side Rendering** reduces time to first contentful paint
- **Intelligent Caching** minimizes redundant API calls
- **Code Splitting** ensures minimal bundle sizes
- **Progressive Loading** for smooth user experience

## Development Philosophy

This project demonstrates:
- **Production-Ready Patterns** suitable for enterprise applications
- **Maintainable Code Structure** with clear separation of concerns
- **Type Safety First** preventing runtime errors through compile-time checks
- **User-Centered Design** prioritizing functionality and accessibility
- **Performance-Conscious Development** optimizing for real-world network conditions

## Documentation

Each component of the system includes comprehensive documentation:

- **[Frontend Documentation](./flight-app-FE/README.md)** - Detailed frontend architecture, component design, and development guidelines
- **[Backend Documentation](./flight-app-BE/README.md)** - API design, data models, and service architecture

## Technology Decisions

### Why React Router v7?
- **Built-in SSR** eliminates complex setup for search engine optimization
- **File-based Routing** provides intuitive URL structure management
- **Data Loading** integrates seamlessly with modern React patterns
- **Performance** optimized bundle splitting and progressive enhancement

### Why This Architecture?
- **SEO Requirements** necessitate server-side rendering for flight content
- **User Experience** benefits from shareable URLs and fast initial loads
- **Developer Experience** improved by type safety and clear separation of concerns
- **Scalability** architecture supports growth and feature additions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is a demonstration project showcasing modern web development practices. Each directory contains its own detailed README with specific implementation details and setup instructions.
