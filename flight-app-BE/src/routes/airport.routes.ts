import { Router } from 'express'
import { airportController } from '../controllers'

const router = Router()

/**
 * @route   GET /api/airports/search
 * @desc    Search airports with query validation
 * @access  Public
 * @query   search?: string (min 2, max 100), country?: string (2 chars), limit?: number (1-100), offset?: number (>=0)
 */
router.get('/search', airportController.queryAirports)

export default router
