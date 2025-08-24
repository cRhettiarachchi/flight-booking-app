import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { Button } from "~/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import airports from "../lib/mocks/airports.json"; // see below

type Props = {
  value?: string;
  onChange: (code: string) => void;
  placeholder?: string;
};

export function AirportCombobox({ value, onChange, placeholder }: Props) {
  const [open, setOpen] = React.useState(false);

  const label = React.useMemo(() => {
    if (!value) return placeholder ?? "Select airport";
    const a = airports.find((x) => x.code === value.toUpperCase());
    return a ? `${a.code} — ${a.city}` : value.toUpperCase();
  }, [value, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-full h-11"
        >
          <span className="truncate">
            <span className="font-mono mr-2">
              {value ? value.toUpperCase() : ""}
            </span>
            {label}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[360px]">
        <Command>
          <CommandInput placeholder="Search airport or city…" autoFocus />
          <CommandEmpty>No airport found.</CommandEmpty>
          <CommandGroup heading="Airports">
            {airports.map((a) => (
              <CommandItem
                key={a.code}
                value={`${a.code} ${a.city} ${a.name}`}
                onSelect={() => {
                  onChange(a.code);
                  setOpen(false);
                }}
              >
                <span className="font-mono w-14">{a.code}</span>
                <span className="ml-2 truncate">
                  {a.city} — {a.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
