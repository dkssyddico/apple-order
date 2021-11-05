import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
