import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import jwt from 'jsonwebtoken';
dotenv.config();

export const join = async (req, res) => {
  const { username, email, password, passwordConfirmation, address, contact } = req.body;
  // 비밀번호와 비밀번호 확인이 같은지 확인
  if (passwordConfirmation !== password) {
    return res.status(400).json({ success: false, message: '비밀번호가 같지 않습니다.' });
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
    await User.create({ username, email, password, address, contact });
    return res.status(201).json({ success: true, message: '회원가입에 성공했습니다.' });
  } catch (error) {
    return res.status(400).json({ success: false, message: '회원가입에 문제가 발생했습니다.' });
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
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, // One day
    })
    .status(200)
    .json({
      success: true,
      _id: user._id,
      username: user.username,
      isAdmin: user.role === 0 ? true : false,
      favorites: user.favorites,
      accessToken: accessToken,
    });
};

export const logout = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    await User.findByIdAndUpdate(userId, { token: '' });
    res.clearCookie('r_token');
    return res.status(200).json({ success: true, message: '로그아웃에 성공했습니다.' });
  } catch (error) {
    return res.status(400).json({ success: false, error, message: '로그아웃에 실패했습니다.' });
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
      return res.status(400).json({ success: false, message: '유저를 삭제하지 못했습니다.' });
    }
    return res.status(200).json({ success: true, message: '유저를 성공적으로 삭제했습니다.' });
  });
};

export const getCartInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await User.findById(userId);
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
    await User.findByIdAndUpdate(userId, { cart: newCart });
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
    return res.status(400).json({ success: false, message: '유저 정보가 없습니다.' });
  }
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({ success: false, message: '상품 정보가 없습니다.' });
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
    return res.status(400).json({ success: false, message: '유저 정보가 없습니다.' });
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
    return res.status(400).json({ success: false, message: '수량 변경에 실패했습니다.' });
  }
};

export const deleteItem = async (req, res) => {
  const { productId } = req.params;
  const { _id: userId } = req.user;
  // 유저 아이디가 같아야 지움

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ success: false, message: '유저 정보가 없습니다.' });
  }
  let newCart = user.cart.filter((item) => String(item.productId) !== String(productId));
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
    return res.status(400).json({ success: false, message: '유저 정보가 없습니다.' });
  }
  if (String(userIdInReq) !== String(currentUser._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 맞지 않습니다.' });
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
  const { items, shippingInfo } = req.body;
  const {
    user,
    params: { userId },
  } = req;
  // 유저가 맞는지 확인.
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res.status(400).json({ success: false, message: '유저 정보가 없습니다.' });
  }
  if (String(user._id) !== String(currentUser._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 맞지 않습니다.' });
  }
  // 새로운 order 만들어서 유저의 order에 넣어주기
  // item 마다 주문 횟수 1씩 추가
  try {
    let newOrder = await Order.create({ user: userId, items, shippingInfo });
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
    items.forEach((i) => {
      Product.findById(i.productId).exec(async (err, product) => {
        if (err) {
          console.log('err1', err);
        }

        product.orderCount += 1;
        await product.save((err, p) => {
          if (err) {
            console.log('err2', err);
          }
        });
      });
    });
    return res.status(200).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, errorMessage: '주문 생성에 실패했습니다.' });
  }
};

