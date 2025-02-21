import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/* Types */
import { DogsSearchParams } from '../../hooks/types/FetchDogs';

const BY_OPTIONS = ['breed', 'age', 'name'];
const ORDER_OPTIONS = ['asc', 'desc'];

interface SortDropdownProps {
  type: 'field' | 'order';
  setParams: React.Dispatch<React.SetStateAction<DogsSearchParams>>;
  params: DogsSearchParams;
}

const SortDropdown = ({ type, setParams, params }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);

  const OPTIONS = type === 'order' ? ORDER_OPTIONS : BY_OPTIONS;
  const value = params?.sort?.[type] ?? '';

  const selectOption = (currentValue: string) => {
    setParams((prevState) => {
      const newSort = prevState.sort
        ? { ...prevState.sort }
        : { field: '', order: '' };
      // if they deselect the current value, reset the sort back to an empty string
      if (currentValue === value) {
        if (type === 'field') {
          newSort.field = '';
        } else if (type === 'order') {
          newSort.order = '';
        }
      } else {
        if (type === 'field') {
          newSort.field = currentValue;
        } else if (type === 'order') {
          newSort.order = currentValue;
        }
      }
      return { ...prevState, sort: newSort };
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='mx-2'>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[150px] justify-between border-2 border-popover-foreground'>
          {value ? OPTIONS.find((option) => option === value) : `Sort ${type}`}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[150px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {OPTIONS.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => selectOption(currentValue)}>
                  {option}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === option ? 'opacity-100' : 'opacity-0'
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

export default SortDropdown;
