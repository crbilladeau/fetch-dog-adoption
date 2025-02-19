import React, { useState } from 'react';

/* Icons */
import { Check, ChevronsUpDown } from 'lucide-react';

/* UI */
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
import { cn } from '@/lib/utils';

interface BreedFilterProps {
  breeds: string[];
  isLoading: boolean;
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
}

const BreedFilter = ({
  breeds,
  isLoading,
  selectedBreeds,
  setSelectedBreeds,
}: BreedFilterProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [value] = useState('');

  const selectBreed = (breed: string) => {
    setSelectedBreeds((prevState) =>
      prevState.includes(breed)
        ? prevState.filter((b) => b !== breed)
        : [...prevState, breed]
    );
  };

  const chosenBreedsLabel = () => {
    if (selectedBreeds.length > 0) {
      const firstBreed = breeds.find((b) => b === selectedBreeds[0]);

      if (selectedBreeds.length > 1) {
        return firstBreed + ' and ' + (selectedBreeds.length - 1) + ' more';
      } else {
        return firstBreed;
      }
    } else {
      return 'Select dog breeds';
    }
  };

  const selectedBreedsItem = (breed: string) => {
    return (
      <CommandItem key={breed} value={breed} onSelect={selectBreed}>
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            selectedBreeds.includes(breed) ? 'opacity-100' : 'opacity-0'
          )}
        />
        {breed}
      </CommandItem>
    );
  };

  return (
    <Popover open={openFilter} onOpenChange={setOpenFilter}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={openFilter}
          disabled={isLoading}
          className='w-[350px] justify-between'>
          {chosenBreedsLabel()}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[350px] p-0'>
        <Command>
          <CommandInput placeholder='Search dog breeds' />
          <CommandList>
            <CommandEmpty>No breeds found.</CommandEmpty>
            <CommandGroup>
              {breeds
                ?.filter((breed: string) =>
                  breed.toLowerCase().includes(value.toLowerCase())
                )
                .map((breed) => selectedBreedsItem(breed))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BreedFilter;
