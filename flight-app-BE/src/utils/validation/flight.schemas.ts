import { z } from 'zod'

// Schema for flight search query parameters
export const flightQuerySchema = z.object({
  source: z.string().min(3).max(3).optional(), // Origin airport code (3 letters)
  destination: z.string().min(3).max(3).optional(), // Destination airport code (3 letters)
  departure: z.string().min(10).max(10).optional(), // Departure date (YYYY-MM-DD format)
  return: z.string().min(10).max(10).optional(), // Return date (YYYY-MM-DD format) - if provided, it's round-trip
  limit: z.coerce.number().int().min(1).max(100).optional(), // Results per page
  page: z.coerce.number().int().min(0).optional(), // Page number
})

export type TFlightQueryParams = z.infer<typeof flightQuerySchema>
