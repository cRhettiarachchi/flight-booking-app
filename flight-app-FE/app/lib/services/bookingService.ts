import { fetchApi } from '../api/fetch'
import type { TBookingPayload } from '../types'

// Client side method uses VITE prefix import to get the variables

const API_BASE_URL = import.meta.env.VITE_API_URL

export const submitBooking = async (
  body: TBookingPayload,
): Promise<{ success: boolean }> => {
  return await fetchApi<{ success: boolean }>(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    body,
  })
}
