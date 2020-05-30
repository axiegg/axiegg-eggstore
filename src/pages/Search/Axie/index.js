/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import { AXIE_TOKEN_ADDRESSES, EGGS_WALLET, ERC20Mappings } from 'shared/constants';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';

import Bundle from './Bundle';

const SearchAxies = ({
  opensea,
  match: {
    params: {
      pageId,
    },
  },
}) => {
  const [axies, setAxies] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      console.log('Opensea API: ', opensea.api);
      let _axies = []
      console.log(opensea.api);

      try {
        _axies = await opensea.api.getAssets({
          owner: EGGS_WALLET,
          asset_contract_addresses: AXIE_TOKEN_ADDRESSES,
          limit: 20,
        }, pageId);
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
        <h3><a href={`/search/axies/${parseInt(pageId, 10) - 1}`}>Prev page</a> Page {pageId} <a href={`/search/axies/${parseInt(pageId, 10) + 1}`}>Next page</a></h3>
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
        <h3><a href={`/search/axies/${parseInt(pageId, 10) - 1}`}>Prev page</a> Page {pageId} <a href={`/search/axies/${parseInt(pageId, 10) + 1}`}>Next page</a></h3>
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(SearchAxies);
