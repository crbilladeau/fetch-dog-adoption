import { useEffect, useState } from 'react';
import axios from '../api/config';

interface FetchBreedsResponse {
  breeds: string[];
  isLoading: boolean;
  isError: boolean;
}

const useFetchBreeds = (): FetchBreedsResponse => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios.get('/dogs/breeds');

        setBreeds(response?.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return { breeds, isLoading, isError };
};

export default useFetchBreeds;
