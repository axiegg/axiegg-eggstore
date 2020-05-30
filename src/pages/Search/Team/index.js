/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import { AXIE_TOKEN_ADDRESS, EGGS_WALLET, ERC20Mappings } from 'shared/constants';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';

import Bundle from './Bundle';

const SearchTeams = ({ opensea }) => {
  const [bundlesList, setBundlesList] = useState(null);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const { bundles } = await opensea.api.getBundles({
        owner: EGGS_WALLET,
        asset_contract_address: AXIE_TOKEN_ADDRESS,
        on_sale: true,
      });

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
        <h1 className={styles.title}>Search Results</h1>
        {bundlesList !== null
          ? bundlesList.length > 0
            ? (
              bundlesList.map((bundle, i) => <Bundle key={i} bundle={bundle} />)
            )
            : <p>Teams temporarily out of stock! Contact us on Discord to purchase Axies.</p>
          : <Loader />
        }
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(SearchTeams);
