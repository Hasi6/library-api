import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { API_URL_V1 } from '@/utils/constants';

const http: AxiosInstance = axios.create({
  baseURL: API_URL_V1,
  timeout: 30000 * 2,
});

http.interceptors.request.use(async (config) => {
  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response);
  }
);

export default http;
