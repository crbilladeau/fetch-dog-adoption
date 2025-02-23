export const BASE_URL = ' https://frontend-take-home-service.fetch.com';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

export default axiosInstance;
