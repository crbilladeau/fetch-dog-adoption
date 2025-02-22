import { useEffect, useState } from 'react';
import _axios, { AxiosResponse } from 'axios';

/* API */
import axios from '../../api/config';

export interface FetchMatchParams {
  dogIds: string[];
  skip: boolean;
}

export interface FetchMatchResult {
  match: string;
  isLoading: boolean;
  isError: string | null;
}

const useFetchMatch = ({
  dogIds,
  skip = true,
}: FetchMatchParams): FetchMatchResult => {
  const [match, setMatch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      setIsError(null);
      setIsLoading(true);

      try {
        const response: AxiosResponse = await axios.post('/dogs/match', dogIds);
        const match = response?.data?.match;

        setMatch(match);
      } catch (error) {
        if (_axios.isAxiosError(error)) {
          setIsError(
            error.response?.data?.message ||
              'There was an error while fetching a match.'
          );
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (skip) {
      return;
    }

    fetchMatch();
  }, [dogIds, skip]);

  return { match, isLoading, isError };
};

export default useFetchMatch;
