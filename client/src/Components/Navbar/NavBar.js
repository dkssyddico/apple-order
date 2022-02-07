import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import {
  clearUser,
  logoutUser,
  refreshUser,
} from '../../reducers/userReducers';
import styled from 'styled-components';

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 6vh;
  left: 0;
  ul {
    background-color: whitesmoke;
    padding: 16px;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      margin: 0;
      padding: 0.5rem 0;
      border-bottom: 1px solid black;
      &:last-child {
        border: none;
      }
    }
  }
`;

const Dropdown = styled.li`
  position: relative;
  padding: 16px;
  &:hover {
    ${DropdownMenu} {
      display: block;
    }
  }
`;

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { login, isAdmin, username, error } = user;
  const isRToken = localStorage.getItem('r_token');

  useEffect(() => {
    // 새로고침해서 로그인은 풀렸는데 리프레쉬 토큰이 남아있는 경우
    if (!login && isRToken) {
      dispatch(refreshUser());
    }
  }, [dispatch, login, isRToken, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
      navigate('/login'); // 리프레쉬 토큰이 만료된 경우 새로 로그인 유도.
      localStorage.removeItem('r_token');
      dispatch(clearUser());
    }
  }, [error, dispatch, navigate]);

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__left}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.navbar__right}>
        {login && isAdmin && (
          <>
            <Dropdown>
              <Link to="/admin">Admin</Link>
              <DropdownMenu>
                <ul>
                  <li>
                    <Link to="/admin/users">Users</Link>
                  </li>
                  <li>
                    <Link to="/admin/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/admin/products">Products</Link>
                  </li>
                </ul>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
        {login ? (
          <>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <Dropdown>
              <Link to="/profile">{username}</Link>
              <DropdownMenu>
                <ul>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orders">Order</Link>
                  </li>
                </ul>
              </DropdownMenu>
            </Dropdown>
            <li>
              <button onClick={onLogoutClick}>Log out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/join">
                <span className={styles.join}>Join</span>
              </Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
