import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

const config = {
  header: {
    'Content-Type': 'multipart/form-data',
  },
};

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

export const productAPI = {
  add: (newProduct) => {
    return api.post('/products', newProduct);
  },
  saveImage: (formData) => {
    return api.post('/products/image', formData, config);
  },
  getAll: () => {
    return api.get('/products');
  },
  remove: (id) => {
    return api.delete(`/products/${id}`);
  },
};
