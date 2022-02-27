import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfile } from '../../reducers/userReducers';
import userService from '../../service/user';
import styles from './Profile.module.scss';

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userId, username } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch,
    formState: { errors: errors2 },
    setValue,
  } = useForm();

  const watchFields = watch();

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

  const changePassword = (data) => {
    const { currentPassword, newPassword, newPasswordConfirmation } = data;
    if (currentPassword === newPassword) {
      toast.error('Please enter the different password');
    } else {
      if (newPassword !== newPasswordConfirmation) {
        toast.error('Please enter the same password');
      } else {
        userService
          .changePassword({ userId, currentPassword, newPassword })
          .then((res) => {
            let {
              data: { success },
            } = res;
            if (success) {
              toast.success('Password was successfully changed!');
              setValue('currentPassword', '');
              setValue('newPassword', '');
              setValue('newPasswordConfirmation', '');
            }
          })
          .catch((error) => {
            const { data } = error.response;
            toast.error(data.message ? data.message : data.error.name);
          });
      }
    }
  };

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Profile</h1>
      <section className={styles.section}>
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
        <div className={styles.passwordContainer}>
          <h2 className={styles.passwordTitle}>Change Password</h2>
          <form className={styles.form} onSubmit={handleSubmit2(changePassword)}>
            {errors2.currentPassword && (
              <p className={styles.warning}>{errors2.currentPassword.message}</p>
            )}
            <input
              className={styles.input}
              {...register2('currentPassword', {
                minLength: {
                  value: 5,
                  message: '5글자 이상 입력하세요.',
                },
              })}
              placeholder='current password'
              type='password'
            />
            {errors2.newPassword && <p className={styles.warning}>{errors2.newPassword.message}</p>}
            {watchFields.newPassword &&
              watchFields.currentPassword &&
              watchFields.newPassword === watchFields.currentPassword && (
                <p className={styles.warning}>현재 비밀번호와 동일합니다.</p>
              )}
            <input
              className={styles.input}
              {...register2('newPassword', {
                minLength: {
                  value: 5,
                  message: '5글자 이상 입력하세요.',
                },
              })}
              placeholder='new password'
              type='password'
            />
            {watchFields.newPassword !== watchFields.newPasswordConfirmation && (
              <p className={styles.warning}>동일한 비밀번호를 입력해주세요.</p>
            )}
            {errors2.newPasswordConfirmation && (
              <p className={styles.warning}>{errors2.newPasswordConfirmation.message}</p>
            )}
            <input
              className={styles.input}
              {...register2('newPasswordConfirmation', {
                minLength: {
                  value: 5,
                  message: '5글자 이상 입력하세요.',
                },
              })}
              placeholder='new password confirmation'
              type='password'
            />
            <button className={styles.button} type='submit'>
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Profile;
