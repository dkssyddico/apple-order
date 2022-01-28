import React from 'react';
import AdminOrdersCard from '../../Components/AdminOrdersCard/AdminOrdersCard';
import AdminProductsCard from '../../Components/AdminProductsCard/AdminProductsCard';
import AdminUserCard from '../../Components/AdminUserCard/AdminUserCard';
import styles from './AdminMain.module.css';

function AdminMain() {
  return (
    <div className={styles.adminMain}>
      <h1 className={styles.title}>Admin</h1>
      <section className={styles.adminCardContainer}>
        <AdminUserCard />
        <AdminOrdersCard />
        <AdminProductsCard />
      </section>
    </div>
  );
}

export default AdminMain;
