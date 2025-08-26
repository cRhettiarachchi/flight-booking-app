import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export const FlightCardWrapper = ({
  children,
  airline,
  price,
  currency,
  onFlightSelect,
}: {
  children: React.ReactNode
  airline?: string
  price?: number
  currency?: string
  onFlightSelect: () => void
}) => {
  return (
    <Card className="flex flex-col md:flex-row items-stretch justify-between rounded-xl shadow-sm p-0 border bg-muted/40 w-full">
      <CardContent className="flex-1 flex flex-col md:flex-row items-center gap-4 py-4 px-4">
        {children}
        <div className="flex flex-row items-center w-full h-full md:w-56  md:flex-col rounded-md bg-background px-4 py-4 md:py-2">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs text-muted-foreground mb-1">
              {airline}
            </span>
            <span className="font-bold text-2xl">
              {currency} {price}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Button
              onClick={onFlightSelect}
              className="font-semibold cursor-pointer"
              size="sm"
            >
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
