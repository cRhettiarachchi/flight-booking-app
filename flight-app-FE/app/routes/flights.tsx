import { FlightSearchBar } from '~/flightSearch/flightSearch'
import type { Route } from './+types/flights'
import type {
  TFlight,
  TFlightPaginatedResponse,
  TFlightPair,
} from '~/lib/types/TFlightsResponse'
import { fetchApi } from '~/lib/api/fetch'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { FlightDetailCard } from '~/components/flightDetailCard'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import { useNavigate } from 'react-router'
import { FlightCardWrapper } from '~/components/flightCardWrapper'
import { Separator } from '@radix-ui/react-separator'

export const loader = async ({
  params: { source, destination, dep, arr },
  request,
}: Route.LoaderArgs) => {
  console.log('Flights loader', { source, destination, dep, arr })
  const url = new URL(request.url)
  const searchParams = url.searchParams
  console.log('Search params:', searchParams.get('page'))

  try {
    const data = await fetchApi<TFlightPaginatedResponse>(
      'http://localhost:3001/api/flights/search?source=NRT&destination=CMB&departure=2025-08-25&return=2025-10-10&limit=10&page=1',
    )

    return data
  } catch (error) {
    console.error('Error fetching flights:', error)
  }
}

const Flights = ({ loaderData }: Route.ComponentProps) => {
  console.log('Flights page', loaderData?.data)
  const navigate = useNavigate()

  if (!loaderData) {
    navigate('/error')
    return
  }

  const { data, tripType, pagination } = loaderData

  const getFlightSummary = (flight: TFlight | TFlightPair) => {
    if (tripType === 'one-way') {
      return {
        price: (flight as TFlight).price,
        currency: (flight as TFlight).currency,
        airline: (flight as TFlight).airline,
      }
    }
    if (tripType === 'round-trip') {
      const pair = flight as TFlightPair
      return {
        price: pair.totalPrice,
        currency: pair.outbound.currency,
        airline: `${pair.outbound.airline} / ${pair.return.airline}`,
      }
    }
  }

  const getFlightRender = (flight: TFlight | TFlightPair) => {
    if (tripType === 'one-way') {
      return <FlightDetailCard {...(flight as TFlight)} />
    }
    if (tripType === 'round-trip') {
      const pair = flight as TFlightPair
      return (
        <div className="flex flex-col gap-4 w-full">
          <FlightDetailCard {...pair.outbound} />
          <div className=" w-full justify-center border"></div>
          <FlightDetailCard {...pair.return} />
        </div>
      )
    }
  }

  return (
    <>
      <FlightSearchBar />

      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-6xl">
          <h1></h1>

          {data &&
            data.length > 0 &&
            data.map((flight) => (
              <div className="my-4" key={JSON.stringify(flight)}>
                <FlightCardWrapper {...getFlightSummary(flight)}>
                  {getFlightRender(flight)}
                </FlightCardWrapper>
              </div>
            ))}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={!pagination.hasPreviousPage}
                />
              </PaginationItem>
              {[...Array(pagination.totalPages)].map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href={`?page=${idx + 1}`}
                    isActive={pagination.page === idx + 1}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    console.log('Next page clicked')
                    const base = '/flights/nrt/cts/250813/250813?page=2'
                    navigate(base)
                  }}
                  aria-disabled={!pagination.hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  )
}

export default Flights
