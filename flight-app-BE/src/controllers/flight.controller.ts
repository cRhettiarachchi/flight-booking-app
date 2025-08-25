import { Request, Response } from 'express'
import { flightService } from '../services'
import { TFlightQueryParams } from '@/utils/validation'

const searchFlights = async (
  req: Request<unknown, unknown, unknown, TFlightQueryParams>,
  res: Response,
): Promise<void> => {
  try {
    const {
      source,
      destination,
      departure,
      limit = 10,
      page = 1,
    } = req.query

    const result = await flightService.searchFlights({
      source,
      destination,
      departure,
      limit,
      page,
    })

    res.status(200).json({
      data: result.data,
      total: result.total,
      count: result.data.length,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        hasNext: result.hasNext,
        hasPrevious: result.hasPrevious,
        totalPages: Math.ceil(result.total / result.limit),
      },
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

const getFlightById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({
        error: 'Flight ID is required',
        code: 'MISSING_FLIGHT_ID',
      })
      return
    }

    const flight = await flightService.getFlightById(id)

    if (!flight) {
      res.status(404).json({
        error: 'Flight not found',
        code: 'FLIGHT_NOT_FOUND',
      })
      return
    }

    res.status(200).json({
      data: flight,
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

export const flightController = { searchFlights, getFlightById }
