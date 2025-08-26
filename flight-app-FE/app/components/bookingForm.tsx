import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingFormSchema } from '~/lib/schemas/bookingSchema'
import type { TBookingFormData } from '~/lib/types'

export const BookingForm = ({
  onSubmit,
}: {
  onSubmit: (data: TBookingFormData) => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  })

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Passenger Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register('fullName')}
            />
            {errors.fullName && (
              <span className="text-xs text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="phone">Phone Number</Label>
              <span className="text-xs text-muted-foreground">Optional</span>
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="+81 000 0000"
              {...register('phone')}
            />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Book Flight
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
