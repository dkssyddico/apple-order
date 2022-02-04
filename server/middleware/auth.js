import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

export const auth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let accessToken = req.headers.authorization.split('Bearer ')[1];
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          console.log('error here');
          return res
            .status(401)
            .json({
              success: false,
              error: err,
              message: '인증에서 문제가 발생했습니다.',
            });
        }
        try {
          let user = await User.findOne({
            _id: decoded._id,
            token: accessToken,
          });
          req.user = user;
          next();
        } catch (error) {
          console.log('error here2');
          return res
            .status(401)
            .json({
              success: false,
              error,
              message: '인증에 유효한 유저 정보가 없습니다.',
            });
        }
      }
    );
  }
};
