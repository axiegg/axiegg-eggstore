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
}) => (
  <div className={classnames(styles.image, styles.classOne)}>
    <a href={`/axie/${tokenId}`}>
      <Image
        src={getAxiePNG(tokenId)}
        alt={`Axie #${tokenId}`}
      />
    </a>
    <a href={`/axie/${tokenId}`}>{name}</a>
  </div>
);

const BundleAsset = ({
  asset,
  className,
}) => (
  <AxieListView axie={asset} axieCount={className} />
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
    <div>
      <div className={styles.listItem}>
        <div className={styles.teamWrapper}>
          {assets.map((asset, i) => <BundleAsset key={i} asset={asset} className="classOne" />)}
          <div className={styles.info}>
            <div className={styles.title}>{name}</div>
            <div className={styles.description}>
              {description}
            </div>
          </div>
          <div className={styles.price}>
              {order !== null
                  ? (
                    <Button className={styles.button} onClick={() => buyOrder(order)}>
                      <h4>Ξ 
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
        </div>
      </div>
    </div>
  );

}

export default Bundle;
