import { FlightSearchBar } from '~/flightSearch/flightSearch'
import type { Route } from './+types/flights'
import type {
  TFlight,
  TFlightPaginatedResponse,
  TFlightPair,
} from '~/lib/types/TFlightsResponse'
import { fetchApi } from '~/lib/api/fetch'
import { FlightDetailCard } from '~/components/flightDetailCard'
import { useNavigate } from 'react-router'
import { FlightCardWrapper } from '~/components/flightCardWrapper'
import { PaginationComponent } from '~/components/paginationComponent'
import { fromYYMMDD, yyMMddToISO } from '~/lib/utils'

export const loader = async ({
  params: { source, destination, dep, arr },
  request,
}: Route.LoaderArgs) => {
  console.log('Flights loader', { source, destination, dep, arr })
  const url = new URL(request.url)
  const searchParams = url.searchParams
  console.log('Search params:', searchParams.get('page'))

  const limit = searchParams.get('limit') || '10'
  const page = searchParams.get('page') || '1'

  try {
    const base = `http://localhost:3001/api/flights/search?source=${source}&destination=${destination}&departure=${yyMMddToISO(dep)}&limit=${limit}&page=${page}`
    let path = arr ? `${base}&return=${yyMMddToISO(arr)}` : base
    const data = await fetchApi<TFlightPaginatedResponse>(path)

    console.log('Fetched flight data:', data)

    return { ...data, params: { source, destination, dep, arr } }
  } catch (error) {
    console.log(error)
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

  const {
    data,
    tripType,
    pagination,
    params: { destination, source, arr, dep },
  } = loaderData

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

  const onPaginate = (page: number) => {
    const base = `/flights/${source}/${destination}`
    let path = arr
      ? `${base}/${dep}/${arr}?page=${page}`
      : `${base}/${dep}?page=${page}`
    navigate(path)
  }

  return (
    <>
      <FlightSearchBar
        from={source}
        to={destination}
        depart={fromYYMMDD(dep)}
        return={arr ? fromYYMMDD(arr) : undefined}
      />

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

          <PaginationComponent
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNext}
            hasPreviousPage={pagination.hasPrevious}
            setPage={onPaginate}
          />
        </div>
      </div>
    </>
  )
}

export default Flights
