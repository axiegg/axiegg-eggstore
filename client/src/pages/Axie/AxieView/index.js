import React, { useEffect } from 'react';
import { AxieImage, AxieName, AxieBadge, AxieStats, AxieParts } from 'components/Axie';

import styles from './index.module.sass'

const AxieView = ({
  axie,
  axie: {
    id,
    name,
    title,
    stats,
    parts,
    level,
    breedCount,
    owner,
  },
}) => (
  <div className={styles.container}>
    <div className={styles.imageContainer}>
      <div className={styles.axieTitles}>
        <AxieName {...{ name: `#${id}`, axieClass: axie.class }} />
        <AxieBadge {...{ title }} />
        <h2 className={styles.axieName}>{name}</h2>
      </div>
      <AxieImage {...{ id }} />
    </div>
    <div className={styles.dataContainer}>
      <h3>About</h3>
      <div>
        {axie.class}
        {level}
        {breedCount}
        {owner}
      </div>
      <h3>Stats</h3>
      <AxieStats {...{ stats, axieClass: axie.class }} />
      <h3>Body Parts</h3>
      <AxieParts {...{ parts, axieClass: axie.class }} />
      <h3>Abilities</h3>
    </div>
  </div>
);

export default AxieView;
