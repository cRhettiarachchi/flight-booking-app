import type z from 'zod'
import type { bookingFormSchema } from '../schemas/bookingSchema'

export type TBookingFormData = z.infer<typeof bookingFormSchema>
