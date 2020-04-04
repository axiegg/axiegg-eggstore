/* eslint react/prop-types: 0 */
import React from 'react';

import styles from './index.module.sass';

import fullLogo from 'assets/images/icons/full-logo-black.png';
import redAxie from 'assets/images/icons/red-axie.png';

import { FullHeight, Container } from 'components/Layout';

const Home = () => (
  <FullHeight className={styles.fullHeight}>
    <Container className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerWrapper}>
          <div className={styles.leftCol}>

            <div className={styles.upperText}>
              <img src={fullLogo} alt="Full Logo" />
            </div>
            <h1>Shop from over 8000 Axies!</h1>

            <div className={styles.buttons}>
              <a href="/teams" className={styles.homeButton}>Team Bundles</a>
              <a href="/axies" className={styles.homeButton}>Lone Axies</a>
            </div>

          </div>
          <div className={styles.rightCol}>
            <img src={redAxie} alt="Red Axie" />
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
