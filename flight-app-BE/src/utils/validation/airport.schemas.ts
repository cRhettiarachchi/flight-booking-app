import { z } from "zod";

// Schema for airport search query parameters
export const airportQuerySchema = z.object({
  search: z.string().min(2).max(100).optional(),
  country: z.string().length(2).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

// Schema for airport code parameter
export const airportCodeSchema = z.object({
  code: z
    .string()
    .length(3)
    .regex(/^[A-Z]{3}$/, "Airport code must be 3 uppercase letters"),
});

// Schema for country code parameter
export const countryCodeSchema = z.object({
  countryCode: z
    .string()
    .length(2)
    .regex(/^[A-Z]{2}$/, "Country code must be 2 uppercase letters"),
});

// Schema for search query
export const searchQuerySchema = z.object({
  search: z.string().min(2).max(50),
  limit: z.number().int().min(1).max(100).optional(),
});

export type AirportQueryParams = z.infer<typeof airportQuerySchema>;
export type AirportCodeParams = z.infer<typeof airportCodeSchema>;
export type CountryCodeParams = z.infer<typeof countryCodeSchema>;
export type TSearchQueryParams = z.infer<typeof searchQuerySchema>;
