/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';
import classnames from 'classnames'

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import { API_ENDPOINT, AXIE_TOKEN_ADDRESS, AXIE_TOKEN_ADDRESSES, EGGS_WALLET, ERC20Mappings } from 'shared/constants';

//import { buyOrder } from 'services/Opensea';
//import { BNToNumber, BNToETH } from 'services/Web3Service';

import Bundle from './Bundle';

import axios from 'axios';

class SearchAxies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      axies: [],
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      totalAxies: 0,
      offset: 0,
    }

  }

  generateUrl = (address) => {
    var url = `${API_ENDPOINT}/addresses/${address}/axies?`;
    
    // pages = totalAxies / 12;
    url += `offset=${this.state.offset}`;

    for (var i = 0; i < this.state.classes.length; i++) {
      url += `&class=${this.state.classes[i]}`;
    }

    for (var i = 0; i < this.state.parts.length; i++) {
      url += `&part=${this.state.parts[i]}`;
    }

    return url;
  }

  getAxies = async (address) => {
    let axies = [];

    const url = this.generateUrl(address); 
    try {
      const current = await axios.get(url);
      if (current.status === 200) {
        axies = axies.concat(current.data);
      } else {
        // TODO: check for status code errors and let the user know
        console.log('An error occured: ', current, url);
      }
    } catch(error) {
      console.log('An error occured: ', error, url);
    }

    return axies;
  }

  async componentDidMount() {
    const data  = await this.getAxies(AXIE_TOKEN_ADDRESSES[1]);
    console.log(data);
    this.setState({
      axies: data[0].axies,
      totalAxies: data[0].totalAxies,
      offset: parseInt(this.props.match.params.pageId) - 1,
    });

    console.log('PAGE: ', this.state);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const data = await this.getAxies(AXIE_TOKEN_ADDRESSES[1]);
      this.setState({
        axies: data[0].axies,
        totalAxies: data[0].totalAxies,
      });
    }
  }

  toggleClass = (e) => {

    var classes = this.state.classes;

    if (e.target.checked) {
      classes.push(e.target.value);
    } else {
      const index = classes.indexOf(e.target.value);
      if (index >= 0)
        classes.splice(index, 1);
    }
    
    this.setState({
      classes: classes
    });

    console.log(this.state);
  }

  render() {
    return (
      <FullHeight className={styles.fullHeight}>
        <Container className={styles.container}>
          <h1 className={styles.title}>Axie Search Results</h1>

          <div className={styles.filters}>
            <div className={styles.classWrapper}>
              <h4>Class</h4>
              <div className={styles.classes}>
                <div className={styles.leftClass}>
                  <input type="checkbox" onClick={this.toggleClass} value="beast" /> Beast <br />
                  <input type="checkbox" onClick={this.toggleClass} value="plant" /> Plant <br />
                  <input type="checkbox" onClick={this.toggleClass} value="bug" /> Bug <br />
                  <input type="checkbox" onClick={this.toggleClass} value="mech" /> Mech <br />
                  <input type="checkbox" onClick={this.toggleClass} value="dusk" /> Dusk <br />
                </div>
                <div className={styles.rightClass}>
                  <input type="checkbox" onClick={this.toggleClass} value="aquatic" /> Aquatic <br />
                  <input type="checkbox" onClick={this.toggleClass} value="bird" /> Bird <br />
                  <input type="checkbox" onClick={this.toggleClass} value="reptile" /> Reptile <br />
                  <input type="checkbox" onClick={this.toggleClass} value="dawn" /> Dawn <br />
                </div>
              </div>
            </div>
            <div className={styles.partWrapper}>
              <h4>Parts</h4>
              <div className="parts">
                <input type="text" placeholder="Search parts and abilities" />
              </div>
            </div>
            <div className={styles.partWrapper}>
              <div className="parts">
                <h4>Type</h4>
                <select>
                  <option>For sale</option>
                  <option>Not for sale</option>
                </select>
                <br />
                
                <h4>Order by</h4>
                <select>
                  <option>Last sale</option>
                  <option>Token Id</option>
                  <option>Listing date</option>
                  <option>Top bid</option>
                  <option>Sale Price</option>
                </select>
              </div>
            </div>
          </div>

          <div className="axieList">
            {this.state.axies !== null
              ? this.state.axies.length > 0
                ? (
                  this.state.axies.map((axie, i) => <Bundle key={i} bundle={axie} />)
                )
                : <p>Axies temporarily out of stock! Contact us on Discord to purchase Axies.</p>
              : <Loader />
            }
          </div>
        </Container>
      </FullHeight>
    );
  }
}

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(SearchAxies);
