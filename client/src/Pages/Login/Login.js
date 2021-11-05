import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 100%;
  padding-top: 12vh;
  display: flex;
  justify-content: center;
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  return (
    <LoginContainer>
      <LoginCard>
        <h1>Glad to see you again</h1>
        <Form>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button type='submit'>Sign in</button>
        </Form>
        <div>
          <p>
            Don't have an account?{' '}
            <span>
              <Link to='/join'>Join Now</Link>
            </span>
          </p>
        </div>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
