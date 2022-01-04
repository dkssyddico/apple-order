import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../actions/userActions';
import { userAPI } from '../../service/api';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.userProfile);
  const [changeUsernameSuccess, setChangeUsernameSuccess] = useState(false);
  const [changePassWordSuccess, setChangePasswordSuccess] = useState(false);
  const { loading, info } = profile;
  const {
    register,
    reset,
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

  const {
    loginInfo: { _id: userId },
  } = user;

  const changeUsername = (data) => {
    const { username } = data;
    userAPI
      .changeUsername(userId, { username })
      .then((res) => {
        let {
          data: { success },
        } = res;
        setChangeUsernameSuccess(success);
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
        userAPI
          .changePassword(userId, { currentPassword, newPassword })
          .then((res) => {
            let {
              data: { success },
            } = res;
            setChangePasswordSuccess(success);
            setValue('currentPassword', '');
            setValue('newPassword', '');
            setValue('newPasswordConfirmation', '');
          })
          .catch((error) => console.log(error));
      }
    }
  };

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (info) {
      reset({
        username: info.username,
      });
    }
  }, [info, reset]);

  useEffect(() => {
    if (changeUsernameSuccess) {
      alert('유저네임 변경에 성공했습니다.');
    }
  }, [changeUsernameSuccess]);

  useEffect(() => {
    if (changePassWordSuccess) {
      alert('비밀번호 변경에 성공했습니다.');
    }
  }, [changePassWordSuccess]);

  return (
    <div className='container'>
      <h1>Profile</h1>
      <section>
        {loading ? (
          <h1>loading..</h1>
        ) : (
          <div>
            <div>
              <form onSubmit={handleSubmit(changeUsername)}>
                {errors.username && <p>{errors.username.message}</p>}
                <input
                  {...register('username', {
                    minLength: {
                      value: 3,
                      message: '3글자 이상 입력하세요.',
                    },
                  })}
                />
                <button type='submit'>수정</button>
              </form>
            </div>
            <div>
              <h1>비밀번호 변경</h1>
              <form onSubmit={handleSubmit2(changePassword)}>
                {errors2.currentPassword && <p>{errors2.currentPassword.message}</p>}
                <input
                  {...register2('currentPassword', {
                    minLength: {
                      value: 5,
                      message: '5글자 이상 입력하세요.',
                    },
                  })}
                  placeholder='current password'
                />
                {errors2.newPassword && <p>{errors2.newPassword.message}</p>}
                {watchFields.newPassword &&
                  watchFields.currentPassword &&
                  watchFields.newPassword === watchFields.currentPassword && (
                    <p>현재 비밀번호와 동일합니다.</p>
                  )}
                <input
                  {...register2('newPassword', {
                    minLength: {
                      value: 5,
                      message: '5글자 이상 입력하세요.',
                    },
                  })}
                  placeholder='new password'
                />
                {watchFields.newPassword !== watchFields.newPasswordConfirmation && (
                  <p>동일한 비밀번호를 입력해주세요.</p>
                )}
                {errors2.newPasswordConfirmation && (
                  <p>{errors2.newPasswordConfirmation.message}</p>
                )}
                <input
                  {...register2('newPasswordConfirmation', {
                    minLength: {
                      value: 5,
                      message: '5글자 이상 입력하세요.',
                    },
                  })}
                  placeholder='new password confirmation'
                />
                <button type='submit'>Update</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
