import httpClient from './httpClient';

class Order {
  constructor(httpClient) {
    this.order = httpClient;
  }

  addOrder = (userId, items) => this.order.post(`/users/${userId}/orders`, items);

  getOrderByUserId = async ({ userId, index, accessToken }) => {
    return this.order.get(`/users/${userId}/orders/${index}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  getOrderByOrderId = ({ orderId, accessToken }) => {
    return this.order.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  getAllOrders = (accessToken) => {
    return this.order.get('/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  changeDeliverStatus = (orderId) => {
    return this.order.post(`/orders/${orderId}/deliverStatus`);
  };
}

const orderService = new Order(httpClient);
export default orderService;
