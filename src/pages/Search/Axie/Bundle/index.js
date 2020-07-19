/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import Button from 'components/Button';
import AxieTeamView from 'components/Axie/AxieTeamView';

import styles from './index.module.sass';
import classnames from 'classnames';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';
import { ERC20Mappings } from 'shared/constants';

import Image from 'components/Image';
import { getAxiePNG } from 'services/Axie';

const Bundle = ({
  bundle: {
    id,
    name,
    image,
    breedCount,
    stats
  },
}) => {

  return (
    <a href={`/axie/${id}`} className={styles.listItem}>
      <div className={styles.axieWrapper}>

        <div className={classnames(styles.image, styles.classOne)}>
          <Image
            src={getAxiePNG(id)}
            alt=""
            className={styles.axieSearchImg}
          />
        </div>

        <div className={classnames(styles.axieInfo, styles.classTwo)}>
          <div className={styles.id}>#{id}</div>
          <div className="number">{name}</div>
          <div className="number">Breed count: {breedCount}</div>
        </div>

        <div>
        {stats !== null ? (
        <div className={styles.stats}>
          <div className={styles.statsItem}>❤️Health {stats.hp}</div>
          <div className={styles.statsItem}>⚡Speed {stats.speed}</div>
          <div className={styles.statsItem}>⭐Skill<br/> {stats.skill}</div>
          <div className={styles.statsItem}>🔥Morale {stats.morale}</div>
        </div>
        ) : (<p>No stats</p>)}
        </div>

        <div className={classnames(styles.axiePrice, styles.classThree)}>
          <div className="ether">Ξ 0.014</div>
          <div className="dollar">$2.39</div>
        </div>

      </div>
    </a>
  );
}

export default Bundle;
