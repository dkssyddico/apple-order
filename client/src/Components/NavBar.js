import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUser } from '../reducers/userReducers';

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: #f4f3e7;
  max-height: 10vh;
`;

const RightMenu = styled.ul`
  display: flex;
  li {
    margin-left: 30px;
  }
`;

function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loginInfo } = user;

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <Nav>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <RightMenu>
        {loginInfo && loginInfo.isAdmin ? (
          <>
            <li>
              <Link to='/admin'>Admin</Link>
            </li>
            <li>
              <Link to='/admin/users'>Users</Link>
            </li>
            <li>
              <Link to='/admin/orders'>Orders</Link>
            </li>
            <li>
              <Link to='/admin/products'>Products</Link>
            </li>
          </>
        ) : (
          ''
        )}
        {loginInfo && loginInfo.success ? (
          <>
            <li>
              <Link to='/cart'>Cart</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/orders'>Order</Link>
            </li>
            <li>
              <button onClick={onLogoutClick}>Log out</button>
            </li>
          </>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </RightMenu>
    </Nav>
  );
}

export default NavBar;
