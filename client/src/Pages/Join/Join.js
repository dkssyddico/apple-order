import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Message from '../../Components/Message';
import { userAPI } from '../../service/api';
import { useForm } from 'react-hook-form';

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
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const watchFields = watch();

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [navigate, success]);

  const onSubmit = (data) => {
    let confirm = window.confirm(
      `아래와 같은 정보로 회원가입을 진행하시겠습니까?\nUsername: ${data.username}\nEmail: ${data.email}`
    );
    if (confirm) {
      userAPI
        .join(data)
        .then((response) => {
          let {
            data: { success },
          } = response;
          setSuccess(success);
        })
        .catch((error) => {
          let {
            response: {
              data: { message },
            },
          } = error;
          setError(true);
          setErrorMessage(message ? message : error.message);
        });
    }
  };

  return (
    <JoinContainer>
      <JoinCard>
        <h1>Welcome !</h1>
        {error && <Message>{errorMessage}</Message>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {watchFields.username && watchFields.username.length < 3 && (
            <p>유저네임은 3글자 이상이어야합니다.</p>
          )}
          <input
            {...register('username', {
              minLength: {
                value: 3,
                message: '3글자 이상 입력하세요.',
              },
              required: true,
            })}
            type='text'
            placeholder='Username'
          />
          <input
            {...register('email', {
              minLength: {
                value: 3,
                message: '3글자 이상 입력하세요.',
              },
              required: true,
            })}
            type='email'
            placeholder='Email'
          />
          {watchFields.password && watchFields.password.length < 5 && (
            <p>비밀번호는 5글자 이상이어야합니다.</p>
          )}
          <input
            {...register('password', {
              minLength: {
                value: 5,
                message: '비밀번호는 5글자 이상이어야 합니다.',
              },
              required: true,
            })}
            type='password'
            placeholder='Password'
          />
          <input
            {...register('passwordConfirmation', {
              minLength: {
                value: 5,
                message: '비밀번호는 5글자 이상이어야 합니다.',
              },
              required: true,
            })}
            type='password'
            placeholder='Confirm Password'
          />
          {watchFields.password !== watchFields.passwordConfirmation && (
            <p>동일한 비밀번호를 입력해주세요.</p>
          )}
          <button disabled={!isValid} type='submit'>
            Create Account
          </button>
        </Form>
      </JoinCard>
    </JoinContainer>
  );
}

export default Join;
