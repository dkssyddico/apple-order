import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../reducers/userReducers';
import styles from './UserDropdown.module.scss';

function UserDropdown() {
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logoutUser());
  };
  return (
    <div className={styles.dropdown}>
      <ul className={styles.menuList}>
        <li className={styles.menu}>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className={styles.menu}>
          <Link to='/orders'>Orders</Link>
        </li>
        <li className={styles.menu}>
          <span onClick={onLogoutClick}>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default UserDropdown;
