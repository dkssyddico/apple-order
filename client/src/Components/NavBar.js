import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUser } from '../modules/user';
import { userAPI } from '../service/api';

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
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <Nav>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <RightMenu>
        <li>
          <Link to='/cart'>Cart</Link>
        </li>
        {loggedIn ? (
          <li>
            <button onClick={onLogoutClick}>Log out</button>
          </li>
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
