import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import TextEllipsis from 'components/TextEllipsis';
import { classColors } from 'components/Axie/constants';

const AxieName = ({
  name,
  axieClass,
  className,
}) => (
  <div className={classnames(styles.nameContainer, className)}>
    <TextEllipsis
      className={styles.name}
      style={{ backgroundColor: classColors[axieClass] }}
    >
      {name}
    </TextEllipsis>
  </div>
);

export default AxieName;
