import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

export const userAPI = {
  join: (newUserObj) => {
    return api.post('/users/join', newUserObj);
  },
  login: (userInfo) => {
    console.log(userInfo);
    return api.post('/users/login', userInfo);
  },
  logout: () => {
    return api.get('/users/logout');
  },
};
