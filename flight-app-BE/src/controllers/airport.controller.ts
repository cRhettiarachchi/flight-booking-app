import { Request, Response } from 'express'
import { airportService } from '../services'
import { TSearchQueryParams } from '@/utils/validation'

const queryAirports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, limit = 10 } = req.query as any as TSearchQueryParams
    const data = await airportService.searchAirports(search || '', limit)

    res.status(200).json({
      data,
      count: data.length,
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

export const airportController = { queryAirports }
