import { Router } from 'express'
import { flightController } from '../controllers'
import { flightQuerySchema } from '@/utils/validation'
import { zodValidator } from '@/utils/middleware'

const router = Router()

/**
 * @route   GET /api/flights/search
 * @desc    Search flights with query validation
 * @access  Public
 * @query   source?: string (3 chars), destination?: string (3 chars), departure?: string (YYYY-MM-DD), limit?: number (1-100), page?: number (>=1)
 */
router.get(
  '/search',
  zodValidator(flightQuerySchema, 'query'),
  flightController.searchFlights,
)

/**
 * @route   GET /api/flights/:id
 * @desc    Get flight by ID
 * @access  Public
 * @params  id: string (flight ID)
 */
router.get('/:id', flightController.getFlightById)

export default router
