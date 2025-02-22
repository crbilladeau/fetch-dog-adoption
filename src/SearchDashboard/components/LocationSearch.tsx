import { useState } from 'react';

/* UI */
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

/* Hooks */
import useFetchLocations from '../../hooks/fetchers/useFetchLocations';
import useDebounce from '../../hooks/util/useDebounce';

/* Types */
import { DogsSearchParams } from '../../hooks/types/FetchDogs';

interface LocationSearchProps {
  setParams: React.Dispatch<React.SetStateAction<DogsSearchParams>>;
}

const LocationSearch = ({ setParams }: LocationSearchProps) => {
  const [value, setValue] = useState<string>('');

  const debouncedValue = useDebounce(value, 300);
  const { locations, isLoading } = useFetchLocations({
    query: debouncedValue,
    skip: !value,
  });

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // handles resetting the search if no value is entered
    if (!value) {
      if (e.key === 'Enter') {
        setParams((prevState) => ({ ...prevState, zipCodes: [] }));
      }
    }
  };

  return (
    <div className='w-full max-w-[500px] mr-3 relative'>
      <Command className='border-2 border-popover-foreground focus-within:bg-accent text-foreground font-semibold'>
        <CommandInput
          placeholder='Enter city, state, or zipcode'
          onValueChange={handleValueChange}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />
        {value && (
          <CommandList className='absolute left-0 top-full w-full max-h-60 overflow-y-auto bg-background border-1 border-border shadow-lg rounded-md z-50 text-foreground font-semibold'>
            <CommandEmpty>
              {isLoading ? 'Loading...' : 'No results found.'}
            </CommandEmpty>
            <CommandGroup heading='Suggestions'>
              {locations?.map((location) => {
                const cityStateZip = `${location?.city}, ${location?.state} ${location?.zip_code}`;

                return (
                  <CommandItem
                    key={location?.zip_code}
                    onSelect={() => {
                      setParams((prevState) => ({
                        ...prevState,
                        zipCodes: [location?.zip_code],
                        // reset from in case user paginated previously
                        from: undefined,
                      }));
                    }}>
                    {cityStateZip}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default LocationSearch;
