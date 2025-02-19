/* Types */
import { Dog } from '../types/Dog';

/* Components */
import DogCard from './DogCard';

interface DogsListProps {
  dogs: Dog[];
}

const DogsList = ({ dogs }: DogsListProps) => {
  if (dogs?.length === 0) {
    return (
      <div className='h-[50vh]'>
        No dogs found. Try adjusting your search filters.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 gap-8 my-6 mx-auto'>
      {dogs?.map((dog: Dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogsList;
