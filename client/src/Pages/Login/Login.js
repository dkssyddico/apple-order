import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../reducers/userReducers';
import styles from './Login.module.scss';
import toast from 'react-hot-toast';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    dispatch(loginUser(userInfo))
      .then((response) => {
        const {
          meta: { requestStatus },
          payload,
        } = response;
        if (requestStatus === 'fulfilled') {
          toast.success('Login successfully!');
        }
      })
      .catch((error) => console.log(error));
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

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Glad to see you again!</h1>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            className={styles.input}
            onChange={onChange}
            name='email'
            type='email'
            placeholder='apple@order.com'
          />
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          <input
            className={styles.input}
            onChange={onChange}
            name='password'
            type='password'
            placeholder='Enter your password'
            minLength='6'
          />
          <button className={styles.btn} type='submit'>
            Sign in
          </button>
        </form>
        <div className={styles.joinBox}>
          <p>
            Don't have an account?{' '}
            <span>
              <Link className={styles.joinLink} to='/join'>
                Join Now!
              </Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
