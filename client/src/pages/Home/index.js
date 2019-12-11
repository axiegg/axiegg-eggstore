import React from 'react';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';

const Home = () => (
  <FullHeight className={styles.fullHeight}>
    <Container className={styles.container}>
      <h1 className={styles.title}>Egg Store</h1>
    </Container>
  </FullHeight>
);

export default Home;
