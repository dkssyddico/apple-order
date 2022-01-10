import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminMain from '../Pages/AdminMain/AdminMain';
import AdminOrderDetail from '../Pages/AdminOrderDetail/AdminOrderDetail';
import AdminOrders from '../Pages/AdminOrders/AdminOrders';
import AdminProductDetail from '../Pages/AdminProductDetail/AdminProductDetail';
import AdminProducts from '../Pages/AdminProducts/AdminProducts';
import UploadProduct from '../Pages/AdminProducts/sections/UploadProduct';
import AdminUserDetail from '../Pages/AdminUserDetail/AdminUserDetail';
import AdminUsers from '../Pages/AdminUsers/AdminUsers';
import Cart from '../Pages/Cart/Cart';
import Checkout from '../Pages/Checkout/Checkout';
import Home from '../Pages/Home/Home';
import Join from '../Pages/Join/Join';
import Login from '../Pages/Login/Login';
import OrderDetail from '../Pages/OrderDetail/OrderDetail';
import OrderHistory from '../Pages/OrderHistory/OrderHistory';
import OrderSuccess from '../Pages/OrderSuccess/OrderSuccess';
import ProductDetail from '../Pages/ProductDetail/ProductDetail';
import Profile from '../Pages/Profile/Profile';
import NavBar from './NavBar';

function Router() {
  const { login, isAdmin } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={login ? <Navigate to='/' /> : <Login />} />
        <Route path='/join' element={login ? <Navigate to='/' /> : <Join />} />
        <Route path='/product/:id' element={<ProductDetail />} />

        <Route path='/cart' element={login ? <Cart /> : <Navigate to='/login' />} />
        <Route path='/checkout' element={login ? <Checkout /> : <Navigate to='/login' />} />
        <Route path='/profile' element={login ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/orders' element={login ? <OrderHistory /> : <Navigate to='/login' />} />
        <Route
          path='/orders/:orderId'
          element={login ? <OrderDetail /> : <Navigate to='/login' />}
        />
        <Route path='/orderSuccess' element={login ? <OrderSuccess /> : <Navigate to='/login' />} />

        <Route
          path='/admin'
          element={login && isAdmin ? <AdminMain /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/users'
          element={login && isAdmin ? <AdminUsers /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/users/:userId'
          element={login && isAdmin ? <AdminUserDetail /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/orders'
          element={login && isAdmin ? <AdminOrders /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/orders/:orderId'
          element={login && isAdmin ? <AdminOrderDetail /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/products'
          element={login && isAdmin ? <AdminProducts /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/products/:productId'
          element={login && login ? <AdminProductDetail /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/products/upload'
          element={login && login ? <UploadProduct /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<Navigate to='/' replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
