import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reducers/userReducers';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { login, error } = user;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    dispatch(loginUser(userInfo));
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        break;
    }
  };

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login, navigate]);

  return (
    <LoginContainer>
      <LoginCard>
        <h1>Glad to see you again</h1>
        {error && <h2>{error}</h2>}
        <Form onSubmit={onSubmit}>
          <input onChange={onChange} name='email' type='email' placeholder='Email' />
          <input
            onChange={onChange}
            name='password'
            type='password'
            placeholder='Password'
            minLength='6'
          />
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
