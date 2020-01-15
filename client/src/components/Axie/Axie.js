import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { AxieParts, AxiePrice, AxieStats, AxieImage, AxieName, AxieBadge } from 'components/Axie';
import Box from 'components/Box';

import { getSingleAxie } from 'services/Axie';

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

const AxieView = ({
  axie,
  axie: {
    auction,
    id,
    breedCount,
    title,
    exp,
    pendingCalc,
    parts,
    stats,
    name,
  },
  className,
}) => (
  <Link className={classnames(styles.axie, className)} to={`/axie/${id}`}>
    <Box>
      <AxieName {...{ name: `#${id}`, axieClass: axie.class }} />
      <AxieBadge {...{ title }} />
      <div className={styles.breedContainer}>
        <p className={styles.breeds}>Breeds: {breedCount}/7&nbsp;</p>
      </div>
      <AxieImage {...{ id, className: styles.axieImage }} />
    </Box>
  </Link>
)

const Axie = ({ requestId, axie, className }) => {
  const [axieData, setAxieData] = useState(axie || null)

  useEffect(() => {
    if (requestId) {
      const requestAxieData = async () => {
        const axieData = await getSingleAxie(requestId);
        setAxieData(axieData);
      }

      requestAxieData();
    }
  }, []);

  return axieData
    ? <AxieView {...{ axie: axieData, className }} />
    : null
};

export default Axie;
