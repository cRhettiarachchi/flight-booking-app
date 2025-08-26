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
  req: Request<{ sourceId: string; destinationId?: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { sourceId } = req.params

    if (!sourceId) {
      res.status(400).json({
        error: 'Flight ID is required',
        code: 'MISSING_FLIGHT_ID',
      })
      return
    }

    const sourceFlight = await flightService.getFlightById(sourceId)

    let destinationFlight = null

    if (!sourceFlight) {
      res.status(404).json({
        error: 'Flight not found',
        code: 'FLIGHT_NOT_FOUND',
      })
      return
    }

    if (req.params.destinationId) {
      destinationFlight = await flightService.getFlightById(
        req.params.destinationId,
      )
      if (!destinationFlight) {
        res.status(404).json({
          error: 'Return flight not found',
          code: 'RETURN_FLIGHT_NOT_FOUND',
        })
        return
      }
    }

    const getDestinationData = () => {
      if (destinationFlight === null) return {}
      return {
        ...(destinationFlight ? { return: destinationFlight } : {}),

        totalPrice: sourceFlight.price + destinationFlight.price,
        totalDuration: `${sourceFlight.duration} + ${destinationFlight.duration}`,
      }
    }

    res.status(200).json({
      data: {
        tripType: destinationFlight ? 'round-trip' : 'one-way',
        outbound: sourceFlight,
        ...getDestinationData(),
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

export const flightController = { searchFlights, getFlightById }