export const getOrders = async (req, res) => {
  let { userId, index } = req.params;
  index = Number(index) - 1;
  const { user } = req;
  const offset = 4;
  if (String(userId) !== String(user._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  try {
    let currentUser = await User.findById(userId).populate('orders');
    let slicedOrders = currentUser.orders
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(offset * index, offset * index + offset);
    return res
      .status(200)
      .json({ success: true, total: currentUser.orders.length, orders: slicedOrders });
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
      return res.status(400).json({ success: false, message: '찾는 유저 정보가 없습니다.' });
    }
  }
  if (String(userId) !== String(user._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  try {
    let currentUser = await User.findById(userId);
    let info = {
      username: currentUser.username,
      email: currentUser.email,
    };
    return res.status(200).json({ success: true, info });
  } catch (error) {
    return res.status(400).json({ success: false, message: '찾는 유저 정보가 없습니다.' });
  }
};

export const changeUsername = async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  const { username } = req.body;
  if (String(userId) !== String(user._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  // 유저 찾기
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.log('error');
    return res.status(400).json({ success: false, errorMessage: '유저정보가 없습니다.' });
  }

  if (username) {
    const usernameCheck = await User.exists({ username });
    if (usernameCheck) {
      return res.status(400).json({ success: false, message: '이미 존재하는 유저네임입니다.' });
    } else {
      try {
        await User.findByIdAndUpdate(userId, { username });
        return res.status(200).json({ success: true, username });
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
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.log('error');
    return res.status(400).json({ success: false, message: '유저정보가 없습니다.' });
  }

  // 기존 비밀번호와 동일한지 확인
  const passwordComparison = await bcrypt.compare(currentPassword, currentUser.password);
  if (!passwordComparison) {
    return res.status(400).json({ success: false, message: '기존 비밀번호와 다릅니다!' });
  } else {
    // 동일하면 비밀번호 변경해주기
    currentUser.password = newPassword;
    await currentUser.save((err, user) => {
      if (err)
        return res.status(400).json({ success: false, message: '비밀번호 변경에 실패했습니다!' });
      return res.status(200).json({ success: true });
    });
  }
};

export const checkUserLogin = (req, res, next) => {
  if (!req.cookies.r_token) {
    console.log('error here, r token');
    return res.status(401).json({
      success: false,
      error,
      message: '인증에 유효한 리프레쉬 토큰 정보가 없습니다.',
    });
  }
  // r token을 분해한다.
  let { r_token } = req.cookies;
  jwt.verify(r_token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log('refresh token expired');
        return res.status(401).json({
          success: false,
          error: err,
          message: '리프레쉬 토큰이 만료되었습니다. 다시 로그인해주세요.',
        });
      }
      console.log('err rt', err);
      res.clearCookie('r_token');
      return res.status(401).json({
        success: false,
        error: err,
        message: '인증에서 문제가 발생했습니다.',
      });
    }
    try {
      let user = await User.findById({ _id: decoded._id });
      const accessToken = user.generateAccessToken();
      return res.status(200).json({
        success: true,
        _id: user._id,
        username: user.username,
        isAdmin: user.role === 0 ? true : false,
        accessToken: accessToken,
        favorites: user.favorites,
      });
    } catch (error) {
      console.log('error2, rt', error);
      res.clearCookie('r_token');
      return res.status(401).json({
        success: false,
        error,
        message: '인증에 유효한 유저 정보가 없습니다.',
      });
    }
  });
};

export const getFavorite = async (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  if (String(userId) !== String(user._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  // 유저 찾기
  const currentUser = await User.findById(userId).populate('favorites');
  if (!currentUser) {
    console.log('error');
    return res.status(400).json({ success: false, errorMessage: '유저 정보가 없습니다.' });
  }
  return res.status(200).json({ success: true, favorites: currentUser.favorites });
};

export const addFavorite = async (req, res) => {
  // item id를 가져와야 함.

  const { productId } = req.body;
  const { userId } = req.params;
  const { user } = req;

  if (String(userId) !== String(user._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  // 유저 찾기
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.log('error');
    return res.status(400).json({ success: false, errorMessage: '유저 정보가 없습니다.' });
  }
  // 상품 찾기
  const product = await Product.findById(productId);
  if (!product) {
    console.log('error: 아이템을 찾지 못했습니다.');
    return res.status(400).json({ success: false, errorMessage: '상품 정보가 없습니다.' });
  }
  // user favorite array에 push
  currentUser.favorites.push(productId);
  await currentUser.save((err, _) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        errorMessage: '유저 정보에 관심 상품을 등록하는데 실패했습니다.',
      });
    }
  });
  // item favorite array에 push
  product.favorites.push(userId);
  await product.save((err, _) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        errorMessage: '상품 정보에 관심있는 유저를 등록하는데 실패했습니다.',
      });
    }
  });
  return res.status(201).json({ success: true, favorites: currentUser.favorites });
};

export const deleteFavorite = async (req, res) => {
  const { userId, productId } = req.params;
  const { user } = req;

  if (String(userId) !== String(user._id)) {
    return res.status(400).json({ success: false, message: '유저 정보가 일치하지 않습니다.' });
  }
  // 유저 찾기
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.log('error');
    return res.status(400).json({ success: false, errorMessage: '유저 정보가 없습니다.' });
  }
  // 상품 찾기
  const product = await Product.findById(productId);
  if (!product) {
    console.log('error: 아이템을 찾지 못했습니다.');
    return res.status(400).json({ success: false, errorMessage: '상품 정보가 없습니다.' });
  }

  currentUser.favorites.splice(currentUser.favorites.indexOf(productId), 1);
  await currentUser.save((err, _) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        errorMessage: '유저 정보에 관심 상품을 제거하는데 실패했습니다.',
      });
    }
  });
  // item favorite array에 push
  product.favorites.splice(product.favorites.indexOf(userId), 1);
  await product.save((err, _) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        errorMessage: '상품 정보에 관심있는 유저를 제거하는데 실패했습니다.',
      });
    }
  });
  return res.status(200).json({ success: true, favorites: currentUser.favorites });
};
