import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

/* Types */
import { Dog } from '../types/dog.interface';

export interface FavoritesContextType {
  favorites: Dog[];
  addToFavorites: (dog: Dog) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export default FavoritesContext;

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Dog[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addToFavorites = (dog: Dog): void => {
    const alreadyFavorited = favorites.some((f) => f.id === dog.id);

    // alert
    toast.success(
      `${dog.name}, ${dog.breed} ${
        alreadyFavorited ? 'removed from' : 'added to'
      } favorites`
    );

    setFavorites((prevState) => {
      let newFavorites;
      if (alreadyFavorited) {
        newFavorites = prevState.filter((f) => f.id !== dog.id);
      } else {
        newFavorites = [...prevState, dog];
      }
      // save to local storage to persist da doggies
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
