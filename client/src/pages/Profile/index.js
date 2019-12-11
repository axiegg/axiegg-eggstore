import React, { useEffect, useState } from 'react';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import { balanceOf } from 'services/WETHService';

const Profile = ({
  match: {
    params: {
      address,
    },
  },
}) => {
  const [WETHBalance, setWETHBalance] = useState(null);

  useEffect(() => {
    const requestWETHBalance = async () => {
      setWETHBalance(await balanceOf(address));
    };

    requestWETHBalance();
  }, []);

  return (
    <FullHeight className={styles.fullHeight}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <h3>{address}</h3>
        <p>WETHBalance: {WETHBalance}</p>
      </Container>
    </FullHeight>
  );
};

export default Profile;
