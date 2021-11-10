import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { joinUser } from '../../reducers/userReducer';
import Message from '../../Components/Message';

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, joinInfo, loginInfo } = user;
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
    dispatch(joinUser(newUser));
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

  useEffect(() => {
    if (joinInfo && joinInfo.success) {
      alert('회원가입에 성공했습니다! 로그인해주세요.');
      history.push('/login');
    } else if (loginInfo && loginInfo.success) {
      alert('로그인한 유저는 회원가입을 할 수 없습니다. 로그아웃 후 진행해주세요.');
      history.push('/');
    }
  }, [history, joinInfo, loginInfo]);

  return (
    <JoinContainer>
      <JoinCard>
        <h1>Welcome !</h1>
        {error && <Message>{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <input onChange={handleOnchange} type='text' placeholder='Username' name='username' />
          <input onChange={handleOnchange} type='email' placeholder='Email' name='email' />
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
