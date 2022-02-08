import httpClient from './httpClient';

class Order {
  constructor(httpClient) {
    this.order = httpClient;
  }
  addOrder = (userId, items) => this.order.post(`/users/${userId}/orders`, items);

  getOrderByUserId = async (userId) => {
    return this.order.get(`/users/${userId}/orders`);
  };

  getOrderByOrderId = (orderId) => {
    return this.order.get(`/orders/${orderId}`);
  };

  getAllOrders = () => {
    return this.order.get('/orders');
  };
}

const orderService = new Order(httpClient);
export default orderService;
