import { Request, Response } from 'express'
import { bookingService } from '../services/booking.service'
import { TBookingRequestBody } from '@/utils'

const createBooking = async (
  req: Request<unknown, unknown, TBookingRequestBody, unknown>,
  res: Response,
): Promise<void> => {
  try {
    const result = await bookingService.createBooking(req.body)

    res.status(200).json(result)
  } catch (error) {
    console.error('Booking error:', error)
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}

export const bookingController = {
  createBooking,
}
