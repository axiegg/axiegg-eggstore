import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import { AXIE_TOKEN_ADDRESS, EGGS_WALLET } from 'shared/constants';

const Bundle = ({
  bundle: {
    name,
    assets,
  },
}) => (
  <div>
    <h4>{name}</h4>
    <p>{assets.length} assets</p>
  </div>
);

const Store = ({ opensea }) => {
  const [bundlesList, setBundlesList] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const { bundles, estimatedCount } = await opensea.api.getBundles({
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
        <h1 className={styles.title}>Store Page</h1>
        {bundlesList !== null
          ? bundlesList.length > 0
            ? bundlesList.map(bundle => <Bundle {...{ key: bundle.slug, bundle }} />)
            : <p>We couldn`t find any bundles</p>
          : <Loader />
        }
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(Store);
