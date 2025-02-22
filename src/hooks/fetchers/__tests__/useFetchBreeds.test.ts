import { renderHook, waitFor } from '@testing-library/react';
import axios from '../../../api/config';
import { AxiosError } from 'axios';
import useFetchBreeds from '../useFetchBreeds';

jest.mock('../../../api/config');

const mockAxios = axios as jest.Mocked<typeof axios>;

const mockBreedsResult = ['Boxer', 'Golden Retriever', 'Siberian Husky'];

describe('useFetchBreeds', () => {
  it('should return an array of breeds', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockBreedsResult });
    const { result } = renderHook(() => useFetchBreeds());

    await waitFor(() =>
      expect(result.current.breeds).toEqual(mockBreedsResult)
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(null);
    expect(mockAxios.get).toHaveBeenCalledWith('/dogs/breeds');
  });

  it('should return an error if API call fails', async () => {
    const mockError = new AxiosError('Ope!', '404');
    mockAxios.get.mockRejectedValueOnce(mockError);
    const { result } = renderHook(() => useFetchBreeds());

    await waitFor(() =>
      expect(result.current.isError).toBe(
        'There was an error while fetching breeds.'
      )
    );
  });

  it('should return loading while API call is in progress', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockBreedsResult });
    const { result } = renderHook(() => useFetchBreeds());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
});
