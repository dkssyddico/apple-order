import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

function Cart() {
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <Container>
      <Carousel afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </Container>
  );
}

export default Cart;
