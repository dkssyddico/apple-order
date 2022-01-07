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
    return api.post('/users/login', userInfo);
  },
  logout: () => {
    return api.get('/users/logout');
  },
  getAll: () => {
    return api.get('/users');
  },
  remove: (userId) => {
    return api.delete(`/users/${userId}`);
  },
  getCartInfo: (userId) => {
    return api.get(`/users/${userId}/cart`);
  },
  addItemToCart: (userId, product) => {
    return api.post(`/users/${userId}/cart`, product);
  },
  changQtyInCart: (userId, product) => {
    return api.put(`/users/${userId}/cart`, product);
  },
  refreshCart: (userId) => {
    return api.delete(`/users/${userId}/cart`);
  },
  deleteItem: (userId, productId) => {
    return api.delete(`/users/${userId}/cart/${productId}`);
  },
  addOrder: (userId, items) => {
    return api.post(`/users/${userId}/orders`, items);
  },
  getOrder: (userId) => {
    return api.get(`/users/${userId}/orders`);
  },
  getProfile: (userId) => {
    return api.get(`/users/${userId}`);
  },
  changeUsername: (userId, usernameObj) => {
    return api.put(`/users/${userId}/username`, usernameObj);
  },
  changePassword: (userId, passwordObj) => {
    return api.put(`/users/${userId}/password`, passwordObj);
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
  getInfo: (id) => {
    return api.get(`/products/${id}`);
  },
  update: (productId, productUpdatedObj) => {
    return api.put(`/products/${productId}`, productUpdatedObj);
  },
};

export const orderAPI = {
  getAll: () => {
    return api.get('/orders');
  },
  getOrder: (orderId) => {
    return api.get(`/orders/${orderId}`);
  },
};
