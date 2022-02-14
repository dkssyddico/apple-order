import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: Array,
      default: [],
      required: true,
    },
    shippingInfo: {
      fullName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
    },
    deliveryStatus: {
      type: Boolean,
      required: true,
      default: 0, // 0이면 미배송 1이면 배송완료
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
