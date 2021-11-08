import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { userAPI } from '../../service/api';

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
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
      passwordConfirm,
    };

    userAPI
      .join(newUser)
      .then((response) => {
        if (response.data.success) {
          history.push('/login');
        }
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) {
          alert(message);
        }
        console.log(error);
      });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'passwordConfirm':
        return setPasswordConfirm(value);
      default:
        break;
    }
  };
  return (
    <JoinContainer>
      <JoinCard>
        <h1>Welcome !</h1>
        <Form onSubmit={handleSubmit}>
          <input
            onChange={handleOnchange}
            type='text'
            placeholder='Username'
            name='username'
          />
          <input
            onChange={handleOnchange}
            type='email'
            placeholder='Email'
            name='email'
          />
          <input
            onChange={handleOnchange}
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
          />
          <input
            onChange={handleOnchange}
            type='password'
            name='passwordConfirm'
            placeholder='Confirm Password'
            minLength='6'
          />
          <button type='submit'>Create Account</button>
        </Form>
      </JoinCard>
    </JoinContainer>
  );
}

export default Join;
