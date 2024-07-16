import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const axiosConfig: AxiosInstance = axios.create( {
  baseURL: 'http://api.weatherapi.com/v1',
  params: { key: '5d13abf92c884a7c9dd164731230812' }
} );

axios.interceptors.response.use(
  ( response: AxiosResponse ) => response,
  ( error: AxiosError ) => {
    console.log( `data layer error code ${ error.status }: ${ error.message }` );
  }
);

export default axiosConfig;
