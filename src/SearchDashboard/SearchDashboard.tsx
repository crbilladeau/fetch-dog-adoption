import { useState } from 'react';

/* Hooks */
import useFetchBreeds from '../hooks/useFetchBreeds';
import useFetchDogs from '../hooks/useFetchDogs';

/* Components */
import BreedFilter from './components/BreedFilter';
import PaginationControls from './components/PaginationControls';
import DogsList from './components/DogsList';
import SortDropdown from './components/SortDropdown';

/* UI */

const SearchDashboard = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  // TODO: add setParams instead of cursor

  const { breeds, isLoading: isLoadingBreeds } = useFetchBreeds();
  const { dogs, next, prev } = useFetchDogs({
    params: { breeds: selectedBreeds, from: cursor ?? undefined },
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='h-[50vh] w-full flex items-center justify-center'>
        <BreedFilter
          breeds={breeds}
          isLoading={isLoadingBreeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
        />
      </div>
      <div className='self-end'>
        <SortDropdown type='by' />
        <SortDropdown type='order' />
      </div>
      <DogsList dogs={dogs} />
      <PaginationControls setCursor={setCursor} next={next} prev={prev} />
    </div>
  );
};

export default SearchDashboard;
