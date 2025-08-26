import z from 'zod'
import { bookingRequestSchema } from '../validation'

export type TBookingRequestBody = z.infer<typeof bookingRequestSchema>
