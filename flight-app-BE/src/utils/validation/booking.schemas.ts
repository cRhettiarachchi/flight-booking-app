import { z } from 'zod'

export const bookingRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Invalid phone number')
    .or(z.literal('')) // allow empty string
    .optional(),

  outboundId: z.string().min(1, 'Source flight ID is required'),
  returnId: z.string().optional(), // For round-trip flights
})

export type TBookingRequest = z.infer<typeof bookingRequestSchema>
