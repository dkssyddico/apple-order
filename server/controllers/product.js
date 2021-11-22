import multer from 'multer';
import Product from '../models/Product';

export const add = async (req, res) => {
  let { name, price, category, description, images } = req.body;
  // 이름 중복 제거
  const existence = await Product.exists({ name });
  if (existence) {
    return res.status(400).json({ success: false, message: '이미 존재하는 상품입니다!' });
  }
  price = parseInt(price);
  category = parseInt(category);
  try {
    await Product.create({ name, price, category, description, images, canBeSold: true });
    return res.status(201).json({ success: true, message: '새로운 상품이 등록되었습니다!' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error, message: '새로운 상품을 등록 실패했습니다.' });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('image');

export const saveImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: '사진 업로드에 실패했습니다' });
    }
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 'desc' });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error, message: '상품들을 불러오는데 실패했습니다.' });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Product.findByIdAndDelete(id).exec((err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: '상품을 삭제하지 못했습니다.' });
    }
    return res.status(200).json({ success: true, message: '상품을 성공적으로 삭제했습니다.' });
  });
};

export const getInfo = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findById(id);
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '상품 정보를 불러오는데 실패했습니다.' });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  let { name, price, category, description, images } = req.body;
  price = parseInt(price);
  category = parseInt(category);
  try {
    await Product.findByIdAndUpdate(id, { name, price, category, description, images });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, message: '상품 정보 업데이트에 실패했습니다.' });
  }
};
