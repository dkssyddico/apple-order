import Order from '../models/Order.js';
import User from '../models/User.js';

export const getAll = async (req, res) => {
  try {
    let orders = await Order.find().populate('user').sort({ createdAt: 'desc' });
    orders = orders.map((order) => {
      return {
        _id: order._id,
        items: order.items,
        createdAt: order.createdAt,
        user: {
          _id: order.user._id,
          username: order.user.username,
          email: order.user.email,
        },
        deliveryStatus: order.deliveryStatus,
      };
    });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: '모든 주문 정보를 불러오는데 실패했습니다.',
    });
  }
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;
  const { user } = req;

  try {
    let order = await Order.findById(orderId).populate('user');

    order = {
      shippingInfo: order.shippingInfo,
      _id: order._id,
      items: order.items,
      deliveryStatus: order.deliveryStatus,
      createdAt: order.createdAt,
      user: {
        username: order.user.username,
        email: order.user.email,
      },
    };

    // 주문 정보를 볼 때 admin은 모든 주문 정보를 볼 수 있다
    if (user && user.role === 0) {
      return res.status(200).json({ success: true, order });
      // 개인은 본인의 주문 내역에 있는 주문 정보만 볼 수 있다.
    } else if (user && String(user._id) === String(order.user)) {
      return res.status(200).json({ success: true, order });
    } else {
      console.log('error');
      return res.status(400).json({ success: false, message: '잘못된 접근입니다.' });
    }
  } catch (error) {
    console.log('error2', error);
    return res.status(400).json({
      success: false,
      message: '주문 정보를 불러오는데 실패했습니다.',
    });
  }
};

export const changeDeliverStatus = async (req, res) => {
  const { orderId } = req.params;
  try {
    let order = await Order.findById(orderId);
    order.deliveryStatus = !order.deliveryStatus;
    order.save((err, order) => {
      console.log(order);
      if (err) res.status(400).json({ success: false, message: '배송 상태 변경에 실패했습니다.' });
      return res.status(201).json({ success: true });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: '주문 정보를 불러오는데 실패했습니다.',
    });
  }
};
