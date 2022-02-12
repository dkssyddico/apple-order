import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import userService from '../../service/user';
import styles from './Join.module.css';
import toast from 'react-hot-toast';

function Join() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
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
      toast.success('Thanks for joining!');
    }
  }, [navigate, success]);

  const onSubmit = (data) => {
    let confirm = window.confirm(
      `아래와 같은 정보로 회원가입을 진행하시겠습니까?\nUsername: ${data.username}\nEmail: ${data.email}`
    );
    if (confirm) {
      userService
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
          toast.error(message ? message : error.message);
        });
    }
  };

  return (
    <section className={styles.joinContainer}>
      <div className={styles.joinCard}>
        <h1 className={styles.title}>Welcome !</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {watchFields.username && watchFields.username.length < 3 && (
            <p className={styles.warning}>유저네임은 3글자 이상이어야합니다.</p>
          )}
          <input
            className={styles.input}
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
            className={styles.input}
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
            <p className={styles.warning}>비밀번호는 5글자 이상이어야합니다.</p>
          )}
          <input
            className={styles.input}
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
          {watchFields.password !== watchFields.passwordConfirmation && (
            <p className={styles.warning}>동일한 비밀번호를 입력해주세요.</p>
          )}
          <input
            className={styles.input}
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
          <button className={styles.joinBtn} disabled={!isValid} type='submit'>
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}

export default Join;
