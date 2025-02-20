import { useEffect, useState } from 'react';
import axios from '../api/config';

/* Types */
import { FetchDogsResponse, SearchParams } from './types/SearchParams';

const useFetchDogs = ({
  params,
}: {
  params: SearchParams;
}): FetchDogsResponse => {
  const [dogs, setDogs] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<Error | null>(null);
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
            minAge: params?.minAge,
            maxAge: params?.maxAge,
            zipCodes: params?.zipCodes,
            size: params?.size,
            from: params?.from,
            sort: `${params?.sort?.field || 'breed'}:${
              params?.sort?.order || 'asc'
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
        console.error(error);
        if (error instanceof Error) {
          setIsError(error);
        } else {
          setIsError(new Error('An unknown error occurred'));
        }
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

  return { dogs, isLoading, isError, next, prev };
};

export default useFetchDogs;
