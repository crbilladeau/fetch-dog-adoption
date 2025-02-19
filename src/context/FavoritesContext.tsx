import React, { createContext, useContext, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [favorites, setFavorites] = useState<string[]>([]);

  console.log({ favorites });

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within an FavoritesProvider');
  }
  return context;
};
