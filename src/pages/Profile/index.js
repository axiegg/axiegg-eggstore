import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Input from 'components/Input';
import Button from 'components/Button';

import { deposit, withdraw } from 'services/WETHService';

const Profile = ({
  match: {
    params: {
      address,
    },
  },
  user,
}) => {
  const [convertWETH, setConvertWETH] = useState('');
  const [convertETH, setConvertETH] = useState('');

  return (
    <FullHeight className={styles.fullHeight}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <h3>{address}</h3>
        <div className={styles.convertContainer}>
          <div className={styles.convertItem}>
            <p>WETH Balance: {user.balanceWETH}</p>
            <Input
              value={convertWETH}
              onChange={e => setConvertWETH(e.target.value)}
              type="number"
              min="0"
              placeholder="Get ETH"
            />
            <Button
              className={styles.convertButton}
              disabled={convertWETH <= 0}
              onClick={() => withdraw(convertWETH)}
            >
              Get
              {convertWETH <= 0
                ? ''
                : ` ${convertWETH} ETH for WETH`
              }
            </Button>
          </div>
          <div className={styles.convertItem}>
            <p>ETH Balance: {user.balanceETH}</p>
            <Input
              onChange={e => setConvertETH(e.target.value)}
              type="number"
              min="0"
              placeholder="Get WETH"
              value={convertETH}
            />
            <Button
              className={styles.convertButton}
              disabled={convertETH <= 0}
              onClick={() => deposit(convertETH)}
            >
              Get
              {convertETH <= 0
                ? ''
                : ` ${convertETH} WETH for ETH`
              }
            </Button>
          </div>
        </div>
      </Container>
    </FullHeight>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Profile);
