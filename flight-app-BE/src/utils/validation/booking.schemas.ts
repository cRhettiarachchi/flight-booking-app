import { z } from 'zod'

// Schema for booking request body
export const bookingRequestSchema = z.object({
  // Passenger details (matches frontend bookingFormSchema)
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Invalid phone number')
    .or(z.literal('')) // allow empty string
    .optional(),

  // Flight information (will come from the frontend)
  sourceFlightId: z.string().min(1, 'Source flight ID is required'),
  destinationFlightId: z.string().optional(), // For round-trip flights

  // Additional booking metadata
  tripType: z.enum(['one-way', 'round-trip']).optional(),
  totalAmount: z.number().positive().optional(), // For validation/audit purposes
})

export type TBookingRequest = z.infer<typeof bookingRequestSchema>
