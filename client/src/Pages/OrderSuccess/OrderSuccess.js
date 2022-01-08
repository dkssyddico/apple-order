import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderSuccess() {
  const {
    state: { orderId },
  } = useLocation();

  return (
    <div className='container'>
      <div>
        <h1>주문이 완료되었습니다!</h1>
        <p>주문번호 {orderId}</p>
        <div>
          <button>
            <Link to='/'>메인으로 돌아가기</Link>
          </button>
          <button>
            <Link to={`/orders/${orderId}`}>주문 상세내역 보기</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
