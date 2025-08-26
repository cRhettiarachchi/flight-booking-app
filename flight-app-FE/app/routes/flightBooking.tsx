import { BookingForm } from '~/components/bookingForm'
import { FlightSummary } from '~/components/flightSummary'
import type { Route } from './+types/flightBooking'
import { getFlightDetails } from '~/lib/services/flightService'
import { useNavigate, useSubmit } from 'react-router'
import { Card, CardFooter } from '~/components/ui/card'

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

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData()
  console.log(formData.get('fullName'))
  return null
}

export default function FlightDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate()

  let submit = useSubmit()

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
            <Card className="rounded-2xl shadow-sm">
              <FlightSummary {...outbound} />
              {rtn && <FlightSummary {...rtn} />}
              {totalPrice && (
                <CardFooter>
                  <div className="flex justify-end">
                    <span className="text-lg font-semibold">
                      Total Price: {outbound.currency} {totalPrice}
                    </span>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <BookingForm
              onSubmit={(data) => submit(data, { method: 'post' })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
