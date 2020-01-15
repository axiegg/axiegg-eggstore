import React from 'react';
import { connect } from 'react-redux';

import { AbilityCard } from 'components/Axie';

import styles from './index.module.sass';

const Abilities = ({
  parts,
  cards,
}) => (
  <div className={styles.abilities}>
    {cards && parts.map(part => <AbilityCard {...{ part, key: part.id }} />)}
  </div>
);

const mapStateToProps = ({ cards }) => ({
  cards,
})

export default connect(mapStateToProps)(Abilities);
