import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
dotenv.config();

export const join = async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  // 비밀번호와 비밀번호 확인이 같은지 확인
  if (passwordConfirmation !== password) {
    return res
      .status(400)
      .json({ success: false, message: '비밀번호가 같지 않습니다.' });
  }
  // 이미 있는 username, email인지 확인
  const existence = await User.exists({ $or: [{ username }, { email }] });
  if (existence) {
    return res.status(400).json({
      success: false,
      message: '이미 존재하는 유저네임/이메일입니다.',
    });
  }
  try {
    await User.create({ username, email, password });
    return res
      .status(201)
      .json({ success: true, message: '회원가입에 성공했습니다.' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '회원가입에 문제가 발생했습니다.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // 유저가 있는지 이메일로 확인
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: '존재하지 않는 유저입니다. 회원가입을 진행해주세요.',
    });
  }

  const passwordComparison = await bcrypt.compare(password, user.password);
  if (!passwordComparison) {
    return res.status(400).json({
      success: false,
      message: '잘못된 비밀번호입니다.',
    });
  }

  // 다 통과했다면 토큰 생성
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return res
    .cookie('r_token', refreshToken, {
      // httpOnly: true,
      // sameSite: 'none',
    })
    .status(200)
    .json({
      success: true,
      _id: user._id,
      username: user.username,
      isAdmin: user.role === 0 ? true : false,
      accessToken: accessToken,
    });
};

export const logout = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    await User.findByIdAndUpdate(userId, { token: '' });
    res.clearCookie('r_token');
    return res
      .status(200)
      .json({ success: true, message: '로그아웃에 성공했습니다.' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error, message: '로그아웃에 실패했습니다.' });
  }
};

export const getAll = async (req, res) => {
  try {
    let users = await User.find().sort({ createAt: 'desc' });
    // 보안을 위해 비밀번호 제거
    users = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        ordersCount: user.orders.length,
      };
    });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: '모든 유저 정보를 불러오는데 실패했습니다.',
    });
  }
};

export const removeUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id).exec((err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: '유저를 삭제하지 못했습니다.' });
    }
    return res
      .status(200)
      .json({ success: true, message: '유저를 성공적으로 삭제했습니다.' });
  });
};

export const getCartInfo = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    let productList = await Product.find();
    productList = productList.map((item) => String(item._id));
    let newCart = user.cart.map((cartItem) => {
      if (productList.includes(String(cartItem.productId))) {
        return {
          ...cartItem,
        };
      } else {
        return {
          ...cartItem,
          canBeSold: false,
          remarks: '아이템 삭제',
        };
      }
    });
    await User.findByIdAndUpdate(id, { cart: newCart });
    return res.status(200).json({ success: true, cart: newCart });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: '유저 및 장바구니 정보를 불러오는데 실패했습니다.',
    });
  }
};

export const addItemToCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId, quantity } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 없습니다.' });
  }
  let product = await Product.findById(productId);
  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: '상품 정보가 없습니다.' });
  }
  let item = {
    productId,
    name: product.name,
    price: product.price,
    images: product.images,
    quantity,
    canBeSold: product.canBeSold,
  };
  user.cart.push(item);
  await user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: '카트에 아이템을 저장하는데 실패했습니다.',
      });
    }
    return res.status(201).json({ success: true, cart: user.cart });
  });
};

export const changeQuantityInCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId, quantity } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 없습니다.' });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      ...user,
      cart: user.cart.map((item) =>
        item.productId === productId ? (item.quantity = quantity) : item
      ),
    });
    return res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: '수량 변경에 실패했습니다.' });
  }
};

export const deleteItem = async (req, res) => {
  const { productId } = req.params;
  const { _id: userId } = req.user;
  // 유저 아이디가 같아야 지움

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 없습니다.' });
  }
  let newCart = user.cart.filter(
    (item) => String(item.productId) !== String(productId)
  );
  try {
    await User.findByIdAndUpdate(userId, { cart: newCart });
    return res.status(200).json({ success: true, cart: newCart });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: '장바구니에서 상품을 삭제하는데 실패했습니다.',
    });
  }
};

