import _axios, { AxiosResponse } from 'axios';

/* API */
import axios from './config';

export const loginUser = async (name: string, email: string) => {
  try {
    const response: AxiosResponse = await axios.post('/auth/login', {
      name,
      email,
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

export const logoutUser = async () => {
  try {
    const response = await axios.post('/auth/logout');

    return response;
  } catch (error) {
    if (_axios.isAxiosError(error)) {
      throw error;
    } else {
      console.error(error);
    }
  }
};
