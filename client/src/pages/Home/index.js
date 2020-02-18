import React from 'react';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';

const Home = () => (
  <FullHeight className={styles.fullHeight}>
    <Container className={styles.container}>
      <h1 className={styles.title}>AXIE.GG</h1>
      <h4 className={styles.title}>Shop from over 8000 Axies!</h4>
    </Container>
  </FullHeight>
);

export default Home;
