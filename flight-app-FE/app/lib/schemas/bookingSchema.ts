import z from 'zod'

export const bookingFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .regex(
      /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\-.\s]{7,15}$/,
      'Invalid phone number',
    )
    .or(z.literal('')) // allow empty string
    .optional(),
})
