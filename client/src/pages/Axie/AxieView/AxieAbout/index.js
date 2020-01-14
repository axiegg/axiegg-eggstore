import React from 'react';

import styles from './index.module.sass'

import TextEllipsis from 'components/TextEllipsis';
import ExternalLink from 'components/ExternalLink';

const AxieAbout = ({
  axie,
  axie: {
    level,
    breedCount,
    owner,
  },
}) => (
  <div className={styles.dataContainer}>
    <div className={styles.dataItem}>
      <h4 className={styles.dataTitle}>Class</h4>
      <span>{axie.class}</span>
    </div>
    <div className={styles.dataItem}>
      <h4 className={styles.dataTitle}>Level</h4>
      <span>{level}</span>
    </div>
    <div className={styles.dataItem}>
      <h4 className={styles.dataTitle}>Breed Count</h4>
      <span>{breedCount}/7</span>
    </div>
    <div className={styles.dataItem}>
      <h4 className={styles.dataTitle}>Owner</h4>
      <TextEllipsis className={styles.link}>
        <ExternalLink href={`https://etherscan.io/address/${owner}`}>
          {owner}
        </ExternalLink>
      </TextEllipsis>
    </div>
  </div>
);

export default AxieAbout;
