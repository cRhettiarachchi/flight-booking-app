import { FlightSearchBar } from '~/components/flightSearch'
import type { Route } from './+types/flights'
import type {
  TFlight,
  TFlightPair,
  TFlightSortOption,
  TFlightSortOrder,
} from '~/lib/types'
import { flightService } from '~/lib/services/flightService'
import { FlightDetailCard } from '~/components/flightDetailCard'
import { redirect, useNavigate } from 'react-router'
import { FlightCardWrapper } from '~/components/flightCardWrapper'
import { PaginationComponent } from '~/components/paginationComponent'
import { fromYYMMDD, yyMMddToISO } from '~/lib/utils'
import { SortingMenu, type SortOption } from '~/components/sortFlights'

export const loader = async ({
  params: { source, destination, dep, arr },
  request,
}: Route.LoaderArgs) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const limit = Number(searchParams.get('limit')) || 10
  const page = Number(searchParams.get('page')) || 1
  const sortBy = (searchParams.get('sortBy') as TFlightSortOption) || 'price'
  const sortOrder = (searchParams.get('sortOrder') as TFlightSortOrder) || 'asc'

  try {
    const searchParamsObj = {
      departureAirport: source.toUpperCase(),
      arrivalAirport: destination.toUpperCase(),
      departureDate: yyMMddToISO(dep),
      ...(arr && { arrivalDate: yyMMddToISO(arr) }),
      page,
      limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    }

    const data = await flightService.searchFlightResults(searchParamsObj)

    return {
      ...data,
      params: { source, destination, dep, arr },
      sortBy,
      sortOrder,
    }
  } catch (error) {
    console.error('Error fetching flights:', error)
    return redirect('/error')
  }
}

const Flights = ({ loaderData }: Route.ComponentProps) => {
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
    sortBy,
    sortOrder,
  } = loaderData

  // Create current sort value for the SortingMenu
  const currentSort: SortOption =
    sortBy && sortOrder ? (`${sortBy}-${sortOrder}` as SortOption) : 'price-asc'

  const getFlightSummary = (flight: TFlight | TFlightPair) => {
    if (tripType === 'one-way') {
      const flightDetail = flight as TFlight
      return {
        price: flightDetail.price,
        currency: flightDetail.currency,
        airline: flightDetail.airline,
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
    const currentUrl = new URL(window.location.href)
    const searchParams = new URLSearchParams(currentUrl.search)

    // Preserve existing sort parameters
    searchParams.set('page', page.toString())

    let path = arr
      ? `${base}/${dep}/${arr}?${searchParams.toString()}`
      : `${base}/${dep}?${searchParams.toString()}`
    navigate(path)
  }

  const onSortChange = (sortOption: SortOption) => {
    const [sortField, sortDirection] = sortOption.split('-') as [
      string,
      'asc' | 'desc',
    ]
    const base = `/flights/${source}/${destination}`

    const searchParams = new URLSearchParams()
    searchParams.set('sortBy', sortField)
    searchParams.set('sortOrder', sortDirection)
    searchParams.set('page', '1') // Reset to first page when sorting changes

    let path = arr
      ? `${base}/${dep}/${arr}?${searchParams.toString()}`
      : `${base}/${dep}?${searchParams.toString()}`
    navigate(path)
  }

  const navigateToBooking = (flight: TFlight | TFlightPair) => {
    let path = `/flights/booking`

    if (tripType === 'one-way') {
      const flightDetail = flight as TFlight
      path += `/${flightDetail.id}`
      return navigate(path)
    }
    if (tripType === 'round-trip') {
      const pair = flight as TFlightPair
      path += `/${pair.outbound.id}/${pair.return.id}`
    }

    navigate(path)
  }

  return (
    <>
      <FlightSearchBar
        departureAirport={source}
        arrivalAirport={destination}
        departureDate={fromYYMMDD(dep)}
        arrivalDate={arr ? fromYYMMDD(arr) : undefined}
      />

      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-6xl flex justify-end px-4">
          <SortingMenu value={currentSort} onChange={onSortChange} />
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-6xl">
          {data &&
            data.length > 0 &&
            data.map((flight) => (
              <div
                role="button"
                className="cursor-pointer my-4"
                onClick={() => navigateToBooking(flight)}
                key={JSON.stringify(flight)}
              >
                <FlightCardWrapper
                  onFlightSelect={() => navigateToBooking(flight)}
                  {...getFlightSummary(flight)}
                >
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
