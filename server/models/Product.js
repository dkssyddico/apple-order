import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Number, // 1이면 가정용 2이면 선물용 3이면 기타
      default: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    canBeSold: {
      type: Boolean,
      default: true,
      required: true,
    },
    orderCount: {
      type: Number,
      default: 0,
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
