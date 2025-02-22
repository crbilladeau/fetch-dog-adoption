import { useEffect, useState } from 'react';
import _axios from 'axios';

/* API */
import axios from '../../api/config';

/* Types */
import { Dog } from '../../types/dog.interface';

export interface DogsSearchParams {
  breeds?: string[];
  ageMax?: number;
  ageMin?: number;
  zipCodes?: string[];
  sort?: { field: string; order: string };
  size?: number;
  from?: string;
}

export interface FetchDogsResult {
  dogs: Dog[];
  isLoading: boolean;
  isError: string | null;
  next: string | null;
  prev: string | null;
}

export const DEFAULT_SORT = { field: 'breed', order: 'asc' };

const useFetchDogs = ({
  params,
}: {
  params: DogsSearchParams;
}): FetchDogsResult => {
  const [dogs, setDogs] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      setIsError(null);
      setIsLoading(true);

      try {
        const searchDogsResponse = await axios.get('/dogs/search', {
          params: {
            breeds: params?.breeds,
            ageMin: params?.ageMin,
            ageMax: params?.ageMax,
            zipCodes: params?.zipCodes,
            size: params?.size,
            from: params?.from,
            sort: `${params?.sort?.field || DEFAULT_SORT.field}:${
              params?.sort?.order || DEFAULT_SORT.order
            }`,
          },
        });

        const dogIds = searchDogsResponse?.data?.resultIds || [];
        const nextUrl = searchDogsResponse?.data?.next || null;
        const prevUrl = searchDogsResponse?.data?.prev || null;

        setNext(
          nextUrl
            ? new URLSearchParams(nextUrl.split('?')[1]).get('from')
            : null
        );
        setPrev(
          prevUrl
            ? new URLSearchParams(prevUrl.split('?')[1]).get('from')
            : null
        );

        if (dogIds.length > 0) {
          const dogsResponse = await axios.post('/dogs', dogIds);
          setDogs(dogsResponse?.data || []);
        } else {
          setDogs([]);
        }
      } catch (error) {
        if (_axios.isAxiosError(error)) {
          setIsError(
            error.response?.data?.message ||
              'There was an error while fetching dogs.'
          );
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [
    params?.breeds,
    params?.ageMin,
    params?.ageMax,
    params?.zipCodes,
    params?.sort?.field,
    params?.sort?.order,
    params?.size,
    params?.from,
  ]);

  return { dogs, isLoading, isError, next, prev };
};

export default useFetchDogs;
