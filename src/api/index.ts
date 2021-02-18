import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3002',
});

api.interceptors.response.use(undefined, (error) => {
  throw error.response || error;
});
