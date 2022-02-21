import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDropdown.module.scss';

function AdminDropdown() {
  return (
    <div className={styles.dropdown}>
      <ul className={styles.menuList}>
        <li className={styles.menu}>
          <Link to='/admin'>Main</Link>
        </li>
        <li className={styles.menu}>
          <Link to='/admin/users'>Users</Link>
        </li>
        <li className={styles.menu}>
          <Link to='/admin/orders'>Orders</Link>
        </li>
        <li className={styles.menu}>
          <Link to='/admin/products'>Products</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDropdown;
