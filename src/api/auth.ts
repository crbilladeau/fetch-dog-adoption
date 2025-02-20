import { AxiosResponse } from 'axios';
import axios from './config';

export const loginUser = async (
  name: string,
  email: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post('/auth/login', {
      name,
      email,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred during login');
  }
};
