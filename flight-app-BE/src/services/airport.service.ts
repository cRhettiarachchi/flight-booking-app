import { TAirport } from '@/utils/types'
import { readFile } from 'fs/promises'
import path from 'path'

const searchAirports = async (
  search: string,
  limit: number,
): Promise<TAirport[]> => {
  const airports = JSON.parse(
    await readFile(path.join(__dirname, '../data/airports-data.json'), 'utf8'),
  ) as TAirport[]
  let results = [...airports]

  const normalizedSearch = search.trim()?.toLowerCase()

  if (normalizedSearch) {
    results = results.filter(
      (airport) =>
        airport.code?.toLowerCase().includes(normalizedSearch) ||
        airport.city?.toLowerCase().includes(normalizedSearch) ||
        airport.name?.toLowerCase().includes(normalizedSearch),
    )
  }

  return results.slice(0, limit)
}

export const airportService = { searchAirports }
