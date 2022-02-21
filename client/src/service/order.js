import httpClient from './httpClient';

class Order {
  constructor(httpClient) {
    this.order = httpClient;
  }
  addOrder = (userId, items) => this.order.post(`/users/${userId}/orders`, items);

  getOrderByUserId = async (userId, index) => {
    return this.order.get(`/users/${userId}/orders/${index}`);
  };

  getOrderByOrderId = (orderId) => {
    return this.order.get(`/orders/${orderId}`);
  };

  getAllOrders = () => {
    return this.order.get('/orders');
  };
  changeDeliverStatus = (orderId) => {
    return this.order.post(`/orders/${orderId}/deliverStatus`);
  };
}

const orderService = new Order(httpClient);
export default orderService;
