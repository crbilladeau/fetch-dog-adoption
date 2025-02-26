/* Icons */
import { Heart, PawPrint } from 'lucide-react';

/* UI */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/* Hooks */
import { useFavorites } from '../../../../context/FavoritesContext';

/* Types */
import { Dog } from '../../../../types/dog.interface';

interface DogCardProps {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => {
  const { favorites, addToFavorites } = useFavorites();

  const formatAge = (age: number) => {
    if (age < 1) {
      return '< 1 year old';
    } else if (age === 1) {
      return '1 year old';
    } else {
      return `${age} years old`;
    }
  };

  const isDogAFave = favorites.some((f) => f.id === dog.id);

  return (
    <Card className='flex flex-col justify-between rounded overflow-hidden shadow-lg w-75 h-full max-h-100 hover:scale-102 transition-transform duration-300'>
      <CardContent className='flex flex-col p-0 relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-10' />
        <Badge className='absolute top-0 right-0  bg-primary hover:bg-primary m-2'>
          <PawPrint className='h-4 w-4 shrink-0 mr-1' />
          AVAILABLE
        </Badge>
        <img
          className='w-full h-58 object-cover'
          src={dog.img}
          alt={`A ${dog.breed} named ${dog.name}`}
        />
      </CardContent>
      <CardHeader className='flex flex-col'>
        <div className='flex flex-row items-center justify-between w-full'>
          <CardTitle className='mr-4 text-lg'>
            <h4>{dog.name}</h4>
          </CardTitle>
          <button
            key={crypto.randomUUID()}
            className='cursor-pointer focus:animate-pop'
            onClick={() => addToFavorites(dog)}>
            <Heart
              aria-role='button'
              aria-label='favorite dog'
              className={
                isDogAFave
                  ? 'fill-destructive text-destructive h-6 w-6'
                  : 'text-destructive h-6 w-6'
              }
            />
          </button>
        </div>
        <CardDescription>
          <p>
            {dog.breed}, {formatAge(dog.age)}
          </p>
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex flex-col items-end w-full'>
        <p className='text-sm font-semibold'>
          Zipcode: <span className='font-normal'>{dog.zip_code}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default DogCard;
