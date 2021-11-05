import React from 'react';
import styled from 'styled-components';

const JoinContainer = styled.div`
  padding-top: 12vh;
  display: flex;
  justify-content: center;
`;

const JoinCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Join() {
  return (
    <JoinContainer>
      <JoinCard>
        <h1>Welcome !</h1>
        <Form>
          <input type='text' placeholder='Username' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input type='password' placeholder='Confirm Password' />
          <button type='submit'>Create Account</button>
        </Form>
      </JoinCard>
    </JoinContainer>
  );
}

export default Join;
