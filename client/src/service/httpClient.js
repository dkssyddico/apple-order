import axios from 'axios';

const httpClient = axios.create({
  // baseURL: 'http://localhost:4000/api',
  baseURL: 'https://apple-order.herokuapp.com/api',
  withCredentials: true,
});

export default httpClient;
