import React, { useState } from 'react';

/* Icons */
import { ChevronsUpDown } from 'lucide-react';

/* UI */
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/* Types */
import { DogsSearchParams } from '../../../hooks/fetchers/useFetchDogs';

interface AgeFilterProps {
  isLoading: boolean;
  setParams: React.Dispatch<React.SetStateAction<DogsSearchParams>>;
}

const AgeFilter = ({ isLoading, setParams }: AgeFilterProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const hasBothAges = ageMin && ageMax;

  const renderAgeLabel = () => {
    if (hasBothAges) {
      return `${ageMin} - ${ageMax} years old`;
    } else if (ageMin) {
      return `${ageMin}+ years old`;
    } else if (ageMax) {
      return `< ${ageMax} years old`;
    } else {
      return 'Select age';
    }
  };

  const isANumber = (value: string) => {
    return value.trim() !== '' && !Number.isNaN(Number(value));
  };

  const validateAge = (ageMin: string, ageMax: string) => {
    // reset any errors before we validate again
    setError(null);

    if ((ageMin && !isANumber(ageMin)) || (ageMax && !isANumber(ageMax))) {
      setError('Please enter a valid number');
      return false;
    }

    if (hasBothAges && Number(ageMin) >= Number(ageMax)) {
      setError('Minimum age must be less than maximum age');
      return false;
    }

    if (hasBothAges && Number(ageMax) <= Number(ageMin)) {
      setError('Maximum age must be greater than minimum age');
      return false;
    }

    return true;
  };

  const handleAgeChange = (age: { ageMin: string; ageMax: string }) => {
    const { ageMin, ageMax } = age || {};

    if (ageMin || ageMin === '') {
      setAgeMin(ageMin);
    }
    if (ageMax || ageMax === '') {
      setAgeMax(ageMax);
    }
  };

  const submitAge = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateAge(ageMin, ageMax);

    if (!valid) {
      return;
    } else {
      setParams((prevState) => {
        return {
          ...prevState,
          ageMin: ageMin ? Number(ageMin) : undefined,
          ageMax: ageMax ? Number(ageMax) : undefined,
        };
      });
    }
  };

  return (
    <Popover open={openFilter} onOpenChange={setOpenFilter}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={openFilter}
          disabled={isLoading}
          className='w-full max-w-[500px] sm:max-w-[200px] justify-between py-5 border-2 border-popover-foreground'>
          {renderAgeLabel()}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[400px] sm:max-w-[200px]'>
        <form className='flex flex-col gap-4' onSubmit={submitAge}>
          <div>
            <Label htmlFor='ageMin'>Minimum Age</Label>
            <Input
              className='border-2 border-popover-foreground text-popover-foreground font-medium focus:bg-accent'
              id='ageMin'
              defaultValue={ageMin}
              type='number'
              min='0'
              max='15'
              placeholder='0'
              onChange={(e) =>
                handleAgeChange({ ageMin: e.target.value, ageMax })
              }
            />
          </div>
          <div>
            <Label htmlFor='ageMax'>Maximum Age</Label>
            <Input
              className='border-2 border-popover-foreground text-popover-foreground font-medium focus:bg-accent'
              id='ageMax'
              defaultValue={ageMax}
              type='number'
              min='0'
              max='15'
              placeholder='14'
              onChange={(e) =>
                handleAgeChange({ ageMax: e.target.value, ageMin })
              }
            />
          </div>
          <span className='text-destructive font-medium text-sm leading-4'>
            {error}
          </span>
          <Button
            className='cursor-pointer focus:outline-2 focus:outline-popover-foreground focus-visible:ring-2 focus-visible:ring-popover-foreground px-10 text-popover-foreground font-bold hover:bg-hover'
            type='submit'>
            Apply
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AgeFilter;
