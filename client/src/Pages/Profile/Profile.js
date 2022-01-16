import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import userService from '../../service/user';
import styles from './Profile.module.css';

function Profile() {
  const user = useSelector((state) => state.user);
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
    userService
      .changeUsername({ userId, username })
      .then((res) => {
        let {
          data: { success },
        } = res;
        if (success) {
          alert('유저네임이 변경되었습니다.');
        }
      })
      .catch((error) => console.log(error));
  };

  const changePassword = (data) => {
    const { currentPassword, newPassword, newPasswordConfirmation } = data;
    if (currentPassword === newPassword) {
      alert('현재 비밀번호과 같은 비밀번호입니다.');
    } else {
      if (newPassword !== newPasswordConfirmation) {
        alert('새 비밀번호과 같은 비밀번호를 입력해주세요');
      } else {
        userService
          .changePassword({ userId, currentPassword, newPassword })
          .then((res) => {
            let {
              data: { success },
            } = res;
            if (success) {
              alert('비밀번호가 변경되었습니다.');
              setValue('currentPassword', '');
              setValue('newPassword', '');
              setValue('newPasswordConfirmation', '');
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <div className={styles.profileContainer}>
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
              수정
            </button>
          </form>
        </div>
        <div className={styles.passwordContainer}>
          <h1 className={styles.passwordTitle}>Change Password</h1>
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
