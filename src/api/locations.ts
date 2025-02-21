import axios from './config';

import { LocationSearchParams } from './types/LocationSearchParams';

export const getLocations = async (params: LocationSearchParams) => {
  try {
    const response = await axios.post('/locations/search', {
      city: params?.city,
      states: params?.states,
      geoBoundingBox: params?.geoBoundingBox,
      size: params?.size,
      from: params?.from,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
