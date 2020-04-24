import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

const Input = ({ className, children, ...rest }) => (
  <input
    {...rest}
    className={classnames(className, styles.input)}
  />
);

export default Input;
