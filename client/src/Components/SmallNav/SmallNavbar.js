import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useDropdown from '../../hooks/useDropdown';
import { clearCart } from '../../reducers/cartReducer';
import { logoutUser } from '../../reducers/userReducers';
import styles from './SmallNavbar.module.scss';

function SmallNavbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { login, isAdmin } = user;
  const { items } = cart;
  const [menuVisible, ref, handleTargetClick] = useDropdown();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
  };

  const handleCartClick = () => {
    if (!login) {
      alert('Please login first!');
    } else {
      navigate('/cart');
    }
  };
  return (
    <div className={styles.smallNavbar}>
      <div ref={ref} className={styles.menuBox}>
        <svg
          onClick={handleTargetClick}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='feather feather-menu'
        >
          <line x1='3' y1='12' x2='21' y2='12'></line>
          <line x1='3' y1='6' x2='21' y2='6'></line>
          <line x1='3' y1='18' x2='21' y2='18'></line>
        </svg>
      </div>
      <div className={styles.logoBox}>
        <Link to='/'>
          <img className={styles.logo} src='./logo.png' alt='logo' />
        </Link>
      </div>
      <div className={styles.cartBox} onClick={handleCartClick}>
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
      {menuVisible && (
        <div className={styles.hiddenMenu}>
          <ul>
            <li className={styles.menu}>
              <Link to='/'>Home</Link>
            </li>
            <li className={styles.menu}>
              <Link to='/products'>Products</Link>
            </li>
            {login && isAdmin && (
              <li className={styles.menu}>
                <Link to='/admin'>Admin Dashboard</Link>
              </li>
            )}
            {login ? (
              <>
                <li className={styles.menu}>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li className={styles.menu}>
                  <Link to='/favorite'>Favorite</Link>
                </li>
                <li className={styles.menu}>
                  <Link to='/orders'>Order</Link>
                </li>
                <li className={styles.menu}>
                  <span className={styles.logout} onClick={onLogoutClick}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className={styles.menu}>
                  <Link to='/login'>Login</Link>
                </li>
                <li className={styles.menu}>
                  <Link to='/join'>Join</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SmallNavbar;
