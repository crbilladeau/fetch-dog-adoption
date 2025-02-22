import axios from './config';

export const getZipcodes = async (params: string[]) => {
  try {
    const response = await axios.post('/locations', params);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('There was an error while fetching zipcodes.');
    }
    throw new Error('An unknown error occurred');
  }
};
