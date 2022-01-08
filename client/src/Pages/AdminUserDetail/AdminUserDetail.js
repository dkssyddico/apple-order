import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userAPI } from '../../service/api';

function AdminUserDetail() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [infoError, setInfoError] = useState(false);
  const [infoErrorMessage, setInfoErrorMessage] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const getUserInfo = async (userId) => {
    try {
      setLoading(true);
      let {
        data: { info },
      } = await userAPI.getProfile(userId);
      setInfo(info);
    } catch (error) {
      let {
        response: {
          data: { message },
        },
      } = error;
      setInfoError(true);
      setInfoErrorMessage(message ? message : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  const handleDelete = (userId) => {
    const confirm = window.confirm('정말 이 유저를 삭제합니까?');
    if (confirm) {
      userAPI
        .remove(userId)
        .then((response) => {
          let {
            data: { success },
          } = response;
          if (success) {
            navigate('/admin/users');
          }
        })
        .catch((error) => {
          let {
            response: {
              data: { message },
            },
          } = error;
          setDeleteError(true);
          setDeleteErrorMessage(message ? message : error.message);
        });
    }
  };

  return (
    <div className='container'>
      <h1>User Info</h1>
      {loading ? (
        <h1>Now loading</h1>
      ) : infoError ? (
        <h1>{infoErrorMessage}</h1>
      ) : (
        <section>
          <div>
            <h2>{info && info.username}</h2>
            <h2>{info && info.email}</h2>
          </div>
          {deleteError && <p>{deleteErrorMessage}</p>}
          <div>
            <button onClick={() => handleDelete(userId)}>Remove user</button>
          </div>
          <div>{info && info.orders.map((order) => <h3 key={order._id}>{order._id}</h3>)}</div>
        </section>
      )}
    </div>
  );
}

export default AdminUserDetail;
