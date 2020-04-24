/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { AxieImage, AxieName, AxieBadge } from 'components/Axie';
import Box from 'components/Box';
import Image from 'components/Image';
import { getAxiePNG } from 'services/Axie';

const AxieTeamView = ({
  axie,
  axie: {
    id,
    tokenId,
    breedCount,
    title,
    name,
  },
  className,
}) => {
  console.log('Axie team view');

  return (
    <div>
      <Link className={classnames(styles.axie, className)} to={`/axie/${tokenId}`}>
        <Box>
          <AxieName {...{ name: `#${tokenId}`, axieClass: axie.class }} />
          <AxieBadge {...{ title }} />
          <Image
            className={classnames(styles.axieImg, className)}
            src={getAxiePNG(tokenId)}
            alt={`Axie #${tokenId}`}
          />
          <p className={styles.axieName}>{name}</p>
        </Box>
      </Link>
    </div>
  );
}

export default AxieTeamView;
