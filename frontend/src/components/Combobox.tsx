"use client"
import React, { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SatelliteData } from '@/lib/mapHelpers';
  interface ComboboxDemoProps {
    data: SatelliteData[];
    // eslint-disable-next-line no-unused-vars
    onSelect: (selectedValue: SatelliteData) => void;
  }
  
  export function Combobox({ data, onSelect }: ComboboxDemoProps) {
    console.log();
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
  
    const handleSelect = (currentValue: SatelliteData) => {
      setValue(currentValue.name === value ? "" : currentValue.name);
      setOpen(false);
      onSelect(currentValue); // Call the passed onSelect function with the selected value
    };
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? data.find((item) => item.name === value)?.name : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={() => handleSelect(item)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }