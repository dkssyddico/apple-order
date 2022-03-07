import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import userService from '../../service/user';
import styles from './ChangePassword.module.scss';

function ChangePassword({ userId }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const watchFields = watch();

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
    <div className={styles.passwordContainer}>
      <h2 className={styles.passwordTitle}>Change Password</h2>
      <form className={styles.form} onSubmit={handleSubmit(changePassword)}>
        {errors.currentPassword && (
          <p className={styles.warning}>{errors.currentPassword.message}</p>
        )}
        <input
          className={styles.input}
          {...register('currentPassword', {
            minLength: {
              value: 5,
              message: '5글자 이상 입력하세요.',
            },
          })}
          placeholder='current password'
          type='password'
        />
        {errors.newPassword && <p className={styles.warning}>{errors.newPassword.message}</p>}
        {watchFields.newPassword &&
          watchFields.currentPassword &&
          watchFields.newPassword === watchFields.currentPassword && (
            <p className={styles.warning}>현재 비밀번호와 동일합니다.</p>
          )}
        <input
          className={styles.input}
          {...register('newPassword', {
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
        {errors.newPasswordConfirmation && (
          <p className={styles.warning}>{errors.newPasswordConfirmation.message}</p>
        )}
        <input
          className={styles.input}
          {...register('newPasswordConfirmation', {
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
  );
}

export default ChangePassword;
