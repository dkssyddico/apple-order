import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

export const checkByRefreshToken = (req, res, next) => {
  if (!req.cookies.r_token) {
    console.log('error here, r token');
    return res
      .status(401)
      .json({
        success: false,
        error,
        message: '인증에 유효한 리프레쉬 토큰 정보가 없습니다.',
      });
  }
  // r token을 분해한다.
  let { r_token } = req.cookies;
  jwt.verify(r_token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      console.log('err rt', err);
      res.clearCookie('r_token');
      return res
        .status(401)
        .json({
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
      });
    } catch (error) {
      console.log('error2, rt', error);
      res.clearCookie('r_token');
      return res
        .status(401)
        .json({
          success: false,
          error,
          message: '인증에 유효한 유저 정보가 없습니다.',
        });
    }
  });
};
