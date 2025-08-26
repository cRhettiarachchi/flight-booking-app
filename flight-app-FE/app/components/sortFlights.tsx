import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'departure-asc'
  | 'departure-desc'
  | 'arrival-asc'
  | 'arrival-desc'

const sortLabels: Record<SortOption, string> = {
  'price-asc': 'Price (Low → High)',
  'price-desc': 'Price (High → Low)',
  'departure-asc': 'Departure (Earliest → Latest)',
  'departure-desc': 'Departure (Latest → Earliest)',
  'arrival-asc': 'Arrival (Earliest → Latest)',
  'arrival-desc': 'Arrival (Latest → Earliest)',
}

export function SortingMenu({
  value,
  onChange,
}: {
  value: SortOption
  onChange: (val: SortOption) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Sort by: {sortLabels[value]}
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(sortLabels).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(key as SortOption)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
