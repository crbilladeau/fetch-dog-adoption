import { useState } from 'react';

/* UI */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

/* Icons */
import { Heart, PawPrint } from 'lucide-react';

/* Context */
import { useFavorites } from '../../../context/FavoritesContext';

/* Components */
import DogCard from '../DogsList/components/DogCard';

/* Hooks */
import useFetchMatch from '../../../hooks/fetchers/useFetchMatch';

interface FavoritesContentProps {
  isErrorMatch: string | null;
  match: string;
}

const FavoritesContent = ({ isErrorMatch, match }: FavoritesContentProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { favorites } = useFavorites();

  const perfectPup = favorites.find((dog) => dog.id === match);

  return (
    <div className='flex flex-col items-center gap-4'>
      {isErrorMatch ? (
        <div>
          Sorry, there was trouble finding you a match. Please try again later.
        </div>
      ) : (
        perfectPup && (
          <div className='flex flex-col items-center mb-10'>
            <h2 className='text-2xl font-medium'>Congrats! 🎉</h2>
            <h3 className='text-lg font-regular mb-4'>
              Time to bring {perfectPup.name} home!
            </h3>
            <DogCard dog={perfectPup} />
          </div>
        )
      )}
      <h3 className='text-popover-foreground text-2xl self-start ml-6 font-bold'>
        My Favorites
      </h3>
      {favorites.slice(0, 3).map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
      {showMore &&
        favorites.slice(3).map((dog) => <DogCard key={dog.id} dog={dog} />)}
      <Button
        className='my-4 cursor-pointer'
        onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show less' : 'Show more'}
      </Button>
    </div>
  );
};

const FavoritesFlyout = () => {
  const [dogIds, setDogIds] = useState<string[]>([]);

  const { favorites } = useFavorites();

  const { match, isError: isErrorMatch } = useFetchMatch({
    dogIds,
    skip: dogIds.length === 0,
  });

  const generateMatch = () => {
    setDogIds(favorites.map((dog) => dog.id));
  };

  return (
    <div className='scroll-auto'>
      <Sheet>
        <SheetTrigger className='p-4 cursor-pointer absolute top-0 right-0 z-50 bg-background m-4 px-4 flex items-center'>
          <span className='text-popover-foreground font-semibold text-lg'>
            Favorites
          </span>
          <Heart className='h-6 w-6 shrink-0 ml-2 text-destructive fill-destructive' />
        </SheetTrigger>
        <SheetContent className='py-4 px-2 overflow-y-auto'>
          <SheetHeader>
            <SheetTitle className='text-popover-foreground text-3xl font-bold'>
              Favorite Dogs
            </SheetTitle>
            <SheetDescription className='text-md'>
              Check out a list of your favorite pups. Use our match feature to
              find your perfect match!
            </SheetDescription>
          </SheetHeader>
          <Button
            className='w-full max-w-50 self-center mb-10 cursor-pointer'
            onClick={generateMatch}>
            Generate Match
            <PawPrint className='h-4 w-4 shrink-0' />
          </Button>
          <FavoritesContent isErrorMatch={isErrorMatch} match={match} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FavoritesFlyout;
