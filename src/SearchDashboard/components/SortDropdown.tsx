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

const BY_OPTIONS = ['breed', 'age', 'name'];
const ORDER_OPTIONS = ['asc', 'desc'];

const SortDropdown = ({ type }: { type: 'by' | 'order' }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const OPTIONS = type === 'order' ? ORDER_OPTIONS : BY_OPTIONS;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='mx-2'>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[150px] justify-between'>
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
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}>
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
