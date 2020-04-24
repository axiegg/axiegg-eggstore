import React from 'react';

import Button from 'components/Button';
import ExternalLink from 'components/ExternalLink';

import styles from './index.module.sass';
import { getAxiePNG } from 'services/Axie/api';
import { ERC20Mappings } from 'shared/constants';

const Bundle = ({
  bundle,
  bundle: {
    assets,
    Name,
    Description,
    Price,
    Token,
  },
  listBundle,
}) => (
  <div className={styles.bundle}>
    <ul className={styles.assets}>
      {assets.map(id => (
        <li className={styles.asset} key={id}>
          <img className={styles.assetImage} src={getAxiePNG(id)} alt={`Axie ${id}`} />
          <ExternalLink
            className={styles.assetLink}
            href={`https://marketplace.axieinfinity.com/axie/${id}`}
          >
            {id}
          </ExternalLink>
        </li>
      ))}
    </ul>
    <p className={styles.name}>{Name}</p>
    <p className={styles.description}>{Description}</p>
    <div className={styles.priceContainer}>
      <p className={styles.price}>{Price} {ERC20Mappings[Token].name}</p>
      <img className={styles.icon} src={ERC20Mappings[Token].icon} alt={ERC20Mappings[Token].name} />
    </div>
    <Button onClick={() => listBundle(bundle)}>Create</Button>
  </div>
);

export default Bundle;
