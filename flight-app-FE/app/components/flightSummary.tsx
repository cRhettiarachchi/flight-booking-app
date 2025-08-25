import {
  ArrowLeftRight,
  ArrowRight,
  Badge,
  Calendar,
  Clock,
  DollarSign,
  Plane,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

export type TripType = 'one-way' | 'roundtrip'

// Reusable detail row component
function DetailRow({
  label,
  value,
}: {
  label: string
  value?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value ?? '—'}</span>
    </div>
  )
}

export const FlightSummary = ({ type }: { type: TripType }) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          <CardTitle className="text-base">
            Selected Flight {type === 'roundtrip' ? '(Roundtrip)' : '(One‑Way)'}
          </CardTitle>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge>
            Airline: Test <span className="ml-1 font-semibold">—</span>
          </Badge>
          <Badge>
            Flight No: <span className="ml-1 font-semibold">—</span>
          </Badge>
          <Badge className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Duration: —
          </Badge>
          <Badge className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5" /> Price: —
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Departure */}
        <div className="p-3 rounded-xl bg-muted/40">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowRight className="h-4 w-4" /> Departure
          </div>
          <Separator className="my-2" />
          <DetailRow label="Airport" value="—" />
          <DetailRow
            label="Date"
            value={
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> —
              </span>
            }
          />
          <DetailRow label="Time" value="—" />
        </div>
        {/* Arrival */}
        <div className="p-3 rounded-xl bg-muted/40">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeftRight className="h-4 w-4" /> Arrival
          </div>
          <Separator className="my-2" />
          <DetailRow label="Airport" value="—" />
          <DetailRow
            label="Date"
            value={
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> —
              </span>
            }
          />
          <DetailRow label="Time" value="—" />
        </div>
        {/* Price / Fare */}
        <div className="p-3 rounded-xl bg-muted/40">
          <div className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="h-4 w-4" /> Fare
          </div>
          <Separator className="my-2" />
          <DetailRow label="Ticket Price" value="—" />
          <DetailRow label="Taxes & Fees" value="—" />
          <Separator className="my-2" />
          <DetailRow
            label="Total"
            value={<span className="text-base font-semibold">—</span>}
          />
        </div>
      </CardContent>
    </Card>
  )
}
