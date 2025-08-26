'use client'

import { BookingForm } from '~/components/bookingForm'
import { FlightSummary } from '~/components/flightSummary'
import { RoundtripItinerary } from '~/components/roundTripItinerary'
import type { Route } from './+types/flightBooking'
import { getFlightDetails } from '~/lib/services/flightService'
import { useNavigate } from 'react-router'

export const loader = async ({
  params: { sourceId, destinationId },
}: Route.LoaderArgs) => {
  try {
    if (sourceId) {
      const { data } = await getFlightDetails(sourceId, destinationId)
      return { ...data }
    }
  } catch (error) {
    console.error('Error fetching flight details:', error)
    return null
  }
}

export default function FlightDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate()

  if (!loaderData) {
    navigate('/error')
    return
  }

  const { outbound, return: rtn, tripType, totalPrice } = loaderData

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Flight Details
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your selection and proceed to booking. (All values are
            placeholders)
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FlightSummary tripType={tripType} {...outbound} />
            {tripType === 'round-trip' && <RoundtripItinerary />}
          </div>

          <div className="lg:col-span-1">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
