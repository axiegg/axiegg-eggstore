import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { getPurenessQuality } from 'services/Axie';

const AxiePureness = ({ parts, axieClass, className = null }) => {
  const pureness = getPurenessQuality(parts, axieClass);

  return (
    <div className={classnames(styles.pureness, className)}>
      Pureness: {pureness.purenessQuality.toFixed(2)}&nbsp;%
    </div>
  );
};

export default AxiePureness;
