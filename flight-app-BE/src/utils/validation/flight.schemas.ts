import { z } from "zod";

// Schema for flight search query parameters
export const flightQuerySchema = z.object({
  source: z.string().min(3).max(3).optional(),
  destination: z.string().min(3).max(3).optional(),
  departure: z.string().min(10).max(10).optional(), // YYYY-MM-DD format
  arrival: z.string().min(10).max(10).optional(), // YYYY-MM-DD format
  limit: z.coerce.number().int().min(1).max(100).optional(),
  page: z.coerce.number().int().min(0).optional(),
});

// Schema for flight search with required parameters
export const flightSearchSchema = z.object({
  source: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  departure: z.string().min(10).max(10), // YYYY-MM-DD format
  arrival: z.string().min(10).max(10).optional(), // YYYY-MM-DD format
  limit: z.number().int().min(1).max(100).optional(),
});

export type TFlightQueryParams = z.infer<typeof flightQuerySchema>;
export type FlightSearchParams = z.infer<typeof flightSearchSchema>;
