import React from 'react';
import AdminOrdersCard from '../../Components/AdminOrdersCard/AdminOrdersCard';
import AdminProductsCard from '../../Components/AdminProductsCard/AdminProductsCard';
import AdminUserCard from '../../Components/AdminUserCard/AdminUserCard';
import styles from './AdminMain.module.scss';

function AdminMain() {
  return (
    <div className={styles.adminMain}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <section className={styles.container}>
        <AdminUserCard />
        <AdminOrdersCard />
        <AdminProductsCard />
      </section>
    </div>
  );
}

export default AdminMain;
