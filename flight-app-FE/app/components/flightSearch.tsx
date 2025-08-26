import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { toYYMMDD } from '~/lib/utils'
import { flightSearchFormSchema } from '~/lib/schemas'
import type { TFlightSearchFormData } from '~/lib/types'

import { AirportCombobox } from '../components/airportCombobox'
import { DatePickerRangeOrSingle } from '../components/datePickerRangeOrSingle'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useNavigate } from 'react-router'

export function FlightSearchBar({
  departureAirport,
  arrivalAirport,
  tripType,
  departureDate,
  arrivalDate,
}: Partial<TFlightSearchFormData>) {
  const navigate = useNavigate()

  const form = useForm<TFlightSearchFormData>({
    resolver: zodResolver(flightSearchFormSchema),
    defaultValues: {
      tripType: tripType || 'round-trip',
      departureAirport: departureAirport || '',
      arrivalAirport: arrivalAirport || '',
      departureDate,
      arrivalDate,
    },
  })

  const { getValues, setValue, watch, handleSubmit, control } = form

  const swapAirports = () => {
    const departure = getValues('departureAirport')
    const arrival = getValues('arrivalAirport')
    setValue('departureAirport', arrival ?? '')
    setValue('arrivalAirport', departure ?? '')
  }

  const onSubmit = (value: TFlightSearchFormData) => {
    const base = `/flights/${value.departureAirport.toLowerCase()}/${value.arrivalAirport.toLowerCase()}/${toYYMMDD(value.departureDate)}`
    const path =
      value.tripType === 'round-trip' && value.arrivalDate
        ? `${base}/${toYYMMDD(value.arrivalDate)}`
        : base

    navigate(path)
  }

  const isRoundTrip = watch('tripType') === 'round-trip'
  const departureFormValue = watch('departureDate')
  const arrivalFormValue = watch('arrivalDate')

  return (
    <div className="w-full flex justify-center px-2 md:px-0">
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
                  name="tripType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <FormLabel className="sr-only">Trip Type</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={(v) => v && field.onChange(v)}
                          className="rounded-full bg-muted/30 p-1"
                        >
                          <ToggleGroupItem
                            value="one-way"
                            className="px-3 rounded-full"
                          >
                            One-way
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="round-trip"
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

                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                  <div className="flex-1">
                    <FormField
                      control={control}
                      name="departureAirport"
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
                  <div className="flex items-end justify-center pb-1 md:pb-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={swapAirports}
                      aria-label="Swap airports"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* To */}
                  <div className="flex-1">
                    <FormField
                      control={control}
                      name="arrivalAirport"
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
                      name="departureDate"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>
                            {isRoundTrip ? 'Dates' : 'Departure'}
                          </FormLabel>
                          <FormControl>
                            <DatePickerRangeOrSingle
                              mode={isRoundTrip ? 'range' : 'single'}
                              value={{
                                from: departureFormValue,
                                to: arrivalFormValue,
                              }}
                              onChange={(val: any) => {
                                if (isRoundTrip) {
                                  setValue('departureDate', val?.from)
                                  setValue('arrivalDate', val?.to)
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
