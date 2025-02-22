import { useEffect, useState } from 'react';
import axios from '../../api/config';

/* Types */
import { FetchMatchParams, FetchMatchResponse } from '../types/FetchMatch';

const useFetchMatch = ({
  dogIds,
  skip = true,
}: FetchMatchParams): FetchMatchResponse => {
  const [match, setMatch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      setIsError(null);
      setIsLoading(true);

      try {
        const response = await axios.post('/dogs/match', dogIds);
        const match = response?.data?.match;

        setMatch(match);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setIsError(error.message);
        } else {
          throw error;
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
