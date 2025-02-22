/* Types */
import { Dog } from '../../types/Dog';

export interface FavoritesContextType {
  favorites: Dog[];
  setFavorites: React.Dispatch<React.SetStateAction<Dog[]>>;
}
