import * as React from 'react'
import { format } from 'date-fns'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'
import { Button } from '~/components/ui/button'
import type { Mode } from 'react-day-picker'

type TProps = {
  mode: Mode
  value: { from: Date; to?: Date }
  onChange: (v: any) => void
  triggerClassName?: string
  triggerIcon?: React.ReactNode
}

export function DatePickerRangeOrSingle({
  mode = 'single',
  value,
  onChange,
  triggerClassName,
  triggerIcon,
}: TProps) {
  const [open, setOpen] = React.useState(false)

  const getDateValue = (): Date | { from: Date; to?: Date } => {
    if (mode === 'single') {
      return value.from
    } else {
      return { ...value }
    }
  }

  const getLabel = () => {
    if (mode === 'single') {
      return value?.from ? format(value.from, 'PPP') : 'Select date'
    } else {
      if (value?.from && value?.to) {
        return `${format(value.from, 'PPP')} - ${format(value.to, 'PPP')}`
      } else if (value?.from) {
        return `${format(value.from, 'PPP')} - `
      } else {
        return 'Select date range'
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('rounded-full h-11', triggerClassName)}
        >
          {triggerIcon}
          {getLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="center">
        {mode === 'single' ? (
          <Calendar
            mode="single"
            selected={getDateValue() as Date}
            required
            onSelect={(value: Date | undefined) => {
              onChange(value)
              setOpen(false)
            }}
          />
        ) : (
          <Calendar
            mode="range"
            selected={getDateValue() as { from: Date; to?: Date }}
            required
            onSelect={(value: { from?: Date; to?: Date } | undefined) => {
              onChange(value)
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

// simple cn helper if you don't have one already
function cn(...cls: (string | undefined | false)[]) {
  return cls.filter(Boolean).join(' ')
}
