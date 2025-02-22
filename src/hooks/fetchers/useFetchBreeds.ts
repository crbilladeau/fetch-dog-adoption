import { useEffect, useState } from 'react';
import axios from '../../api/config';

/* Types */
import { FetchBreedsResponse } from '../types/FetchBreeds';

const useFetchBreeds = (): FetchBreedsResponse => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setIsError(null);
      setIsLoading(true);

      try {
        const response = await axios.get('/dogs/breeds');

        setBreeds(response?.data);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setIsError(error.message);
        } else {
          throw new Error('There was an error while fetching breeds.');
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
