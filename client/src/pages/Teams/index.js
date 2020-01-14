import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import Button from 'components/Button';

import { AXIE_TOKEN_ADDRESS, EGGS_WALLET } from 'shared/constants';
import { buyOrder } from 'services/Opensea';
import { BNToETH } from 'services/Web3Service';

const Bundle = ({
  bundle: {
    name,
    assets,
    sellOrders,
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
      <h4>{name}</h4>
      <p>{assets.length} assets</p>
      {order !== null
        ? <Button onClick={() => buyOrder(order)}>Buy for {BNToETH(order.basePrice)} ETH</Button>
        : <p>Bundle has no fixed price.</p>
      }
    </div>
  );
};

const Teams = ({ opensea }) => {
  const [bundlesList, setBundlesList] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const { bundles } = await opensea.api.getBundles({
        owner: EGGS_WALLET,
        asset_contract_address: AXIE_TOKEN_ADDRESS,
      });

      setBundlesList(bundles);
    };

    if (opensea !== null) {
      getOrders();
    }
  }, [opensea]);

  return (
    <FullHeight className={styles.fullHeight}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Teams Page</h1>
        {bundlesList !== null
          ? bundlesList.length > 0
            ? bundlesList.map(bundle => <Bundle {...{ key: bundle.slug, bundle }} />)
            : <p>We couldn`t find any bundles with teams</p>
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
