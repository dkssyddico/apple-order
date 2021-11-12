import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, removeUser } from '../../reducers/userReducers';
import Loading from '../../Components/Loading';
import { REMOVE_USER_REFRESH } from '../../actions/types';

function AdminUsers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state) => state.user);
  const { list: usersList, loading: usersListLoading } = useSelector((state) => state.usersList);
  const { success: removeUserSuccess, error: removeUserError } = useSelector(
    (state) => state.userRemoved
  );

  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }

    if (removeUserSuccess) {
      dispatch({ type: REMOVE_USER_REFRESH });
    }

    dispatch(getAllUsers());
  }, [history, loginInfo, dispatch, removeUserSuccess]);

  const handleDelete = (userId) => {
    dispatch(removeUser(userId));
  };

  return (
    <div className='container'>
      <h1>Admin Users</h1>
      <div>
        {usersListLoading ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>Orders</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {usersList &&
                usersList.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>order</td>
                    <td>
                      <button onClick={() => handleDelete(user._id)}>Remove</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
