import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'

export const BookingForm = () => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Passenger Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="phone">Phone Number</Label>
              <span className="text-xs text-muted-foreground">Optional</span>
            </div>
            <Input id="phone" type="tel" placeholder="+81 000 0000" />
          </div>
          <Button type="button" className="w-full">
            Book Flight
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
