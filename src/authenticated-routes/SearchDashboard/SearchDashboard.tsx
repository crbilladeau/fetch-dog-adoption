import { useState } from 'react';

/* Hooks */
import useFetchBreeds from '../../hooks/fetchers/useFetchBreeds';
import useFetchDogs from '../../hooks/fetchers/useFetchDogs';

/* Components */
import LocationSearch from './components/LocationSearch';
import BreedFilter from './components/BreedFilter';
import PaginationControls from './components/PaginationControls';
import DogsList from './DogsList';
import SortDropdown from './components/SortDropdown';
import FavoritesFlyout from './components/FavoritesFlyout';

/* Types */
import { DogsSearchParams } from '../../hooks/types/FetchDogs';

const SearchDashboard = () => {
  const [params, setParams] = useState<DogsSearchParams>({
    breeds: [],
    minAge: undefined,
    maxAge: undefined,
    zipCodes: undefined,
    size: 25,
    from: undefined,
    sort: { field: 'breed', order: 'asc' },
  });

  const {
    breeds,
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
  } = useFetchBreeds();
  const {
    dogs,
    isLoading: isLoadingDogs,
    isError: isErrorDogs,
    next,
    prev,
  } = useFetchDogs({
    params,
  });

  const disablePagination =
    isLoadingBreeds || isLoadingDogs || dogs.length < 25;

  return (
    <div className='flex flex-col justify-center items-center px-4 relative mx-auto'>
      <FavoritesFlyout />
      <div className='h-[50vh] w-full flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-extrabold mb-3 text-center text-popover-foreground'>
          Every dog deserves a home.
        </h1>
        <h2 className='text-2xl font-normal mb-14 text-center'>
          The perfect pup is just one search away.
        </h2>
        <div className='w-full flex flex-col sm:flex-row items-center justify-center'>
          <LocationSearch setParams={setParams} />
          <BreedFilter
            breeds={breeds}
            isLoading={isLoadingBreeds}
            selectedBreeds={params?.breeds ?? []}
            setParams={setParams}
          />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row items-center self-end'>
        <p className='font-semibold'>Sort filters:</p>
        <SortDropdown type='field' setParams={setParams} params={params} />
        <SortDropdown type='order' setParams={setParams} params={params} />
      </div>
      <DogsList
        dogs={dogs}
        isError={isErrorBreeds || isErrorDogs}
        isLoading={isLoadingBreeds || isLoadingDogs}
      />
      <PaginationControls
        setParams={setParams}
        next={next}
        prev={prev}
        disabled={disablePagination}
      />
    </div>
  );
};

export default SearchDashboard;
