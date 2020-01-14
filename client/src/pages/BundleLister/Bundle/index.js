import React from 'react';

import Button from 'components/Button';
import ExternalLink from 'components/ExternalLink';

import styles from './index.module.sass';
import { getAxiePNG } from 'services/Axie/api';

const Bundle = ({
  bundle,
  bundle: {
    assets,
    Name,
    Description,
    Price,
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
    <p className={styles.price}>{Price} ETH</p>
    <Button onClick={() => listBundle(bundle)}>Create</Button>
  </div>
);

export default Bundle;
