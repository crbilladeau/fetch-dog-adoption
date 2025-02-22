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

/* Types */
import { DogsSearchParams } from '../../../hooks/fetchers/useFetchDogs';

interface BreedFilterProps {
  breeds: string[];
  isLoading: boolean;
  selectedBreeds: string[];
  setParams: React.Dispatch<React.SetStateAction<DogsSearchParams>>;
}

const BreedFilter = ({
  breeds,
  isLoading,
  selectedBreeds,
  setParams,
}: BreedFilterProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [value] = useState('');

  const selectBreed = (breed: string) => {
    setParams((prevState) => {
      const prevBreeds = prevState.breeds ?? [];

      return {
        ...prevState,
        breeds: prevBreeds.includes(breed)
          ? prevBreeds.filter((b) => b !== breed)
          : [...prevBreeds, breed],
      };
    });
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
          className='w-full max-w-[500px] sm:max-w-[350px] justify-between py-5 border-2 border-popover-foreground'>
          {chosenBreedsLabel()}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[350px] p-0'>
        <Command>
          <CommandInput placeholder='Search dog breeds' />
          <CommandList>
            <CommandEmpty>
              <p className='font-medium text-foreground'>No breeds found.</p>
            </CommandEmpty>
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
