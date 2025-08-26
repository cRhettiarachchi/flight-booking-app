import type z from 'zod'
import type {
  bookingFormSchema,
  bookingPayloadSchema,
} from '../schemas/bookingSchema'

export type TBookingFormData = z.infer<typeof bookingFormSchema>

export type TBookingPayload = z.infer<typeof bookingPayloadSchema>
