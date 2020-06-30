/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';
import classnames from 'classnames'

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
      let _axies = []

      try {
        _axies = await opensea.api.getAssets({
          owner: EGGS_WALLET,
          asset_contract_addresses: AXIE_TOKEN_ADDRESSES,
          limit: 20,
        }, pageId);
      } catch (err) {
        console.log('Failed: ', err);
      }

      console.log(_axies)
      setAxies(_axies.assets);
    };

    if (opensea !== null) {
      getOrders();
    }
  }, [opensea]);

  return (
    <FullHeight className={styles.fullHeight}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Axie Search Results</h1>
        <h3>
          <a href={`/search/axies/${parseInt(pageId, 10) - 1}`}>
            <img src="/assets/white-arrow.png" className={classnames(styles.icon, styles.left)} />
          </a>
           Page {pageId} 
          <a href={`/search/axies/${parseInt(pageId, 10) + 1}`}>
            <img src="/assets/white-arrow.png" className={styles.icon} />
          </a>
        </h3>

        <div className={styles.filters}>
          <div className={styles.classWrapper}>
            <h4>Class</h4>
            <div className={styles.classes}>
              <div className={styles.leftClass}>
                <input type="checkbox" /> Beast <br />
                <input type="checkbox" /> Plant <br />
                <input type="checkbox" /> Bug <br />
                <input type="checkbox" /> Mech <br />
                <input type="checkbox" /> Dusk <br />
              </div>
              <div className={styles.rightClass}>
                <input type="checkbox" /> Aquatic <br />
                <input type="checkbox" /> Bird <br />
                <input type="checkbox" /> Reptile <br />
                <input type="checkbox" /> Dawn <br />
              </div>
            </div>
          </div>
          <div className={styles.partWrapper}>
            <h4>Parts</h4>
            <div className="parts">
              <input type="text" placeholder="Search parts and abilities" />
            </div>
          </div>
          <div className={styles.partWrapper}>
            <div className="parts">
              <h4>Type</h4>
              <select>
                <option>For sale</option>
                <option>Not for sale</option>
              </select>
              <br />
              
              <h4>Order by</h4>
              <select>
                <option>Last sale</option>
                <option>Token Id</option>
                <option>Listing date</option>
                <option>Top bid</option>
                <option>Sale Price</option>
              </select>
            </div>
          </div>
        </div>

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
        <h3>
          <a href={`/search/axies/${parseInt(pageId, 10) - 1}`}>
            <img src="/assets/white-arrow.png" className={classnames(styles.icon, styles.left)} />
          </a>
           Page {pageId} 
          <a href={`/search/axies/${parseInt(pageId, 10) + 1}`}>
            <img src="/assets/white-arrow.png" className={styles.icon} />
          </a>
        </h3>
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(SearchAxies);
