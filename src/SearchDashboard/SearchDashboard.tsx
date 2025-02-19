import React, { useState } from 'react';

/* Components */
import BreedFilter from './components/BreedFilter';
import DogCard from './components/DogCard';

/* Hooks */
import useFetchBreeds from '../hooks/useFetchBreeds';
import useFetchDogs from '../hooks/useFetchDogs';

/* Types */
import { Dog } from './types/Dog';

const SearchDashboard = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const { breeds, isLoading: isLoadingBreeds } = useFetchBreeds();
  const { dogs, isLoading: isDogsLoading } = useFetchDogs({
    params: { breeds: selectedBreeds },
  });

  if (isDogsLoading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (dogs?.length === 0) {
    return <div>No dogs found. Try adjusting your search filters.</div>;
  }

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
      <div className='grid grid-cols-3 gap-8 my-10 mx-auto'>
        {dogs?.map((dog: Dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
};

export default SearchDashboard;
