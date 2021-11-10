import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminMain() {
  const { loginInfo } = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }
  }, [history, loginInfo]);
  return <div>Admin</div>;
}

export default AdminMain;