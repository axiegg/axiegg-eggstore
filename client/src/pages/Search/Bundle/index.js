/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import Button from 'components/Button';
import AxieTeamView from 'components/Axie/AxieTeamView';

import styles from './index.module.sass';
import classnames from 'classnames';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';
import { ERC20Mappings } from 'shared/constants';


const BundleAsset = ({
  asset,
}) => (
  <div className={styles.asset}>
    <AxieTeamView axie={asset} />
  </div>
);

const Bundle = ({
  bundle: {
    name,
    assets,
    sellOrders,
    description,
  },
  order,
}) => (
  <div>
    <div className="AxieSearchItem">
      <div className={styles.bundleContent}>
        <h3 className={styles.bundleTitle}>{name}</h3>
        <div className={styles.assets}>
          {assets.map((asset, i) => <BundleAsset asset={asset} />)}
        </div>
        <p className={styles.bundleDesc}>{description}</p>
      </div>
    </div>
    <div className={styles.listItem}>
      <div className={styles.teamWrapper}>
        <div className={classnames(styles.image, styles.classOne)}>
          <a href="/"><img src="https://storage.googleapis.com/assets.axieinfinity.com/axies/142408/axie/axie-full-transparent.png" alt="asd" /></a>
          <a href="/">#213123</a>
        </div>
        <div className={classnames(styles.image, styles.classTwo)}>
          <a href="/"><img src="https://storage.googleapis.com/assets.axieinfinity.com/axies/142408/axie/axie-full-transparent.png" alt="asd" /></a>
          <a href="/">#213123</a>
        </div>
        <div className={classnames(styles.image, styles.classThree)}>
          <a href="/"><img src="https://storage.googleapis.com/assets.axieinfinity.com/axies/142408/axie/axie-full-transparent.png" alt="asd" /></a>
          <a href="/">#213123</a>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Team One</div>
          <div className={styles.description}>
            This Team allows the player to make multiple decisions to influence the outcome of the gam...
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.ether}>Ξ 0.014</div>
          <div className={styles.dollar}>$2.39</div>
        </div>
      </div>
    </div>
  </div>
);

export default Bundle;
