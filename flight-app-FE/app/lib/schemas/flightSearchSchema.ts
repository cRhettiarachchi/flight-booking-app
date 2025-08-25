import { z } from 'zod'

export const flightSearchFormSchema = z
  .object({
    tripType: z.enum(['one-way', 'round-trip']),
    departureAirport: z.string().length(3, 'Choose origin'),
    arrivalAirport: z.string().length(3, 'Choose destination'),
    departureDate: z.date(),
    arrivalDate: z.date().optional(),
  })
  .refine(
    (v) => v.departureAirport.toUpperCase() !== v.arrivalAirport.toUpperCase(),
    {
      path: ['arrivalAirport'],
      message: 'Airports must differ',
    },
  )
  .refine((v) => v.tripType === 'one-way' || !!v.arrivalDate, {
    path: ['arrivalDate'],
    message: 'Return date required',
  })

export const flightSearchQuerySchema = z.object({
  source: z.string().length(3),
  destination: z.string().length(3),
  departure: z.string(), // ISO date string
  arrival: z.string().optional(), // ISO date string for return flights
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
})
