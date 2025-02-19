import { useEffect, useState } from 'react';
import axios from '../api/config';

interface SearchParams {
  breeds?: string[];
  minAge?: number;
  maxAge?: number;
  zipCodes?: string[];
  sort?: { field: string; order: string };
  size?: number;
  from?: number;
}

const useFetchDogs = ({ params }: { params: SearchParams }) => {
  const [dogs, setDogs] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchDogs = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const searchDogsResponse = await axios.get('/dogs/search', {
          params: {
            breeds: params?.breeds,
            minAge: params?.minAge,
            maxAge: params?.maxAge,
            zipCodes: params?.zipCodes,
            size: params?.size,
            from: params?.from,
            sort: `${params?.sort?.field ?? 'breed'}:${
              params?.sort?.order ?? 'asc'
            }`,
          },
        });

        const dogIds = searchDogsResponse?.data?.resultIds || [];

        if (dogIds.length > 0) {
          const dogsResponse = await axios.post('/dogs', dogIds);

          setDogs(dogsResponse?.data || []);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [
    params?.breeds,
    params?.minAge,
    params?.maxAge,
    params?.zipCodes,
    params?.sort?.field,
    params?.sort?.order,
    params?.size,
    params?.from,
  ]);

  return { dogs, isLoading, isError };
};

export default useFetchDogs;
