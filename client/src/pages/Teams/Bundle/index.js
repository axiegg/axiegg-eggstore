import React, { useEffect, useState } from 'react';

import Button from 'components/Button';
import Axie from 'components/Axie';

import styles from './index.module.sass';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';
import { ERC20Mappings } from 'shared/constants';

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
        ? (
          <Button className={styles.button} onClick={() => buyOrder(order)}>
            <h4>
              <img className={styles.tokenLogo} alt={ERC20Mappings[order.paymentToken].name} src={ERC20Mappings[order.paymentToken].icon} />
              <span>{ERC20Mappings[order.paymentToken].convertOnly
                ? BNToNumber(order.basePrice)
                : BNToETH(order.basePrice)}
              </span>
            </h4>
          </Button>
        )
        : <p>Bundle has no fixed price.</p>
      }
    </div>
  );
};

export default Bundle;
