import React, { useEffect, useState } from 'react';

import Button from 'components/Button';
import Axie from 'components/Axie';

import styles from './index.module.sass';

import { buyOrder } from 'services/Opensea';
import { BNToETH } from 'services/Web3Service';

const BundleAsset = ({
  asset: {
    tokenId,
  },
}) => (
  <div className={styles.asset}>
    <Axie
      {...{
        requestId: tokenId,
        className: styles.assetAxie,
      }}
    />
  </div>
);

const Bundle = ({
  bundle: {
    name,
    assets,
    sellOrders,
    description,
  },
}) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (sellOrders.length > 0) {
      const sortedSellOrders = sellOrders.sort((a, b) => BNToETH(a.basePrice) > BNToETH(b.basePrice));
      setOrder(sortedSellOrders[0]);
    }
  }, []);

  return (
    <div className={styles.bundle}>
      <div className={styles.bundleContent}>
        <h2 className={styles.bundleTitle}>{name}</h2>
        <div className={styles.assets}>
          {assets.map((asset, i) => <BundleAsset {...{ asset, key: i }} />)}
        </div>
        <p className={styles.bundleDesc}>{description}</p>
      </div>
      {order !== null
        ? <Button onClick={() => buyOrder(order)}><h4><img className="ethLogo" alt="eth" src="//axie.gg/img/ethSmall.png" /> {BNToETH(order.basePrice)} </h4></Button>
        : <p>Bundle has no fixed price.</p>
      }
    </div>
  );
};

export default Bundle;
