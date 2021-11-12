import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminMain from '../Pages/AdminMain/AdminMain';
import AdminOrders from '../Pages/AdminOrders/AdminOrders';
import AdminProducts from '../Pages/AdminProducts/AdminProducts';
import UploadProduct from '../Pages/AdminProducts/sections/UploadProduct';
import AdminProductEdit from '../Pages/AdminProductsEdit/AdminProductEdit';
import AdminUsers from '../Pages/AdminUsers/AdminUsers';
import Cart from '../Pages/Cart/Cart';
import Home from '../Pages/Home/Home';
import Join from '../Pages/Join/Join';
import Login from '../Pages/Login/Login';
import NavBar from './NavBar';

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/cart' exact>
          <Cart />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/join' exact>
          <Join />
        </Route>
        <Route path='/admin' exact>
          <AdminMain />
        </Route>
        <Route path='/admin/users' exact>
          <AdminUsers />
        </Route>
        <Route path='/admin/orders' exact>
          <AdminOrders />
        </Route>
        <Route path='/admin/products' exact>
          <AdminProducts />
        </Route>
        <Route path='/admin/products/:id/edit' exact>
          <AdminProductEdit />
        </Route>
        <Route path='/admin/products/upload' exact>
          <UploadProduct />
        </Route>
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
