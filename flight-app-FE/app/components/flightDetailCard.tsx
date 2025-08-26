import type { TFlight } from '~/lib/types/TFlightsResponse'

export const FlightDetailCard = ({
  duration,
  departure,
  arrival,
  airline,
  flightNumber,
  availableSeats,
  aircraft,
  flightClass,
  source,
  destination,
}: Omit<TFlight, 'price' | 'currency'>) => {
  return (
    <div className="flex-1 flex flex-row  items-center justify-center md:items-start gap-4">
      <div className="md:w-80 flex flex-col items-center justify-center md:items-start">
        <span className="font-semibold text-sm md:text-base text-primary">
          {airline}
        </span>
        <span className="text-xs text-muted-foreground">#{flightNumber}</span>
      </div>
      {/* Journey details */}
      <div className="flex-1 flex flex-col ">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">depTime</span>
            <span className="uppercase text-xs text-muted-foreground">
              {source}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {departure}
            </span>
          </div>

          <div className="flex flex-col items-center mx-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-xs">{duration}</span>
              <span>✈️</span>
            </div>
            <div className="text-[10px] text-muted-foreground">{aircraft}</div>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">arrTime</span>
            <span className="uppercase text-xs text-muted-foreground">
              {destination}
            </span>
            <span className="text-[10px] text-muted-foreground">{arrival}</span>
          </div>

          <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
            <span>{flightClass}</span>
            <span className="hidden md:inline">•</span>
            <span>{availableSeats} seats left</span>
          </div>
        </div>
      </div>
    </div>
  )
}
