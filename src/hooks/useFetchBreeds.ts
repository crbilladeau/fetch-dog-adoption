import { useEffect, useState } from 'react';
import axios from '../api/config';

const useFetchBreeds = () => {
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
