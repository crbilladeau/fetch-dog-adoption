import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritesContext from '../../../../../context/FavoritesContext';
import { MemoryRouter } from 'react-router';

import DogCard from '../DogCard';

jest.mock('lucide-react', () => ({
  Heart: 'HeartIcon',
  PawPrint: 'PawPrintIcon',
}));

const mockDog = {
  id: '1',
  img: 'https://cooldog.com/mako.jpg',
  name: 'Mako',
  breed: 'Boxer',
  age: 3,
  zip_code: '12345',
};

describe('DogCard', () => {
  const addToFavorites = jest.fn();
  const setup = ({ dog = mockDog } = {}) => {
    const utils = render(
      <MemoryRouter>
        <FavoritesContext.Provider value={{ favorites: [], addToFavorites }}>
          <DogCard dog={dog} />
        </FavoritesContext.Provider>
      </MemoryRouter>
    );

    return { ...utils, addToFavorites };
  };

  it('should render the dog card', () => {
    const { getByText, getByAltText } = setup();

    expect(getByText('Mako')).toBeInTheDocument();
    expect(getByText('Boxer, 3 years old')).toBeInTheDocument();
    expect(getByText('12345')).toBeInTheDocument();
    expect(getByAltText('A Boxer named Mako')).toHaveAttribute(
      'src',
      'https://cooldog.com/mako.jpg'
    );
  });

  it('renders the age correctly if less than 1', () => {
    const { getByText } = setup({ dog: { ...mockDog, age: 0 } });

    expect(getByText('Boxer, < 1 year old')).toBeInTheDocument();
  });

  it('renders the age correctly if equal to 1', () => {
    const { getByText } = setup({ dog: { ...mockDog, age: 1 } });

    expect(getByText('Boxer, 1 year old')).toBeInTheDocument();
  });

  it('should call addToFavorites with the dog when clicked', async () => {
    const { getByLabelText, addToFavorites } = setup();

    await userEvent.click(getByLabelText('favorite dog'));

    await waitFor(() => expect(addToFavorites).toHaveBeenCalledWith(mockDog));

    await userEvent.click(getByLabelText('favorite dog'));

    // called again to remove from favorites
    await waitFor(() => expect(addToFavorites).toHaveBeenCalledWith(mockDog));
  });
});
