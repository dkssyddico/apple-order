import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, removeUser } from '../../reducers/userReducers';
import Loading from '../../Components/Loading';
import { REMOVE_USER_REFRESH } from '../../actions/types';

function AdminUsers() {
  const dispatch = useDispatch();
  const { list: usersList, loading: usersListLoading } = useSelector((state) => state.usersList);
  const { success: removeUserSuccess } = useSelector((state) => state.userRemoved); // 에러처리

  useEffect(() => {
    if (removeUserSuccess) {
      dispatch({ type: REMOVE_USER_REFRESH });
    }

    dispatch(getAllUsers());
  }, [dispatch, removeUserSuccess]);

  const handleDelete = (username, userId) => {
    let confirm = window.confirm(`${username} 유저를 삭제하시겠습니까?`);
    if (confirm) {
      dispatch(removeUser(userId));
    }
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
                      <button onClick={() => handleDelete(user.username, user._id)}>Remove</button>
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
