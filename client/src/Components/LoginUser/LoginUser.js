import React from 'react';
import { useSelector } from 'react-redux';
import useDropdown from '../../hooks/useDropdown';
import UserDropdown from '../UserDropdown/UserDropdown';
import styles from './LoginUser.module.scss';
import { MdArrowDropDown } from 'react-icons/md';

function LoginUser() {
  const user = useSelector((state) => state.user);
  const { username } = user;
  const [menuVisible, ref, handleTargetClick] = useDropdown();

  return (
    <div ref={ref} className={styles.userMenu}>
      <span onClick={handleTargetClick}>{username}</span>
      <div>
        <MdArrowDropDown className={styles.dropdownIcon} />
      </div>
      {menuVisible && <UserDropdown />}
    </div>
  );
}

export default LoginUser;
