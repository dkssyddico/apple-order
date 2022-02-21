import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './NavBar.module.scss';
import { clearUser, refreshUser } from '../../reducers/userReducers';
import LoginUser from '../LoginUser/LoginUser';
import AdminMenu from '../AdminMenu/AdminMenu';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { login, isAdmin, error } = user;
  const isRToken = localStorage.getItem('r_token');

  useEffect(() => {
    // 새로고침해서 로그인은 풀렸는데 리프레쉬 토큰이 남아있는 경우
    if (!login && isRToken) {
      dispatch(refreshUser());
    }
  }, [dispatch, login, isRToken, navigate]);

  useEffect(() => {
    if (error) {
      console.log(error);
      const { status } = error;
      if (status === 401) {
        navigate('/login'); // 리프레쉬 토큰이 만료된 경우 새로 로그인 유도.
        localStorage.removeItem('r_token');
        dispatch(clearUser());
        toast.error('Refresh token is expired. Please login again');
      }
    }
  }, [error, dispatch, navigate]);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__menus}>
        <li className={styles.navbar_menu}>
          <Link to='/'>Home</Link>
        </li>
        <li className={styles.navbar_menu}>
          <Link to='/products'>Products</Link>
        </li>
        {login && isAdmin && (
          <li className={styles.navbar_menu}>
            <AdminMenu />
          </li>
        )}
        {login ? (
          <>
            <li className={styles.navbar_menu}>
              <Link to='/cart'>Cart</Link>
            </li>
            <li className={styles.navbar_menu}>
              <LoginUser />
            </li>
          </>
        ) : (
          <>
            <li className={styles.navbar_menu}>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
