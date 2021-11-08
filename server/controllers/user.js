import User from '../models/User';

export const join = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  // 비밀번호와 비밀번호 확인이 같은지 확인
  if (passwordConfirm !== password) {
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
