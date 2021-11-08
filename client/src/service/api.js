import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const userAPI = {
  join: (newUserObj) => {
    return api.post('/users/join', newUserObj);
  },
};
