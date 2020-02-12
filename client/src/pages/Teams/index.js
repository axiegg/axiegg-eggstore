import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import { AXIE_TOKEN_ADDRESS, EGGS_WALLET } from 'shared/constants';

import Bundle from './Bundle';

const Teams = ({ opensea }) => {
  const [bundlesList, setBundlesList] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const { bundles } = await opensea.api.getBundles({
        owner: EGGS_WALLET,
        asset_contract_address: AXIE_TOKEN_ADDRESS,
        on_sale: true,
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
        <h1 className={styles.title}>AXIE.GG Team Store</h1>
        {bundlesList !== null
          ? bundlesList.length > 0
            ? (
              <div className={styles.bundles}>
                {bundlesList.map(bundle => <Bundle {...{ key: bundle.slug, bundle }} />)}
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
