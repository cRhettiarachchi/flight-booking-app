import { Request, Response } from 'express'
import { flightService } from '../services'
import { TFlightQueryParams } from '@/utils/validation'
import { getPageMeta } from '@/utils'

const searchFlights = async (
  req: Request<unknown, unknown, unknown, TFlightQueryParams>,
  res: Response,
): Promise<void> => {
  try {
    const {
      source,
      destination,
      departure,
      arrival,
      limit = 10,
      page = 1,
    } = req.query

    const data = await flightService.searchFlights({
      source,
      destination,
      departure,
      arrival,
      limit,
      page,
    })

    const meta = getPageMeta(page, limit, data.length)

    res.status(200).json({
      data,
      count: data.length,
      meta,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: error.message,
        code: 'INTERNAL_ERROR',
      })
    }
  }
}

export const flightController = { searchFlights }
