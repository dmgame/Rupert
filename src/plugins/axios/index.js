import axios from 'axios';
import initInterceptors from './interceptors';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

initInterceptors(instance);

export default instance;
