import React from 'react';
import styles from './Message.module.scss';

function Message({ children }) {
  return <div className={styles.box}>{children}</div>;
}

export default Message;