export const refreshCart = async (req, res) => {
  const { _id: userIdInReq } = req.user;
  const { userId } = req.params;
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 없습니다.' });
  }
  if (String(userIdInReq) !== String(currentUser._id)) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 맞지 않습니다.' });
  }
  currentUser.cart = [];
  await currentUser.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        errorMessage: '유저 정보에 카트 정보를 지우는데 실패했습니다.',
      });
    }
  });
  return res.status(200).json({ success: true, cart: [] });
};

export const addOrder = async (req, res) => {
  const items = req.body;
  const {
    user,
    params: { userId },
  } = req;
  // 유저가 맞는지 확인.
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 없습니다.' });
  }
  if (String(user._id) !== String(currentUser._id)) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 맞지 않습니다.' });
  }
  // 새로운 order 만들어서 유저의 order에 넣어주기
  try {
    let newOrder = await Order.create({ user: userId, items });
    currentUser.orders.push(newOrder._id);
    await currentUser.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          errorMessage: '유저 정보에 새로운 주문 저장을 실패했습니다.',
        });
      }
    });
    return res.status(200).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, errorMessage: '주문 생성에 실패했습니다.' });
  }
};

export const getOrders = async (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  if (String(userId) !== String(user._id)) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  try {
    let currentUser = await User.findById(userId).populate('orders');
    let orders = currentUser.orders.sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: '주문 정보를 불러오는데 실패했습니다.',
    });
  }
};

export const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  if (user.role === 0) {
    try {
      let currentUser = await User.findById(userId).populate('orders');
      let orders = currentUser.orders.sort((a, b) => b.createdAt - a.createdAt);
      let info = {
        username: currentUser.username,
        email: currentUser.email,
        orders,
      };
      return res.status(200).json({ success: true, info });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: '찾는 유저 정보가 없습니다.' });
    }
  }
  if (String(userId) !== String(user._id)) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  try {
    let currentUser = await User.findById(userId);
    let info = {
      username: currentUser.username,
      email: currentUser.email,
    };
    return res.status(200).json({ success: true, info });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '찾는 유저 정보가 없습니다.' });
  }
};

export const changeUsername = async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  const { username } = req.body;
  if (String(userId) !== String(user._id)) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  // 유저 찾기
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.log('error');
    return res
      .status(400)
      .json({ success: false, errorMessage: '유저정보가 없습니다.' });
  }

  if (username) {
    const usernameCheck = await User.exists({ username });
    if (usernameCheck) {
      return res
        .status(400)
        .json({ success: false, message: '이미 존재하는 유저네임입니다.' });
    } else {
      try {
        await User.findByIdAndUpdate(userId, { username });
        return res.status(200).json({ success: true });
      } catch (error) {
        console.log('error4');
        return res.status(400).json({
          success: false,
          message: '유저네임 업데이트에 실패했습니다.',
        });
      }
    }
  }
};

export const changePassword = async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (String(userId) !== String(user._id)) {
    return res
      .status(400)
      .json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.log('error');
    return res
      .status(400)
      .json({ success: false, message: '유저정보가 없습니다.' });
  }

  // 기존 비밀번호와 동일한지 확인
  const passwordComparison = await bcrypt.compare(
    currentPassword,
    currentUser.password
  );
  if (!passwordComparison) {
    return res
      .status(400)
      .json({ success: false, message: '기존 비밀번호와 다릅니다!' });
  } else {
    // 동일하면 비밀번호 변경해주기
    currentUser.password = newPassword;
    await currentUser.save((err, user) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: '비밀번호 변경에 실패했습니다!' });
      return res.status(200).json({ success: true });
    });
  }
};
