import { Button } from '@/components/ui/button';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const options = [
   {
      value: 'polish',
      label: '🇵🇱 Polski',
   },
   {
      value: 'english',
      label: '🇺🇸 English',
   },
];

export const LanguageSelector = () => {
   const [open, setOpen] = useState(false);

   const language = useBearStore((state) => state.language);
   const setLanguage = useBearStore((state) => state.setLanguage);

   const translation = useTranslation();

   return (
      <div className="absolute bottom-5 right-5 z-1">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[150px] justify-between"
               >
                  {language
                     ? options.find((option) => option.value === language)
                          ?.label
                     : translation.languageSelector.selectLanguage}
                  <ChevronsUpDown className="opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
               <Command>
                  <CommandInput
                     placeholder={translation.languageSelector.searchLanguage}
                     className="h-9"
                  />
                  <CommandList>
                     <CommandEmpty>
                        {translation.languageSelector.noLanguagesFound}
                     </CommandEmpty>
                     <CommandGroup>
                        {options.map((option) => (
                           <CommandItem
                              key={option.value}
                              value={option.value}
                              onSelect={(currentValue) => {
                                 setLanguage(currentValue);
                                 setOpen(false);
                              }}
                           >
                              {option.label}
                              <Check
                                 className={cn(
                                    'ml-auto',
                                    language === option.value
                                       ? 'opacity-100'
                                       : 'opacity-0',
                                 )}
                              />
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </div>
   );
};
