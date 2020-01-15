import React, { useState, useEffect } from 'react';

import styles from './index.module.sass';

import { AttackIcon, DefIcon } from 'components/Axie/AxieParts';

import { getPartCardData } from 'services/Axie';

const AbilityCardView = ({
  card: {
    src,
    skillName,
    defaultEnergy,
    defaultAttack,
    defaultDefense,
    description,
  },
}) => (
  <div className={styles.card}>
    <div className={styles.cardImage}>
      <span className={styles.cardImageSkill}>{skillName}</span>
      <span className={styles.cardImageEnergy}>{defaultEnergy}</span>
      <div className={styles.cardImageAttack}>
        {AttackIcon}
        <span>{defaultAttack}</span>
      </div>
      <div className={styles.cardImageDefense}>
        {DefIcon}
        <span>{defaultDefense}</span>
      </div>
      <span className={styles.cardImageDescription}>{description}</span>
      <img src={src} alt={`Card ${skillName}`} />
    </div>
  </div>
);

const AbilityCard = ({
  part,
}) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    setCard(getPartCardData(part.name));
  }, [part]);

  return card
    ? <AbilityCardView {...{ card }} />
    : null
}

export default AbilityCard;
