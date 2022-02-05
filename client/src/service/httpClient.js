import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

export default httpClient;
