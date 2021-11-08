import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const join = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  // 비밀번호와 비밀번호 확인이 같은지 확인
  if (passwordConfirm !== password) {
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
    await User.create({ username, email, password });
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
      message: '없는 유저입니다. 회원가입을 진행해주세요.',
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
  const token = createToken(user.id);
  user.token = token;
  await user.save((error, user) => {
    if (error) {
      return res.status(400).json({ success: false, message: '로그인에 실패했습니다.' });
    }

    return res
      .cookie('auth_token', token)
      .status(200)
      .json({ success: true, message: '로그인에 성공했습니다.', userId: user._id });
  });
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_SEC,
  });
};