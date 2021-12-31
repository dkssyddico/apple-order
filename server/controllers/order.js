import Order from '../models/Order';

export const getAll = async (req, res) => {
  try {
    let orders = await Order.find().populate('user').sort({ createdAt: 'desc' });
    console.log(orders);
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '모든 주문 정보를 불러오는데 실패했습니다.' });
  }
};
