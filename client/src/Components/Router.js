import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminMain from '../Pages/AdminMain/AdminMain';
import AdminOrderDetail from '../Pages/AdminOrderDetail/AdminOrderDetail';
import AdminOrders from '../Pages/AdminOrders/AdminOrders';
import AdminProducts from '../Pages/AdminProducts/AdminProducts';
import UploadProduct from '../Pages/AdminProducts/sections/UploadProduct';
import AdminProductEdit from '../Pages/AdminProductsEdit/AdminProductEdit';
import AdminUsers from '../Pages/AdminUsers/AdminUsers';
import Cart from '../Pages/Cart/Cart';
import Checkout from '../Pages/Checkout/Checkout';
import Home from '../Pages/Home/Home';
import Join from '../Pages/Join/Join';
import Login from '../Pages/Login/Login';
import OrderSuccess from '../Pages/OrderSuccess/OrderSuccess';
import ProductDetail from '../Pages/ProductDetail/ProductDetail';
import Profile from '../Pages/Profile/Profile';
import NavBar from './NavBar';

function Router() {
  const { loginInfo } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />

        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={loginInfo ? <Cart /> : <Navigate to='/login' />} />
        <Route path='/checkout' element={loginInfo ? <Checkout /> : <Navigate to='/login' />} />
        <Route path='/profile' element={loginInfo ? <Profile /> : <Navigate to='/login' />} />
        <Route
          path='/orderSuccess'
          element={loginInfo ? <OrderSuccess /> : <Navigate to='/login' />}
        />

        <Route
          path='/admin'
          element={loginInfo && loginInfo.isAdmin ? <AdminMain /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/users'
          element={loginInfo && loginInfo.isAdmin ? <AdminUsers /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/orders'
          element={loginInfo && loginInfo.isAdmin ? <AdminOrders /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/orders/:orderId'
          element={loginInfo && loginInfo.isAdmin ? <AdminOrderDetail /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/products'
          element={loginInfo && loginInfo.isAdmin ? <AdminProducts /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/products/:id/edit'
          element={loginInfo && loginInfo.isAdmin ? <AdminProductEdit /> : <Navigate to='/login' />}
        />
        <Route
          path='/admin/products/upload'
          element={loginInfo && loginInfo.isAdmin ? <UploadProduct /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<Navigate to='/' replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
