import type { TFlight } from '~/lib/types/TFlightsResponse'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export const FlightDetailCard = ({
  duration,
  departure,
  arrival,
  airline,
  flightNumber,
  availableSeats,
  aircraft,
  flightClass,
  price,
  currency,
  source,
  destination,
}: TFlight) => {
  return (
    <>
      <Card className="flex flex-col md:flex-row items-stretch justify-between rounded-xl shadow-sm p-0 border bg-muted/40 w-full">
        {/* Main flight info */}
        <CardContent className="flex-1 flex flex-col md:flex-row items-center gap-4 py-4 px-4">
          {/* No logo, but keep space for airline & number */}
          <div className="flex-1 flex flex-col items-center justify-center md:items-start">
            <span className="font-semibold text-sm md:text-base text-primary">
              {airline}
            </span>
            <span className="text-xs text-muted-foreground">
              #{flightNumber}
            </span>
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
                <div className="text-[10px] text-muted-foreground">
                  {aircraft}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">arrTime</span>
                <span className="uppercase text-xs text-muted-foreground">
                  {destination}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {arrival}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
              <span>{flightClass}</span>
              <span className="hidden md:inline">•</span>
              <span>{availableSeats} seats left</span>
            </div>
          </div>
        </CardContent>
        {/* Side panel for price and action */}
        <div className="flex flex-row md:flex-col md:justify-between items-center md:w-56 border-t md:border-t-0 md:border-l border-border bg-background px-4 py-4 md:py-0">
          <div className="flex flex-col items-center md:items-end flex-1">
            <span className="text-xs text-muted-foreground mb-1">
              {airline}
            </span>
            <span className="font-bold text-2xl">
              {currency} {price}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {availableSeats} seats
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Button className="font-semibold" size="sm">
              Select
            </Button>
          </div>
        </div>
      </Card>
      {/* <div className="w-full flex justify-center"> */}
      {/*   <div className="w-full max-w-6xl"> */}
      {/*     <Card> */}
      {/*       <CardContent> */}
      {/*         <div className="flex flex-col md:flex-row justify-between"> */}
      {/*           <div className="mb-4 md:mb-0"> */}
      {/*             <h2 className="text-xl font-bold">Flight Details</h2> */}
      {/*             <p className="text-gray-600">Flight Number: {flightNumber}</p> */}
      {/*             <p className="text-gray-600">Airline: {airline}</p> */}
      {/*           </div> */}
      {/*           <div className="mb-4 md:mb-0"> */}
      {/*             <h3 className="text-lg font-semibold">Departure</h3> */}
      {/*             <p className="text-gray-600">JFK - New York</p> */}
      {/*             <p className="text-gray-600">Date: 2024-08-25</p> */}
      {/*             <p className="text-gray-600">Time: 10:00 AM</p> */}
      {/*           </div> */}
      {/*           <div> */}
      {/*             <h3 className="text-lg font-semibold">Arrival</h3> */}
      {/*             <p className="text-gray-600">LAX - Los Angeles</p> */}
      {/*             <p className="text-gray-600">Date: 2024-08-25</p> */}
      {/*             <p className="text-gray-600">Time: 1:00 PM</p> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*         <div className="mt-4 flex justify-end"> */}
      {/*           <Button>Book Now</Button> */}
      {/*         </div> */}
      {/*       </CardContent> */}
      {/*     </Card> */}
      {/*   </div> */}
      {/* </div> */}
    </>
  )
}
