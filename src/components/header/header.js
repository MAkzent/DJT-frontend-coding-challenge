import React from 'react';

import { APP_NAME, API_URL } from '../../constants';
import styles from './header.module.scss';

const Header = ({ owner, repo, onClick = () => {} }) => (
  <div className={styles.header}>
    <h2 className={styles.title} onClick={() => onClick()}>
      {APP_NAME}
    </h2>
    <span className={styles.url}>{`${API_URL}${owner}/${repo}`}</span>
  </div>
);

export default Header;
