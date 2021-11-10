import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

function AdminProducts() {
  const { loginInfo } = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }
  }, [history, loginInfo]);
  return (
    <Container>
      <h1>AdminProducts</h1>
      <button>
        <Link to='/admin/products/upload'>Upload product</Link>
      </button>
    </Container>
  );
}

export default AdminProducts;
