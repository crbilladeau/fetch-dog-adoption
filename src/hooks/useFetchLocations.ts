import { useEffect, useState } from 'react';

/* API */
import { getZipcodes } from '../api/zipcodes';
import { getLocations } from '../api/locations';

/* Types */
import { Location } from '../types/Location';
import {
  FetchLocationsParams,
  FetchLocationsResponse,
} from './types/FetchLocations';

const useFetchLocations = ({
  query,
  skip,
}: FetchLocationsParams): FetchLocationsResponse => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const parseQuery = (query: string) => {
    const zipCodeRegex = /^\d{5}$/;
    const stateRegex = /^[A-Za-z]{2}$/;

    if (zipCodeRegex.test(query)) {
      return [query];
    } else if (stateRegex.test(query)) {
      return {
        states: [query.toUpperCase()],
      };
    } else {
      const city = query?.split(',')[0];
      const state = query?.split(',')[1]?.trim().toUpperCase();

      return {
        city,
        ...(state && { states: [state] }),
      };
    }
  };

  const fetchLocations = async () => {
    setIsLoading(true);
    setIsError(false);
    setLocations([]);

    try {
      if (!query) return;
      const params = parseQuery(query);

      const isZipcodeRequest = Array.isArray(params);

      if (isZipcodeRequest) {
        const response = await getZipcodes(params);
        if (response?.status === 200) {
          setLocations(response?.data);
        }
      } else {
        const response = await getLocations(params);
        if (response?.status === 200) {
          setLocations(response?.data?.results);
        }
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(fetchLocations, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query, skip]);

  return { locations, isLoading, isError };
};

export default useFetchLocations;
