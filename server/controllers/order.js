import Order from '../models/Order';

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
      };
    });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '모든 주문 정보를 불러오는데 실패했습니다.' });
  }
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;
  const { user } = req;

  try {
    let order = await Order.findById(orderId);
    // 주문 정보를 볼 때 admin은 모든 주문 정보를 볼 수 있다
    if (user && user.role === 0) {
      return res.status(200).json({ success: true, order });
      // 개인은 본인의 주문 내역에 있는 주문 정보만 볼 수 있다.
    } else if (user && String(user._id) === String(order.user)) {
      return res.status(200).json({ success: true, order });
    } else {
      return res.status(400).json({ success: false, message: '잘못된 접근입니다.' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '주문 정보를 불러오는데 실패했습니다.' });
  }
};
