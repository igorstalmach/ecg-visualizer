"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useBearStore } from "@/hooks/useStore";
import { useTranslation } from "@/hooks/useTranslation";

export const InputSelector = () => {
  const [open, setOpen] = useState(false);

  const inputType = useBearStore((state) => state.inputType);
  const setInputType = useBearStore((state) => state.setInputType);

  const translation = useTranslation();

  const options = [
    {
      value: "wfdb",
      label: translation.inputSelector.wfdbInput,
    },
    {
      value: "image",
      label: translation.inputSelector.imageInput,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between mb-7"
        >
          {inputType
            ? options.find((option) => option.value === inputType)?.label
            : translation.inputSelector.selectInputType}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder={translation.inputSelector.searchInputTypes}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {translation.inputSelector.noInputOptionFound}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setInputType(
                      currentValue === inputType ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      inputType === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
