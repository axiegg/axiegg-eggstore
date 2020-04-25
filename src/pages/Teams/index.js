/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import { Image } from 'components/Image';
import Loader from 'components/Loader';

import { AXIE_TOKEN_ADDRESS, EGGS_WALLET, ERC20Mappings } from 'shared/constants';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';

import Bundle from './Bundle';

const Teams = ({ opensea }) => {
  const [bundlesList, setBundlesList] = useState(null);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState(null);

  const rotateCounter = (direction, length) => {
    let result = null;
    if (direction === 'left') {
      result = (count === 0) ? length : count - 1;
    } else {
      result = (count === length) ? 0 : count + 1;
    }

    if (bundlesList[count].sellOrders.length > 0) {
      const sortedSellOrders = bundlesList[result].sellOrders.sort((a, b) => BNToETH(a.basePrice) > BNToETH(b.basePrice));
      setOrder(sortedSellOrders[0]);
    }

    setCount(result);
  };

  useEffect(() => {
    const getOrders = async () => {
      const { bundles } = await opensea.api.getBundles({
        owner: EGGS_WALLET,
        asset_contract_address: AXIE_TOKEN_ADDRESS,
        on_sale: true,
      });

      console.log(bundles);

      if (bundles[count].sellOrders.length > 0) {
        const sortedSellOrders = bundles[count].sellOrders.sort((a, b) => BNToETH(a.basePrice) > BNToETH(b.basePrice));
        setOrder(sortedSellOrders[0]);
      }

      setBundlesList(bundles);
    };

    if (opensea !== null) {
      getOrders();
    }
  }, [opensea]);

  return (
    <FullHeight className={styles.fullHeight}>
      <Container className={styles.container}>
        <h1 className={styles.title}>AXIE.GG Team Store</h1>
        {bundlesList !== null
          ? bundlesList.length > 0
            ? (
              <div className={styles.bundle}>

                <div className={styles.topLayer} />

                <div className={styles.grid}>

                  <div role="button" className={styles.leftArrow} onClick={() => { rotateCounter('left', bundlesList.length - 1); }} tabIndex={count} />

                  <Bundle bundle={bundlesList[count]} order={order} />

                  <div role="button" className={styles.rightArrow} onClick={() => { rotateCounter('right', bundlesList.length - 1); }} tabIndex={count} />

                </div>

                <div className={styles.bottomLayer} />
              </div>
            )
            : <p>Teams temporarily out-of-stock!  Contact us on Discord to purchase Axies.</p>
          : <Loader />
        }
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(Teams);
