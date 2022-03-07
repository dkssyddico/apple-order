import React from 'react';
import styles from './ChangeUsername.module.scss';
import { useForm } from 'react-hook-form';
import { changeProfile } from '../../reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function ChangeUsername({ userId, username }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeUsername = (data) => {
    const { username } = data;
    dispatch(changeProfile({ userId, username })).then((response) => {
      const {
        meta: { requestStatus },
        payload,
      } = response;
      if (requestStatus === 'fulfilled') {
        toast.success('Username was successfully changed!');
      } else {
        toast.error(payload.data.message ? payload.data.message : payload.data.error.name);
      }
    });
  };

  return (
    <div className={styles.usernameContainer}>
      <form className={styles.form} onSubmit={handleSubmit(changeUsername)}>
        {errors.username && <p className={styles.warning}>{errors.username.message}</p>}
        <label className={styles.label} htmlFor='username'>
          Username
        </label>
        <input
          className={styles.input}
          {...register('username', {
            minLength: {
              value: 3,
              message: '3글자 이상 입력하세요.',
            },
            value: username,
          })}
          name='username'
        />
        <button className={styles.button} type='submit'>
          Update
        </button>
      </form>
    </div>
  );
}

export default ChangeUsername;
