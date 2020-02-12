import React from 'react';

import styles from './index.module.sass';

const AxieBadge = ({ title }) => title
  ? (
    <div className={styles.badgeContainer}>
      <div className={styles.badge}><span>{title}</span></div>
    </div>
  )
  : null;

export default AxieBadge;
