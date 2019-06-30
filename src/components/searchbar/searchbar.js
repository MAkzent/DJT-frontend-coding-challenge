import React from 'react';
import styles from './searchbar.module.scss';

import Icon from '../icon.js';
import icons from '../../assets/icons/icons';

const Searchbar = ({ onKeyDown = () => {} }) => (
  <div className={styles['searchbar-container']}>
    <Icon className={styles.icon} icon={icons.SEARCH} />
    <input
      className={styles.searchbar}
      placeholder="Paste a link to a GitHub repo!"
      onKeyDown={event => onKeyDown(event)}
      spellCheck="false"
    />
  </div>
);

export default Searchbar;
