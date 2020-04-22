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

const SearchAxies = ({ opensea }) => {
  const [axies, setAxies] = useState(null);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      console.log('Opensea API: ', opensea.api);
      let _axies = []

      try {
        _axies = await opensea.api.getAssets({
          owner: EGGS_WALLET,
          asset_contract_address: AXIE_TOKEN_ADDRESS,
          limit: 20,
        });
      } catch (err) {
        console.log('Failed: ', err);
      }

      setAxies(_axies.assets);
    };

    if (opensea !== null) {
      getOrders();
    }
  }, [opensea]);

  console.log('Axies: ', axies);

  return (
    <FullHeight className={styles.fullHeight}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Axie Search Results</h1>
        <div className="axieList">
          {axies !== null
            ? axies.length > 0
              ? (
                axies.map((axie, i) => <Bundle key={i} bundle={axie} />)
              )
              : <p>Axies temporarily out of stock! Contact us on Discord to purchase Axies.</p>
            : <Loader />
          }
        </div>
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(SearchAxies);
