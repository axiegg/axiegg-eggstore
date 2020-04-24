import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import TextEllipsis from 'components/TextEllipsis';

const MenuAccount = ({ user: { address, nickname } }) => (
  <div className={styles.accountContainer}>
    { address
      ? (
        <React.Fragment>
          <div className={styles.dropdown}>
            <TextEllipsis><Link to={`/profile/${address}`}>{nickname || address }</Link></TextEllipsis>
          </div>
        </React.Fragment>
      )
      : (
        <React.Fragment>
          <span>No wallet</span>
        </React.Fragment>
      )
    }
  </div>
);

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(MenuAccount);
