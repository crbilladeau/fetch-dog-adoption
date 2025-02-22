import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';

const mockDog = {
  id: '1',
  img: 'https://cooldog.com/mako.jpg',
  name: 'Mako',
  breed: 'Boxer',
  age: 3,
  zip_code: '12345',
};

const TestComponent = () => {
  const { favorites, addToFavorites } = useFavorites();

  return (
    <div>
      <div>{favorites.length ? JSON.stringify(favorites) : 'No favorites'}</div>
      <button onClick={() => addToFavorites(mockDog)}>Add Favorite</button>
    </div>
  );
};

describe('FavoritesContext', () => {
  afterEach(() => jest.clearAllMocks());
  const setup = () => {
    return render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
  };

  it('should render the children component', () => {
    const { getByText, getByRole } = setup();

    expect(getByRole('button', { name: 'Add Favorite' })).toBeInTheDocument();
    expect(getByText('No favorites')).toBeInTheDocument();
  });

  it('should call addToFavorites with the new favorite to add and remove from favorites', async () => {
    const { getByText, getByRole } = setup();

    expect(getByText('No favorites')).toBeInTheDocument();

    await userEvent.click(getByRole('button', { name: 'Add Favorite' }));

    await waitFor(() =>
      expect(getByText(JSON.stringify([mockDog]))).toBeInTheDocument()
    );

    await userEvent.click(getByRole('button', { name: 'Add Favorite' }));

    await waitFor(() => expect(getByText('No favorites')).toBeInTheDocument());
  });

  it('returns an error if context is not provided', () => {
    const noProvider = () => render(<TestComponent />);

    expect(noProvider).toThrow(
      'useFavorites must be used within a FavoritesProvider'
    );
  });
});
