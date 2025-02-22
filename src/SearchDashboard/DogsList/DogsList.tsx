/* Types */
import { Dog } from '../../types/Dog';

/* Components */
import DogCard from './components/DogCard';
import LoadingDogsSkeleton from './components/LoadingDogsSkeleton';

interface DogsListProps {
  dogs: Dog[];
  isError: string | null;
  isLoading: boolean;
}

const DogsList = ({ dogs, isError, isLoading }: DogsListProps) => {
  if (isLoading) {
    return <LoadingDogsSkeleton />;
  }

  if (isError) {
    return (
      <div>
        There was an error while fetching you some cute dogs. Try again later.
      </div>
    );
  }
  if (dogs?.length === 0) {
    return (
      <div className='h-[50vh]'>
        No dogs found. Try adjusting your search filters.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6 mx-auto'>
      {dogs?.map((dog: Dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogsList;
