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

const SvgImage = () => (
  <Image
    src="https://icons.iconarchive.com/icons/hopstarter/halloween-avatar/1024/Guy-Fawkes-icon.png"
    alt="[image]"
  />
)

const Bundle = ({
  bundle: {
    tokenId,
    name,
    imageUrl,
    traits,
  },
}) => (
  <div className={styles.listItem}>
    <div className={styles.axieWrapper}>

      <div className={classnames(styles.image, styles.classOne)}>
        <Image
          src={imageUrl}
          alt="[image]"
        />
        <a href="/">{name}</a>
      </div>

      <div className={classnames(styles.axieInfo, styles.classTwo)}>
        <div className="number">#44324342</div>
        <div className="number">RP #44342</div>
        <div className="number">Breed count</div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsItem}>
          <div className={styles.statsWrapper}>
            <div className={styles.circle}>
              <SvgImage />
            </div>
            <p>Clear</p>
          </div>
          <div className={styles.statsWrapper}>
            <div className={styles.circle}>
              <SvgImage />
            </div>
            <p>Inkling</p>
          </div>
        </div>

        <div className={styles.statsItem}>
          <div className={styles.statsWrapper}>
            <div className={styles.circle}>
              <SvgImage />
            </div>
            <p>Anemone</p>
          </div>
          <div className={styles.statsWrapper}>
            <div className={styles.circle}>
              <SvgImage />
            </div>
            <p>Dango</p>
          </div>
        </div>

        <div className={styles.statsItem}>
          <div className={styles.statsWrapper}>
            <div className={styles.circle}>
              <SvgImage />
            </div>
            <p>Little_Branch</p>
          </div>
          <div className={styles.statsWrapper}>
            <div className={styles.circle}>
              <SvgImage />
            </div>
            <p>Tiny_Dino</p>
          </div>
        </div>
      </div>

      <div className={classnames(styles.axiePrice, styles.classThree)}>
        <div className="ether">Ξ 0.014</div>
        <div className="dollar">$2.39</div>
      </div>

    </div>
  </div>
);

export default Bundle;
