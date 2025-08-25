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
      return: returnDate,
      limit = '10',
      page = '1',
      sortBy,
      sortOrder,
    } = req.query

    // Convert string query parameters to numbers
    const numericLimit = parseInt(limit.toString(), 10) || 10
    const numericPage = parseInt(page.toString(), 10) || 1

    const result = await flightService.searchFlights({
      source,
      destination,
      departure,
      return: returnDate,
      limit: numericLimit,
      page: numericPage,
      sortBy,
      sortOrder,
    })

    console.log('Search result:', result)

    res.status(200).json({
      tripType: result.tripType,
      data: result.data,
      total: result.total,
      count: result.data.length,
      pagination: {
        page: numericPage,
        limit: numericLimit,
        total: result.total,
        hasNext: result.hasNext,
        hasPrevious: result.hasPrevious,
        totalPages: Math.ceil(result.total / numericLimit),
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
