/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import Button from 'components/Button';
import AxieTeamView from 'components/Axie/AxieTeamView';

import styles from './index.module.sass';

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
  <div className="AxieBundle">
    <div className={styles.bundleContent}>
      <h3 className={styles.bundleTitle}>{name}</h3>
      <div className={styles.assets}>
        {assets.map((asset, i) => <BundleAsset asset={asset} />)}
      </div>
      <p className={styles.bundleDesc}>{description}</p>
    </div>

    {order !== null && order !== undefined
      ? (
        <Button className={styles.button} onClick={() => buyOrder(order)}>
          <img className={styles.tokenLogo} alt={ERC20Mappings[order.paymentToken].name} src={ERC20Mappings[order.paymentToken].icon} />
          <span>{ERC20Mappings[order.paymentToken].convertOnly
            ? BNToNumber(order.basePrice)
            : BNToETH(order.basePrice)}
          </span>
        </Button>
      )
      : <p>Bundle has no fixed price.</p>
    }

  </div>
);

export default Bundle;
