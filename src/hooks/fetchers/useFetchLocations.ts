import { useEffect, useState } from 'react';

/* API */
import { getZipcodes } from '../../api/zipcodes';
import { getLocations } from '../../api/locations';

/* Types */
import { Location } from '../../types/Location';
import {
  FetchLocationsParams,
  FetchLocationsResponse,
} from '../types/FetchLocations';
import { LocationSearchParams } from '../../api/types/LocationSearchParams';

type ParsedQuery =
  | { type: 'zipcode'; params: string[] }
  | { type: 'location'; params: LocationSearchParams };

const useFetchLocations = ({
  query,
  skip,
}: FetchLocationsParams): FetchLocationsResponse => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const parseQuery = (query: string): ParsedQuery => {
    // test for if the query is a zip code
    const zipCodeRegex = /^\d{5}$/;
    // test for if the query is a state [e.g. MN]
    const stateRegex = /^[A-Za-z]{2}$/;

    if (zipCodeRegex.test(query)) {
      return { type: 'zipcode', params: [query] };
    } else if (stateRegex.test(query)) {
      return {
        type: 'location',
        params: { states: [query.toUpperCase()] },
      };
    } else {
      const city = query?.split(',')[0];
      const state = query?.split(',')[1]?.trim().toUpperCase();

      return {
        type: 'location',
        // states can be optional
        params: { city, ...(state && { states: [state] }) },
      };
    }
  };

  const fetchLocations = async () => {
    setIsLoading(true);
    setIsError(false);
    setLocations([]);

    try {
      if (!query) return;
      const { params, type } = parseQuery(query);

      const isZipcodeRequest = type === 'zipcode';
      const isCityOrStatesRequest = type === 'location';

      if (isZipcodeRequest) {
        const response = await getZipcodes(params);
        if (response?.status === 200) {
          setLocations(response?.data);
        }
      } else if (isCityOrStatesRequest) {
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
    if (!query) return;

    fetchLocations();
  }, [query, skip]);

  return { locations, isLoading, isError };
};

export default useFetchLocations;
