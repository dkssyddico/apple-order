import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminRoute from '../hoc/AdminRoute';
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
import ProductDetail from '../Pages/ProductDetail/ProductDetail';
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
        <Route path='/product/:id'>
          <ProductDetail />
        </Route>
        <AdminRoute path='/admin' exact component={AdminMain} />
        <AdminRoute path='/admin/users' exact component={AdminUsers} />
        <AdminRoute path='/admin/orders' exact component={AdminOrders} />
        <AdminRoute path='/admin/products' exact component={AdminProducts} />
        <AdminRoute path='/admin/products/:id/edit' exact component={AdminProductEdit} />
        <AdminRoute path='/admin/products/upload' exact component={UploadProduct} />
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
