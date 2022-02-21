import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import useDropdown from '../../hooks/useDropdown';
import AdminDropdown from '../AdminDropdown/AdminDropdown';
import styles from './AdminMenu.module.scss';

function Admin() {
  const [menuVisible, ref, handleTargetClick] = useDropdown();

  return (
    <div ref={ref} className={styles.adminMenu}>
      <span onClick={handleTargetClick}>Admin</span>
      <div>
        <MdArrowDropDown className={styles.dropdownIcon} />
      </div>
      {menuVisible && <AdminDropdown />}
    </div>
  );
}

export default Admin;
