import { useState } from 'react';

/* Hooks */
import useFetchBreeds from '../hooks/useFetchBreeds';
import useFetchDogs from '../hooks/useFetchDogs';

/* Components */
import BreedFilter from './components/BreedFilter';
import PaginationControls from './components/PaginationControls';
import DogsList from './components/DogsList';
import SortDropdown from './components/SortDropdown';
import LoadingSkeleton from './components/LoadingSkeleton';

/* Types */
import { SearchParams } from '../hooks/types/SearchParams';

const SearchDashboard = () => {
  const [params, setParams] = useState<SearchParams>({
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

  const isLoading = isLoadingBreeds || isLoadingDogs;
  const isError = isErrorBreeds || isErrorDogs;

  const renderEmptyOrList = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    } else if (isError) {
      return (
        <div>
          There was an error while fetching you some cute dogs. Try again later.
        </div>
      );
    } else {
      return <DogsList dogs={dogs} />;
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='h-[50vh] w-full flex items-center justify-center'>
        <BreedFilter
          breeds={breeds}
          isLoading={isLoadingBreeds}
          selectedBreeds={params?.breeds ?? []}
          setParams={setParams}
        />
      </div>
      <div className='self-end'>
        <SortDropdown type='field' setParams={setParams} params={params} />
        <SortDropdown type='order' setParams={setParams} params={params} />
      </div>
      {renderEmptyOrList()}
      <PaginationControls setParams={setParams} next={next} prev={prev} />
    </div>
  );
};

export default SearchDashboard;
