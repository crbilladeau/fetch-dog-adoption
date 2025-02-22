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
      throw new Error('There was an error while logging you in.');
    }
    throw new Error('An unknown error occurred during login');
  }
};
