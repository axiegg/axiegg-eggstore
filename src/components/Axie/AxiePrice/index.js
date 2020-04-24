import React from 'react';

import { classColors } from 'components/Axie/constants';

import styles from './index.module.sass';

import { fromWei } from 'services/Web3Service';

const roundPrice = price => Math.round(price * 1e4) / 1e4;

const PriceTag = ({ fill }) => (
  <svg width="20" height="15" viewBox="11 10 16 16"><path d="M15.731 21.269a1.35 1.35 0 1 1-1.91 1.91 1.35 1.35 0 0 1 1.91-1.91zM12 25h6.997L27 16.997 20.003 10 12 18.003V25z" fill={fill} fillRule="evenodd" /></svg>
);

const AxiePrice = ({ auction, axieClass }) => {
  const buyPrice = auction && fromWei(auction.buyNowPrice);
  const endPrice = auction && fromWei(auction.endingPrice);

  return auction
    ? (
      <div className={styles.priceContainer}>
        <PriceTag fill={classColors[axieClass]} />
        <span className={styles.price}>{roundPrice(buyPrice)} ETH</span>
        {buyPrice !== endPrice && <span className={styles.priceGoes}>End: {roundPrice(endPrice)} ETH</span>}
      </div>
    )
    : null;
};

export default AxiePrice;
