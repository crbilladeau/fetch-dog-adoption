import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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

const FavoritesContent = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [dogIds, setDogIds] = useState<string[]>([]);

  const { favorites } = useFavorites();

  const { match, isError: isErrorMatch } = useFetchMatch({
    dogIds,
    skip: dogIds.length === 0,
  });

  const generateMatch = () => {
    setDogIds(favorites.map((dog) => dog.id));
  };

  const perfectPup = favorites.find((dog) => dog.id === match);
  const hasFavorites = favorites.length > 0;
  const displayMoreDogs = favorites.length > 3;

  if (!hasFavorites) {
    return (
      <h3 className='px-4 text-center font-medium my-10'>
        You don&apos;t have any favorite dogs yet. Find some pups to add!
      </h3>
    );
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4 mt-6'>
        {isErrorMatch ? (
          <div>
            Sorry, there was trouble finding you a match. Please try again
            later.
          </div>
        ) : (
          perfectPup && (
            <div
              className='flex flex-col items-center mb-10 relative w-full animate-fade'
              key={crypto.randomUUID()}>
              <div className='w-100 h-full absolute top-[-80px] left-[-25px] z-50'>
                <DotLottieReact
                  className='max-w-full max-h-full'
                  src='https://lottie.host/73978144-b170-492e-a7ff-cf8f36bc4e26/h0JWmMpajh.lottie'
                  loop
                  autoplay
                />
              </div>
              <h2 className='text-2xl font-medium'>It&apos;s a match! 🎉</h2>
              <h3 className='text-lg font-regular mb-4'>
                Time to bring {perfectPup.name} home!
              </h3>
              <div className='bg-primary rounded p-4'>
                <DogCard dog={perfectPup} />
              </div>
            </div>
          )
        )}
        <Button
          className='w-full max-w-50 self-center mb-10 cursor-pointer'
          onClick={generateMatch}>
          Generate Match
          <PawPrint className='h-4 w-4 shrink-0' />
        </Button>
        <h3 className='text-2xl self-start ml-8 font-bold'>My Favorites</h3>
        {favorites.slice(0, 3).map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
        {showMore &&
          favorites.slice(3).map((dog) => <DogCard key={dog.id} dog={dog} />)}
        {displayMoreDogs && (
          <Button
            className='my-4 cursor-pointer'
            onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>
    </>
  );
};

const FavoritesFlyout = () => {
  return (
    <div className='scroll-auto'>
      <Sheet>
        <SheetTrigger className='p-4 cursor-pointer absolute top-0 right-0 z-50 m-4 px-4 flex items-center'>
          <Button
            className='cursor-pointer font-semibold text-md'
            aria-label='View favorited dogs'>
            Favorites
            <Heart className='h-6 w-6 shrink-0 text-destructive fill-destructive' />
          </Button>
        </SheetTrigger>
        <SheetContent className='py-4 px-2 overflow-y-auto'>
          <SheetHeader>
            <SheetTitle className='text-3xl font-bold'>
              Favorite Dogs
            </SheetTitle>
            <SheetDescription className='text-md'>
              Check out a list of your favorite pups. Use our match feature to
              find your perfect match!
            </SheetDescription>
          </SheetHeader>
          <FavoritesContent />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FavoritesFlyout;
