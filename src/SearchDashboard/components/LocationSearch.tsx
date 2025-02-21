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
import useFetchLocations from '../../hooks/useFetchLocations';

/* Types */
import { DogsSearchParams } from '../../hooks/types/FetchDogs';

interface LocationSearchProps {
  setParams: React.Dispatch<React.SetStateAction<DogsSearchParams>>;
}

const LocationSearch = ({ setParams }: LocationSearchProps) => {
  const [value, setValue] = useState<string>('');

  const { locations } = useFetchLocations({
    query: value,
    skip: !value,
  });

  console.log({ locations });

  const handleValueChange = (value: string) => {
    if (!value) {
      setParams((prevState) => ({ ...prevState, zipCodes: [] }));
    }
    setValue(value);
  };

  return (
    <div className='w-full max-w-[500px] mr-3 relative'>
      <Command className='border-2 border-popover-foreground focus-within:bg-accent text-foreground font-semibold'>
        <CommandInput
          placeholder='Enter city, state, or zipcode'
          onValueChange={handleValueChange}
        />
        {value && (
          <CommandList className='absolute left-0 top-full w-full max-h-60 overflow-y-auto border-1 border-border shadow-lg rounded-md z-50 text-foreground font-semibold'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              {locations?.slice(0, 5).map((location) => {
                // TODO: need to debug when the search result doesn't match the query
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
