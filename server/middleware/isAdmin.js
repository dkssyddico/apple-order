const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role === 0) {
    console.log('Im admin!');
    next();
  } else {
    return res.status(401).json({ message: '관리자가 아닙니다.' });
  }
};

export default isAdmin;
