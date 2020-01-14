import React from 'react';
import classnames from 'classnames';

import { classColors } from 'components/Axie/constants';

import { ReactComponent as HPIcon } from 'assets/images/icons/icon-hp.svg';
import { ReactComponent as MoraleIcon } from 'assets/images/icons/icon-morale.svg';
import { ReactComponent as SkillIcon } from 'assets/images/icons/icon-skill.svg';
import { ReactComponent as SpeedIcon } from 'assets/images/icons/icon-speed.svg';

import styles from './index.module.sass';

const AxieStats = ({ stats: { hp, skill, speed, morale }, axieClass, className }) => (
  <div className={classnames(styles.container, className)}>
    <div className={styles.stat}>
      <span
        className={styles.statIcon}
        style={{ backgroundColor: classColors[axieClass] }}
      >
        <HPIcon />
      </span>
      <p className={styles.statValue}>{hp}</p>
    </div>
    <div className={styles.stat}>
      <span
        className={classnames(styles.statIcon, styles.speed)}
        style={{ backgroundColor: classColors[axieClass] }}
      >
        <SpeedIcon />
      </span>
      <p className={styles.statValue}>{speed}</p>
    </div>
    <div className={styles.stat}>
      <span
        className={styles.statIcon}
        style={{ backgroundColor: classColors[axieClass] }}
      >
        <SkillIcon />
      </span>
      <p className={styles.statValue}>{skill}</p>
    </div>
    <div className={styles.stat}>
      <span
        className={styles.statIcon}
        style={{ backgroundColor: classColors[axieClass] }}
      >
        <MoraleIcon />
      </span>
      <p className={styles.statValue}>{morale}</p>
    </div>
  </div>
);

export default AxieStats;
