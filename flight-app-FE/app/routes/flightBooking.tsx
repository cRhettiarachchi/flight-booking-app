'use client'

import { BookingForm } from '~/components/bookingForm'
import { FlightSummary } from '~/components/flightSummary'
import { RoundtripItinerary } from '~/components/roundTripItinerary'
import type { Route } from './+types/flightBooking'

export const loader = async ({
  params: { sourceId, destinationId },
}: Route.LoaderArgs) => {
  console.log('FlightDetailsPage loader', { sourceId })
  return {}
}

export default function FlightDetailsPage() {
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
            <FlightSummary type="roundtrip" />
            <RoundtripItinerary />
          </div>
          <div className="lg:col-span-1">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
