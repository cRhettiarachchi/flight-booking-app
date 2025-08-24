import { FlightSearchBar } from '~/flightSearch/flightSearch'
import type { Route } from './+types/flights'
import type { TFlightPaginatedResponse } from '~/lib/types/TFlightsResponse'
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
      'http://localhost:3001/api/flights/search?source=JFK&destination=LAX&departure=2024-08-25&limit=3',
    )

    return data
  } catch (error) {
    console.error('Error fetching flights:', error)
  }
}

const Flights = ({ loaderData }: Route.ComponentProps) => {
  console.log('Flights page', loaderData?.data)

  const navigate = useNavigate()

  return (
    <>
      <FlightSearchBar />

      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-6xl">
          <h1></h1>
          {loaderData?.data && loaderData.data.length > 0
            ? loaderData.data.map((flight) => (
                <div
                  className="my-4"
                  key={flight.source + flight.destination + flight.departure}
                >
                  <FlightDetailCard {...flight} />
                </div>
              ))
            : null}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${loaderData?.meta.page}`}
                  aria-disabled={!loaderData?.meta.hasPreviousPage}
                />
              </PaginationItem>
              {[...Array(loaderData?.meta.totalPages)].map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href={`?page=${idx + 1}`}
                    isActive={loaderData?.meta.page === idx + 1}
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
                  aria-disabled={!loaderData?.meta.hasNextPage}
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
