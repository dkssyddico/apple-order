import httpClient from './httpClient';

class Cart {
  constructor(httpClient) {
    this.cart = httpClient;
  }
  getInfo = async (userId) => {
    return this.cart.get(`/users/${userId}/cart`);
  };

  addItem = async (userData) => {
    let { userId, productId, quantity } = userData;
    return this.cart.post(`/users/${userId}/cart`, { productId, quantity });
  };

  changQty = async (userData) => {
    let { userId, productId, quantity } = userData;
    return this.cart.put(`/users/${userId}/cart`, { productId, quantity });
  };

  refresh = async (userId) => {
    return this.cart.delete(`/users/${userId}/cart`);
  };

  deleteItem = async (userData) => {
    let { userId, productId } = userData;
    return this.cart.delete(`/users/${userId}/cart/${productId}`);
  };
}

const cartService = new Cart(httpClient);
export default cartService;
