/* eslint react/prop-types: 0 */
import React from 'react';

import styles from './index.module.sass';

import fullLogo from 'assets/images/icons/full-logo-black.png';
import redAxie from 'assets/images/icons/red-axie.png';

import { FullHeight, Container } from 'components/Layout';

import Teams from 'pages/Teams';

const Home = () => (
  <FullHeight className={styles.fullHeight}>
    <Container className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerWrapper}>
          <div className={styles.leftCol}>

            <div className={styles.upperText}>
              <img src={fullLogo} alt="Full Logo" />
            </div>
            <h1>Shop for Individual Axies or Complete Teams!</h1>
          </div>
        </div>
      </div>
      <div className={styles.featuredGrid}>
        <div className={styles.teams}>
          <Teams />
        </div>
        <div className={styles.axies}>
          <div className={styles.wrapper}>
            <h1>Featured Axies</h1>
            <img src="https://pbs.twimg.com/media/EUwcZThX0AMiXOC?format=jpg&name=medium" alt="card" />
            <a href="/search/axies" className={styles.homeButton}>Show more</a>
          </div>
        </div>
      </div>

      <div className={styles.cardItems}>
        <div className={styles.cardsWrapper}>
          <div className={styles.cardItem}>
            <div className={styles.wrapper}>
              <h1>Axiegg School</h1>
              <iframe title="Axie School Episode 1 - Early game strategy" src="https://www.youtube.com/embed/5-8IyR25MGA" />
            </div>
          </div>
          <div className={styles.cardItem}>
            <div className={styles.wrapper}>
              <h1>Move of the day!</h1>
              <img src="https://pbs.twimg.com/media/EUwcZThX0AMiXOC?format=jpg&name=medium" alt="card" />
              <p>
                Move of the day: Watermelon-Plant Horn<br /><br />
                Everyone has seen Little owl,  BUT guess what? Watermelon does basicaly the SAME THING!<br /><br />
                Combos/uses<br />
                -Great to take out opposing birds or other attackers<br />
                -Very strong with Cactus and Kotaro<br />
                -Amazing move on Plant Axie<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </FullHeight>
);

export default Home;
