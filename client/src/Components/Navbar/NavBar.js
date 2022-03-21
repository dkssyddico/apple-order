import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './NavBar.module.scss';
import { clearUser, checkUserLogin } from '../../reducers/userReducers';
import { getCart } from '../../reducers/cartReducer';
import useWidthCheck from '../../hooks/useWidthCheck';
import SmallNavbar from '../SmallNav/SmallNavbar';
import BigNavbar from '../BigNavbar/BigNavbar';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { login, userId, error, accessToken } = user;
  const isRToken = localStorage.getItem('r_token');
  const width = useWidthCheck();

  useEffect(() => {
    if (error) {
      const { status } = error;
      if (status === 401) {
        console.log('here');
        localStorage.removeItem('r_token');
        localStorage.removeItem('userInfo');
        dispatch(clearUser());
        navigate('/login'); // 리프레쉬 토큰이 만료된 경우 새로 로그인 유도.
        toast.error('Login token is expired. Please login again');
      }
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    // 새로고침: 리프레쉬 토큰이 남아있는 경우
    if (isRToken) {
      dispatch(checkUserLogin());
    }
  }, [dispatch, isRToken]);

  useEffect(() => {
    if (login) {
      dispatch(getCart({ userId, accessToken }));
    }
  }, [login, dispatch, accessToken, userId]);

  return <nav className={styles.navbar}>{width <= 640 ? <SmallNavbar /> : <BigNavbar />}</nav>;
}

export default NavBar;
