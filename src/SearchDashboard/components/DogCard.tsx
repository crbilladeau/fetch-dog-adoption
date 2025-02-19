import React from 'react';

/* Icons */
import { Heart } from 'lucide-react';

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
import { useFavorites } from '../../context/FavoritesContext';

/* Types */
import { Dog } from '../types/Dog';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const { setFavorites } = useFavorites();

  const addToFavorites = (id: string): void => {
    setFavorites((prevState: string[]) => [...prevState, id]);
  };

  return (
    <Card className='flex flex-col justify-between rounded overflow-hidden shadow-2xl bg-green-400/10 w-80 h-full hover:scale-102 transition-transform duration-300'>
      <CardContent className='flex flex-col p-0 relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-10' />
        <div
          className='absolute top-0 right-0 p-1 m-2 cursor-pointer'
          onClick={() => addToFavorites(dog.id)}>
          <Heart className='h-6 w-6 shrink-0' />
        </div>
        <img
          className='w-full h-58 object-cover'
          src={dog.img}
          alt={`A ${dog.breed} named ${dog.name}`}
        />
      </CardContent>
      <CardHeader className='flex flex-col'>
        <div className='flex flex-row items-center justify-between w-full'>
          <CardTitle className='mr-4'>{dog.name}</CardTitle>
          <Badge className='rounded-full bg-green-600 text-white hover:bg-green-600'>
            AVAILABLE
          </Badge>
        </div>
        <CardDescription>
          <p>
            {dog.breed}, {dog.age} {dog.age > 1 ? 'years' : 'year'} old
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
