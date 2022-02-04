import axios from 'axios';

const httpClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default httpClient;
