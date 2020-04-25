import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import Image from 'components/Image';
import { getAxiePNG } from 'services/Axie';

const AxieImage = ({
  id,
  className,
  noLazy,
}) => (
  <Image
    className={classnames(styles.axieImg, className)}
    src={getAxiePNG(id)}
    alt={`Axie #${id}`}
    noLazy={noLazy}
  />
);

export default AxieImage;
