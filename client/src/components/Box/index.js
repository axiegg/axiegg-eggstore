import React from 'react';

import styles from './index.module.sass'

const Box = ({ children }) => (
  <div className={styles.box}>{children}</div>
);

export default Box;
