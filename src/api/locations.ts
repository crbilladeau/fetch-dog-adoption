import _axios, { AxiosResponse } from 'axios';

/* API */
import axios from './config';

import { Coordinates } from '../types/coordinates.interface';
export interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
}

export const getLocations = async (params: LocationSearchParams) => {
  try {
    const response: AxiosResponse = await axios.post('/locations/search', {
      city: params?.city,
      states: params?.states,
      geoBoundingBox: params?.geoBoundingBox,
      size: params?.size,
      from: params?.from,
    });

    return response;
  } catch (error) {
    if (_axios.isAxiosError(error)) {
      throw error;
    } else {
      console.error(error);
    }
  }
};
