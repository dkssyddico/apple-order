import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './NavBar.module.scss';
import { clearUser, checkUserLogin } from '../../reducers/userReducers';
import LoginUser from '../LoginUser/LoginUser';
import AdminMenu from '../AdminMenu/AdminMenu';
import { getCart } from '../../reducers/cartReducer';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { login, userId, isAdmin, error, accessToken } = user;
  const { items } = cart;
  const isRToken = localStorage.getItem('r_token');

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

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menus}>
        <li className={styles.menu}>
          <Link to='/'>Home</Link>
        </li>
        <li className={styles.menu}>
          <Link to='/products'>Products</Link>
        </li>
        {login && isAdmin && (
          <li className={styles.menu}>
            <AdminMenu />
          </li>
        )}
        {login ? (
          <>
            <li className={styles.menu}>
              <Link to='/cart'>
                <div className={styles.cartBox}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-shopping-bag'
                  >
                    <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
                    <line x1='3' y1='6' x2='21' y2='6'></line>
                    <path d='M16 10a4 4 0 0 1-8 0'></path>
                  </svg>
                  <div className={styles.cartItem}>
                    <span>{items && items.length}</span>
                  </div>
                </div>
              </Link>
            </li>
            <li className={styles.menu}>
              <LoginUser />
            </li>
          </>
        ) : (
          <>
            <li className={styles.menu}>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
