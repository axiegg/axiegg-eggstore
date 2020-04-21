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

const AxieListView = ({
  axie,
  axie: {
    id,
    tokenId,
    breedCount,
    title,
    name,
  },
  axieCount,
}) => {
  console.log('Axie Search list view');

  return (
    <div className={classnames(styles.image, styles.classOne)}>
      <Image
        src={getAxiePNG(tokenId)}
        alt={`Axie #${tokenId}`}
      />
      <a href="/">{name}</a>
    </div>
  );
}


const BundleAsset = ({
  asset,
  className,
}) => (
  <AxieListView axie={asset} axieCount={className} />
);

function indexToClassName(i) {
  switch (i) {
    case 0:
      return 'classOne';

    case 1:
      return 'classTwo';

    case 2:
      return 'classThree';

    default:
      return '';
  }
}

const Bundle = ({
  bundle: {
    name,
    assets,
    sellOrders,
    description,
  },
}) => (
  <div>
    <div className={styles.listItem}>
      <div className={styles.teamWrapper}>
        {assets.map((asset, i) => <BundleAsset key={i} asset={asset} className={indexToClassName(i)} />)}
        <div className={styles.info}>
          <div className={styles.title}>{name}</div>
          <div className={styles.description}>
            {description}
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
