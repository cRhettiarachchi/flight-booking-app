import { Router } from 'express'
import { bookingController } from '../controllers/booking.controller'
import { bookingRequestSchema, zodValidator } from '@/utils'

const router = Router()

/**
 * @route   POST /api/bookings
 * @desc    Create a new flight booking
 * @access  Public
 * @body    booking data (passenger details + flight info)
 */
router.post(
  '/',
  zodValidator(bookingRequestSchema, 'body'),
  bookingController.createBooking,
)

export default router
