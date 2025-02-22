import { useEffect, useState } from 'react';
import _axios, { AxiosResponse } from 'axios';

/* API */
import axios from '../../api/config';

export interface FetchBreedsResults {
  breeds: string[];
  isLoading: boolean;
  isError: string | null;
}

const useFetchBreeds = (): FetchBreedsResults => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setIsError(null);
      setIsLoading(true);

      try {
        const response: AxiosResponse = await axios.get('/dogs/breeds');

        setBreeds(response?.data);
      } catch (error) {
        if (_axios.isAxiosError(error)) {
          setIsError(
            error.response?.data?.message ||
              'There was an error while fetching breeds.'
          );
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return { breeds, isLoading, isError };
};

export default useFetchBreeds;
