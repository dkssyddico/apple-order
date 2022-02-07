import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reducers/userReducers';
import styles from './Login.module.css';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error } = user;

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

  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Glad to see you again</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            onChange={onChange}
            name="email"
            type="email"
            placeholder="apple@order.com"
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            onChange={onChange}
            name="password"
            type="password"
            placeholder="Enter your password"
            minLength="6"
          />
          <button className={styles.loginBtn} type="submit">
            Sign in
          </button>
        </form>
        <div>
          <p>
            Don't have an account?{' '}
            <span>
              <Link className={styles.joinLink} to="/join">
                Join Now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
