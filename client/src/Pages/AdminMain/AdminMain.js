import React from 'react';
import AdminOrdersCard from '../../Components/AdminOrdersCard';
import AdminProductsCard from '../../Components/AdminProductsCard';
import AdminUserCard from '../../Components/AdminUserCard';

function AdminMain() {
  return (
    <div className='container'>
      <h1>Admin</h1>
      <section>
        <AdminUserCard />
        <AdminOrdersCard />
        <AdminProductsCard />
      </section>
    </div>
  );
}

export default AdminMain;
