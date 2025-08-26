import { Router } from 'express'
import { flightController } from '../controllers'
import { flightQuerySchema } from '@/utils/validation'
import { zodValidator } from '@/utils/middleware'

const router = Router()

/**
 * @route   GET /api/flights/search
 * @desc    Search flights with query validation - supports both one-way and round-trip
 * @access  Public
 * @query   source?: string (3 chars), destination?: string (3 chars), departure?: string (YYYY-MM-DD), return?: string (YYYY-MM-DD), limit?: number (1-100), page?: number (>=1), sortBy?: enum(price,departure,arrival), sortOrder?: enum(asc,desc)
 * @note    If return date is provided, search becomes round-trip and returns flight pairs. Sorting by departure/arrival times sorts by outbound departure or return arrival for round-trips.
 */
router.get(
  '/search',
  zodValidator(flightQuerySchema, 'query'),
  flightController.searchFlights,
)

/**
 * @route   GET /api/flights/:sourceId
 * @desc    Get single flight by ID
 * @access  Public
 * @params  sourceId: string (flight ID)
 * @returns { data: { source: TFlight } }
 */
router.get('/:sourceId', flightController.getFlightById)

/**
 * @route   GET /api/flights/:sourceId/:destinationId
 * @desc    Get flight pair (outbound + return flights)
 * @access  Public
 * @params  sourceId: string (outbound flight ID), destinationId: string (return flight ID)
 * @returns { data: { source: TFlight, destination: TFlight } }
 */
router.get('/:sourceId/:destinationId', flightController.getFlightById)

export default router
