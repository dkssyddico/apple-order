import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { clearUser, logoutUser, refreshUser } from '../../reducers/userReducers';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { login, isAdmin } = user;
  const isRToken = localStorage.getItem('r_token');

  useEffect(() => {
    // 새로고침해서 로그인은 풀렸는데 리프레쉬 토큰이 남아있는 경우
    if (!login && isRToken) {
      dispatch(refreshUser())
        .then((res) => {})
        .catch((err) => {
          navigate('/login'); // 토큰이 만료된 경우 새로 로그인 유도.
          localStorage.removeItem('r_token');
          dispatch(clearUser());
        });
    }
  }, [dispatch, isRToken, login, navigate]);

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__left}>
        <Link to='/'>Home</Link>
      </div>
      <div className={styles.navbar__right}>
        {login && isAdmin && (
          <>
            <li>
              <Link to='/admin'>Admin</Link>
            </li>
            <li>
              <Link to='/admin/users'>Users</Link>
            </li>
            <li>
              <Link to='/admin/orders'>Orders</Link>
            </li>
            <li>
              <Link to='/admin/products'>Products</Link>
            </li>
          </>
        )}
        {login ? (
          <>
            <li>
              <Link to='/cart'>Cart</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/orders'>Order</Link>
            </li>
            <li>
              <button onClick={onLogoutClick}>Log out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/join'>
                <span className={styles.join}>Join</span>
              </Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
