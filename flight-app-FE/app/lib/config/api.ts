const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  flights: {
    search: `${API_BASE_URL}/flights/search`,
    getById: (sourceId: string, destinationId?: string) =>
      `${API_BASE_URL}/flights/${sourceId}${destinationId ? `/${destinationId}` : ''}`,
  },
} as const

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  defaultTimeout: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
} as const
