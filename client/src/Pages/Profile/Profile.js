import React from 'react';
import { useSelector } from 'react-redux';
import ChangePassword from '../../Components/ChangePassword/ChangePassword';
import ChangeUsername from '../../Components/ChangeUsername.js/ChangeUsername';

import styles from './Profile.module.scss';

function Profile() {
  const user = useSelector((state) => state.user);
  const { userId, username } = user;

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Profile</h1>
      <section className={styles.section}>
        <div className={styles.profileEditCard}>
          <ChangeUsername username={username} userId={userId} />
          <ChangePassword userId={userId} />
        </div>
      </section>
    </div>
  );
}

export default Profile;
