import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

interface LoaderProps {
  className?: string,
}

const Loader = ({ className }: LoaderProps) => (
  <div className={classnames(styles.loaderContainer, className)}>
    <span className={classnames(styles.loader, className)} />
  </div>
);

export default Loader;
