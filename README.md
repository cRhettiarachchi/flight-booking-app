# Flight Booking Application

A modern, full-stack flight booking platform demonstrating professional web development practices, built with React Router v7 for the frontend and Node.js/Express for the backend.

## Project Overview

This application showcases a complete flight booking system with emphasis on:
- **SEO-Optimized Architecture** using Server-Side Rendering
- **URL-First Design** for shareable and bookmarkable flight searches
- **Type-Safe Development** with comprehensive TypeScript implementation
- **Scalable Architecture** with clean separation of concerns

## Key Features

### User Experience
- **Intuitive Flight Search** with real-time form validation
- **Responsive Design** optimized for desktop, tablet, and mobile devices
- **Smart URL Structure** where every search creates a unique, shareable link
- **Error Handling** with user-friendly error pages and graceful fallbacks

### Technical Implementation
- **Server-Side Rendering** for better SEO and faster initial page loads
- **Type-Safe API Layer** with consistent error handling
- **Real-time Validation** using Zod schemas for forms and API data
- **Scalable Service Architecture** abstracting business logic from UI components

## Technology Justification

- **React Router v7**  
  Chosen for its modern **Server-Side Rendering (SSR) support**, **clean route design**, and **URL-first architecture**. It enables scalable navigation patterns and naturally creates **shareable, bookmarkable routes**.

- **Zod**  
  A **TypeScript-first validation library** that ensures type safety across both frontend and backend. It provides **simple schema definitions**, **real-time form validation**, and **automatic type inference**, reducing duplication and potential bugs.

- **shadcn/ui**  
  A lightweight, **component-driven UI library** that allows importing only what’s needed. It promotes **consistent styling**, integrates smoothly with Tailwind CSS, and remains **easy to customize for design flexibility**.

- **React Hook Form**  
  Selected for its **minimal re-renders**, **seamless integration with Zod**, and strong developer ergonomics. Works naturally with shadcn/ui, enabling **powerful yet simple form handling** with declarative validation.

## Future Improvements (Time Constraints)

- **Enhanced Error Handling** – Add more robust fallback mechanisms and context-specific error messages  
- **Improved Validation Messages** – More user-friendly and localized validation feedback  
- **User Experience Enhancements** – Additional polish to improve flow, accessibility, and interactivity  

## Detailed Docs
- **[Frontend Documentation](./flight-app-FE/README.md)** – Detailed frontend architecture, component design, and development guidelines  
- **[Backend Documentation](./flight-app-BE/README.md)** – API design, data models, and service architecture
