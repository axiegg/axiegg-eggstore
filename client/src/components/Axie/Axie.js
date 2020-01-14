import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { AxieParts, AxiePrice, AxieStats, AxieImage, AxieName, AxieBadge } from 'components/Axie';

const breedCosts = [700, 900, 900, 1500, 2400, 3000, 3000];

const availableBreedsHelper = (breedCount, exp) => {
  let available = 0;
  let breedTotal = breedCount;
  let expTotal = exp;

  while (breedTotal < 7 && expTotal > breedCosts[breedTotal]) {
    available += 1;
    breedTotal += 1;
    expTotal -= breedCosts[breedTotal];
  }

  return available;
};

const Axie = ({ axie, withExp, className }) => {
  const { auction, id, breedCount, title, exp, pendingCalc, parts, stats, name } = axie;
  const availableBreeds = availableBreedsHelper(breedCount, exp + pendingCalc);

  return (
    <a className={classnames(styles.axie, className)} href={`https://axieinfinity.com/axie/${id}`} target="_blank" rel="noopener noreferrer">
      <AxieName {...{ name, axieClass: axie.class }} />
      <AxieBadge {...{ title }} />
      <div className={styles.breedContainer}>
        { withExp && (
          <div className={styles.expContainer}>
            <span className={styles.exp}>
              Exp: {exp}&nbsp;
              <span className={styles.expPending}>({pendingCalc || 0})</span>
            </span>
          </div>
        )}
        <p className={styles.breeds}>
          Breeds: {breedCount}/7&nbsp;
          <span className={styles.breedsAvailable}>({availableBreeds})</span>
        </p>
      </div>
      <AxieImage {...{ id }} />
      <AxiePrice {...{ auction }} axieClass={axie.class} />
      <AxieStats {...{ stats }} axieClass={axie.class} />
      <AxieParts {...{ parts }} />
    </a>
  );
};

export default Axie;
