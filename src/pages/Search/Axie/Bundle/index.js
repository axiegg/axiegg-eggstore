/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import Button from 'components/Button';
import AxieTeamView from 'components/Axie/AxieTeamView';

import styles from './index.module.sass';
import classnames from 'classnames';

import { buyOrder } from 'services/Opensea';
import { BNToNumber, BNToETH } from 'services/Web3Service';
import { ERC20Mappings } from 'shared/constants';

import Image from 'components/Image';
import { getAxiePNG } from 'services/Axie';


import eyesIcon from 'assets/images/icons/eyes.png';
import earsIcon from 'assets/images/icons/ears.png';
import hornIcon from 'assets/images/icons/horn.png';
import tailIcon from 'assets/images/icons/tail.png';
import mouthIcon from 'assets/images/icons/mouth.png';
import backIcon from 'assets/images/icons/back.png';

const earsIconLink = 'assets/images/icons/ears.png';

function getTypeIcon(key) {
  if (key == 0) {
    return earsIcon;
  } else if (key == 1) {
    return hornIcon;
  } else if (key == 2) {
    return tailIcon;
  } else if (key == 3) {
    return eyesIcon;
  } else if (key == 4) {
    return mouthIcon;
  } else if (key == 5) {
    return backIcon;
  }
}
/*

          <div className={styles.statsItem}>
            <div className={styles.statsWrapper}>
              <div className={styles.circle}>
                <SvgImage />
              </div>
              <p>Clear</p>
            </div>
            <div className={styles.statsWrapper}>
              <div className={styles.circle}>
                <SvgImage />
              </div>
              <p>Inkling</p>
            </div>
          </div>

          <div className={styles.statsItem}>
            <div className={styles.statsWrapper}>
              <div className={styles.circle}>
                <SvgImage />
              </div>
              <p>Anemone</p>
            </div>
            <div className={styles.statsWrapper}>
              <div className={styles.circle}>
                <SvgImage />
              </div>
              <p>Dango</p>
            </div>
          </div>

          <div className={styles.statsItem}>
            <div className={styles.statsWrapper}>
              <div className={styles.circle}>
                <SvgImage />
              </div>
              <p>Little_Branch</p>
            </div>
            <div className={styles.statsWrapper}>
              <div className={styles.circle}>
                <SvgImage />
              </div>
              <p>Tiny_Dino</p>
            </div>
          </div>
*/

const SvgImage = (icon) => {
  return (
    <Image
      src={icon['icon']}
    />
  )
}

const Trait = ({trait, index}) => {
  return (
    <div className={styles.statsWrapper}>
      <div className={styles.circle}>
        <SvgImage icon={getTypeIcon(index)} />
      </div>
      <p>{trait.value}</p>
    </div> 
  )
}

const Traits = ({traits}) => {

  var elem = [];

  var i = 0;
  traits.forEach(trait => {
    if (trait.trait_type == "parts") {
      elem.push(<Trait trait={trait} index={i} key={i} />);
      i++;
    }
  })

  return (
    <div>
      {elem}
    </div>
  )
}

const Bundle = ({
  bundle: {
    id,
    name,
    image,
    breedCount,
    stats
  },
}) => {

  return (
    <a href={`/axie/${id}`} className={styles.listItem}>
      <div className={styles.axieWrapper}>

        <div className={classnames(styles.image, styles.classOne)}>
          <Image
            src={getAxiePNG(id)}
            alt=""
          />
        </div>

        <div className={classnames(styles.axieInfo, styles.classTwo)}>
          <div className={styles.id}>#{id}</div>
          <div className="number">{name}</div>
          <div className="number">Breed count: {breedCount}</div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statsItem}>❤️Health {stats.hp}</div>
          <div className={styles.statsItem}>⚡Speed {stats.speed}</div>
          <div className={styles.statsItem}>⭐Skill<br/> {stats.skill}</div>
          <div className={styles.statsItem}>🔥Morale {stats.morale}</div>

        </div>

        <div className={classnames(styles.axiePrice, styles.classThree)}>
          <div className="ether">Ξ 0.014</div>
          <div className="dollar">$2.39</div>
        </div>

      </div>
    </a>
  );
}

export default Bundle;
