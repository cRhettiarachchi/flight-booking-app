import { ArrowLeftRight, Badge } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

export const RoundtripItinerary = () => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          <CardTitle className="text-base">Itinerary (Roundtrip)</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Outbound */}
          <div className="p-4 rounded-xl border bg-background">
            <div className="flex items-center justify-between">
              <Badge>Outbound</Badge>
              <span className="text-xs text-muted-foreground">
                Airline — • Flight —
              </span>
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-3 items-center gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Departure</div>
                <div className="font-semibold">—</div>
                <div className="text-sm">—</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Arrival</div>
                <div className="font-semibold">—</div>
                <div className="text-sm">—</div>
              </div>
            </div>
          </div>
          {/* Return */}
          <div className="p-4 rounded-xl border bg-background">
            <div className="flex items-center justify-between">
              <Badge>Return</Badge>
              <span className="text-xs text-muted-foreground">
                Airline — • Flight —
              </span>
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-3 items-center gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Departure</div>
                <div className="font-semibold">—</div>
                <div className="text-sm">—</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Arrival</div>
                <div className="font-semibold">—</div>
                <div className="text-sm">—</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
