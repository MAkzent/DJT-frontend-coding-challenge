import React from 'react';

import styles from './filter.module.scss';
import classNames from 'classnames';

const Filter = ({ selected, label, action = () => {} }) => (
  <span
    className={classNames(styles.filter, {
      [styles.selected]: selected,
    })}
    onClick={() => action()}
  >
    {label}
  </span>
);

export default Filter;
