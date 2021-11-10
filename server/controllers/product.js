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
    await Product.create({ name, price, category, description, images });
    return res.status(201).json({ success: true, message: '새로운 상품이 등록되었습니다!' });
  } catch (error) {
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
    console.log(res.req.file);
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
};
