import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginUser from '../LoginUser/LoginUser';
import AdminMenu from '../AdminMenu/AdminMenu';
import styles from './BigNavbar.module.scss';

function BigNavbar() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { login, isAdmin } = user;
  const { items } = cart;
  return (
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
  );
}

export default BigNavbar;
