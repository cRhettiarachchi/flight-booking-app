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
import type { TFlight, TTripTypeData } from '~/lib/types'
import { isoToHHMM, isoToYYMMDD, yyMMddToISO } from '~/lib/utils'

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

export const FlightSummary = ({
  tripType,
  flightNumber,
  departure,
  arrival,
  destination,
  source,
  price,
  totalPrice,
  currency,
}: Partial<TFlight> & TTripTypeData & { totalPrice?: number }) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          <CardTitle className="text-base">
            {flightNumber}{' '}
            {tripType === 'round-trip' ? '(Roundtrip)' : '(One‑Way)'}
          </CardTitle>
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
                <Calendar className="h-3.5 w-3.5" />{' '}
                {departure ? isoToYYMMDD(departure) : '—'}
              </span>
            }
          />
          <DetailRow
            label="Time"
            value={departure ? isoToHHMM(departure) : '-'}
          />
        </div>
        {/* Arrival */}
        <div className="p-3 rounded-xl bg-muted/40">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeftRight className="h-4 w-4" /> Arrival
          </div>
          <Separator className="my-2" />
          <DetailRow label="Airport" value={destination || ''} />
          <DetailRow
            label="Date"
            value={
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {arrival ? isoToYYMMDD(arrival) : '—'}
              </span>
            }
          />
          value={arrival ? isoToHHMM(arrival) : '-'}
        </div>
        {/* Price / Fare */}
        <div className="p-3 rounded-xl bg-muted/40">
          <div className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="h-4 w-4" /> Fare
          </div>
          <Separator className="my-2" />
          <DetailRow label="Ticket Price" value={price || '-'} />
          <DetailRow label="Currency" value={currency || '-'} />
          <Separator className="my-2" />
          <DetailRow
            label="Total"
            value={
              <span className="text-base font-semibold">
                {totalPrice || price}
              </span>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
