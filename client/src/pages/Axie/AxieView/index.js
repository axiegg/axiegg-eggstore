import React, { useEffect, Fragment } from 'react';
import Axie, { AxieImage, AxieName, AxieBadge, AxieStats, AxieParts } from 'components/Axie';
import Box from 'components/Box';

import styles from './index.module.sass'

import About from './About';
import Abilities from './Abilities';

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
    matronId,
    sireId,
  },
  parentsAxie,
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
      <h3 className={styles.dataTitle}>About</h3>
      <Box><About {...{ axie }} /></Box>
      <h3 className={styles.dataTitle}>Stats</h3>
      <Box><AxieStats {...{ stats, axieClass: axie.class }} /></Box>
      <h3 className={styles.dataTitle}>Body Parts</h3>
      <Box><AxieParts {...{ parts, axieClass: axie.class }} /></Box>
      <h3 className={styles.dataTitle}>Abilities</h3>
      <Box><Abilities {...{ parts }} /></Box>
      {parentsAxie !== null
        ? (
          <Fragment>
            <h3 className={styles.dataTitle}>Parents</h3>
            <div className={styles.dataParents}>
              <Axie {...{ axie: parentsAxie.sire }} />
              <Axie {...{ axie: parentsAxie.matron }} />
            </div>
          </Fragment>
        )
        : null
      }
    </div>
  </div>
);

export default AxieView;
