import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ArrowLeftRight, Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group'
import { cn } from '~/lib/utils'

import { AirportCombobox } from '../components/airportCombobox'
import { DatePickerRangeOrSingle } from '../components/datePickerRangeOrSingle'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { redirect, useNavigate } from 'react-router'

const schema = z
  .object({
    trip: z.enum(['oneway', 'round']),
    from: z.string().length(3, 'Choose origin'),
    to: z.string().length(3, 'Choose destination'),
    depart: z.date(),
    return: z.date().optional(),
  })
  .refine((v) => v.from.toUpperCase() !== v.to.toUpperCase(), {
    path: ['to'],
    message: 'Airports must differ',
  })
  .refine((v) => v.trip === 'oneway' || !!v.return, {
    path: ['return'],
    message: 'Return date required',
  })

function toYYMMDD(d: Date) {
  return format(d, 'yyMMdd')
}

export function FlightSearchBar() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      trip: 'round',
      from: '',
      to: '',
    },
  })

  const { getValues, setValue, watch, handleSubmit, control } = form

  const swap = () => {
    const f = getValues('from')
    const t = getValues('to')
    setValue('from', t ?? '')
    setValue('to', f ?? '')
  }

  const onSubmit = (value: z.infer<typeof schema>) => {
    const base = `/flights/${value.from.toLowerCase()}/${value.to.toLowerCase()}/${toYYMMDD(value.depart)}`
    const path =
      value.trip === 'round' && value.return
        ? `${base}/${toYYMMDD(value.return)}`
        : base

    console.log(path)
    navigate(path)
  }

  const isRound = watch('trip') === 'round'
  const depart = watch('depart')
  const rtn = watch('return')

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle>Search your flights</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="trip"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <FormLabel className="sr-only">Trip</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={(v) => v && field.onChange(v)}
                          className="rounded-full bg-muted/30 p-1"
                        >
                          <ToggleGroupItem
                            value="oneway"
                            className="px-3 rounded-full"
                          >
                            One-way
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="round"
                            className="px-3 rounded-full"
                          >
                            Round trip
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <div className="flex-1">
                    <FormField
                      control={control}
                      name="from"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From</FormLabel>
                          <FormControl>
                            <AirportCombobox
                              value={field.value}
                              onChange={(v) => field.onChange(v.toUpperCase())}
                              placeholder="Select the origin airport"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Swap */}
                  <div className="flex items-end justify-center pb-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={swap}
                      aria-label="Swap airports"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* To */}
                  <div className="flex-1">
                    <FormField
                      control={control}
                      name="to"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>To</FormLabel>
                          <FormControl>
                            <AirportCombobox
                              value={field.value}
                              onChange={(v) => field.onChange(v.toUpperCase())}
                              placeholder="Select the destination airport"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={control}
                      name="depart"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>{isRound ? 'Dates' : 'Depart'}</FormLabel>
                          <FormControl>
                            <DatePickerRangeOrSingle
                              mode={isRound ? 'range' : 'single'}
                              value={{ from: depart, to: rtn }}
                              onChange={(val: any) => {
                                if (isRound) {
                                  setValue('depart', val?.from)
                                  setValue('return', val?.to)
                                } else {
                                  field.onChange(val as Date)
                                }
                              }}
                              triggerClassName="w-full justify-start"
                              triggerIcon={
                                <CalendarIcon className="mr-2 h-4 w-4" />
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* CTA */}
                  <div className="flex items-end">
                    <Button
                      type="submit"
                      className="w-full md:w-auto rounded-full text-base h-11 px-6"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
