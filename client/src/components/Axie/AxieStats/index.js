import React from 'react';
import classnames from 'classnames';

import { ReactComponent as HPIcon } from 'assets/images/icons/icon-hp.svg';
import { ReactComponent as MoraleIcon } from 'assets/images/icons/icon-morale.svg';
import { ReactComponent as SkillIcon } from 'assets/images/icons/icon-skill.svg';
import { ReactComponent as SpeedIcon } from 'assets/images/icons/icon-speed.svg';

import styles from './index.module.sass';

const STATS = [
  { title: 'Health', icon: <HPIcon />, key: 'hp' },
  { title: 'Speed', icon: <SpeedIcon />, key: 'skill' },
  { title: 'Skill', icon: <SkillIcon />, key: 'speed' },
  { title: 'Morale', icon: <MoraleIcon />, key: 'morale' },
];

const AxieStats = ({ stats, axieClass, className }) => (
  <div className={classnames(styles.container, className)}>
    {STATS.map(({ title, icon, key }) => (
      <div className={styles.stat} key={key}>
        <h4 className={styles.statTitle}>{title}</h4>
        <span className={styles.statIcon}>{icon}</span>
        <p className={styles.statValue}>{stats[key]}</p>
      </div>
    ))}
  </div>
);

export default AxieStats;
