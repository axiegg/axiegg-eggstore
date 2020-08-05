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
import _ from 'lodash';

let filters = {
  classes: [],
  parts: [],
  mystic: false,
  pureness: 'any',
  breedable: false,
  stage: 'any',
  orderBy: 'hightest_id',
};

class Pager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      {this.props.pager.pageId !== 0 ? 
        (<h3>
          <a href={`/search/axies/${this.props.pager.prev}`}>
            <img src="/assets/white-arrow.png" className={classnames(styles.icon, styles.left)} />
          </a>
           Page {this.props.pager.pageId}
          <a href={`/search/axies/${this.props.pager.next}`}>
            <img src="/assets/white-arrow.png" className={styles.icon} />
          </a>
        </h3>) 
        : 
        (<p>Loading...</p>)
      }
      </div>
    );
  }
}

class SearchAxies extends React.Component {
  constructor(props) {
    super(props);


    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));

        // update the filters component
        for(var i =0; i < filters.classes.length; i++) {
          var classId = filters.classes[i];
        }
      }

      this.state = {
        //axies: data[0].axies,
        classes: filters.classes,
        parts: filters.parts,
        mystic: filters.mystic,
        pureness: filters.pureness,
        breedable: filters.breedable,
        stage: filters.stage,
        orderBy: filters.orderBy,
        pager: {
          totalAxies: 0, //data[0].totalAxies,
          offset: 0, //(pageId - 1) * 12,
          pageId: 1, //pageId,
          prev: 1, //prev,
          next: 1, //next,
        },
      };

    } else {
      this.state = {
        axies: [],
        classes: [],
        parts: [],
        mystic: false,
        pureness: 'any',
        breedable: false,
        stage: 'any',
        orderBy: 'lowest_id',
        pager: {
          totalAxies: 0,
          offset: 0,
          prev: 2,
          next: 0,
          pageId: 0,
        },
      }
    }

  }

  generateUrl = (address) => {
    var url = `${API_ENDPOINT}/addresses/${address}/axies?`;
    
    // pages = totalAxies / 12;
    url += `offset=${this.state.pager.offset}`;

    for (var i = 0; i < this.state.classes.length; i++) {
      url += `&class=${this.state.classes[i]}`;
    }

    for (var i = 0; i < this.state.parts.length; i++) {
      url += `&part=${this.state.parts[i]}`;
    }

    url += `&breedable=${this.state.breedable}`;

    // doesn't seem to work
    //url += `&mystic=${this.state.mystic}`; 
    
    if (this.state.pureness !== 'any')
      url += `&pureness=${this.state.pureness}`;

    if (this.state.stage !== 'any')
      url += `&stage=${this.state.stage}`;
    
    url += `&sorting=${this.state.orderBy}`;

    console.log('URL', url);
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
    for(var i = 0; i < this.state.classes.length; i++) {
      var classId = filters.classes[i];
      document.getElementById(classId).checked = true;
    }
    document.getElementById('breedable').checked = this.state.breedable;

    const payload = await this.reloadAxies();
    this.setState(payload);
  }

  async reloadAxies() {
    const data = await this.getAxies(AXIE_TOKEN_ADDRESSES[1]);
    var pager = this.state.pager;
    pager.totalAxies = data[0].totalAxies;
    pager.prev = (pager.pageId < 2) ? 1 : pager.pageId - 1;
    pager.next = (((pager.pageId*12)+2) > (pager.totalAxies - 12)) ? pager.pageId : pager.pageId + 1;
    return {
      axies: data[0].axies,
      pager: pager,
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state)) {
      console.log('COMPONENT DID update: ', this.state);
      //this.reloadAxies();
    }
  }

  storeLocally = (item, data) => {
    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));
      }
      filters[item] = data;
      localStorage.setItem('filters', JSON.stringify(filters));
    } 
  }

  updateState = async (item, data) => {
    this.storeLocally(item, data);
    var payload = await this.reloadAxies();
    var finalPayload = { [item]: data, ...payload };
    console.log('final payload: ', finalPayload);
    this.setState(finalPayload);
    console.log(`${item}: `, this.state);
  }

  toggleClass = async (e) => {
    var classes = this.state.classes;

    if (e.target.checked) {
      classes.push(e.target.value);
    } else {
      const index = classes.indexOf(e.target.value);
      if (index >= 0)
        classes.splice(index, 1);
    }
    
    await this.updateState('classes', classes);
  }

  handleParts = async (e) => {
    e.preventDefault();

    var parts = this.state.parts;

    if (!e.target.delete.checked)  {
      console.log('add');
      parts.push(e.target.part.value);

    } else {
      console.log('delete');
      const index = parts.indexOf(e.target.part.value);
      if (index >= 0)
        parts.splice(index, 1);
    }

    await this.updateState('parts', parts);
  }
  
  handleOrder = async (e) => {
    await this.updateState('orderBy', e.target.value);
  }

  handleBreedable = async (e) => {
    await this.updateState('breedable', e.target.checked);
  }

  handleStage = async(e) => {
    await this.updateState('stage', e.target.value);
  }

  /*
  handleMystic = async (e) => {

    const val = e.target.checked;

    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));
      }
      filters.mystic = val;
      localStorage.setItem('filters', JSON.stringify(filters));
    } 

    this.setState({
      mystic: filters.mystic,
      axies: null,
    });

    this.reloadAxies();
  }*/

  handlePureness = async (e) => {
    await this.updateState('pureness', e.target.value);
  }

  render() {
    let axiesElement;
    if (this.state.axies !== undefined) {
      if (this.state.axies !== null && this.state.axies.length > 0) {
        axiesElement = this.state.axies.map((axie, i) => <Bundle key={i} bundle={axie} />);
      } else if (this.state.axies === null) {
        axiesElement = <Loader />;
      } else if (this.state.axies.length > 0) {
        axiesElement = <p>Axies temporarily out of stock! Contact us on Discord to purchase Axies.</p>;
      }
    }

    return (
      <FullHeight className={styles.fullHeight}>
        <Container className={styles.container}>
          <h1 className={styles.title}>Axie Search Results</h1>

          <div className={styles.filters}>
            <div className={styles.classWrapper}>
              <h4>Class</h4>
              <div className={styles.classes}>
                <div className={styles.leftClass}>
                  <input type="checkbox" onClick={this.toggleClass} id="beast" value="beast" /> Beast <br />
                  <input type="checkbox" onClick={this.toggleClass} id="plant" value="plant" /> Plant <br />
                  <input type="checkbox" onClick={this.toggleClass} id="bug" value="bug" /> Bug <br />
                  <input type="checkbox" onClick={this.toggleClass} id="mech" value="mech" /> Mech <br />
                  <input type="checkbox" onClick={this.toggleClass} id="dusk" value="dusk" /> Dusk <br />
                </div>
                <div className={styles.rightClass}>
                  <input type="checkbox" onClick={this.toggleClass} id="aquatic" value="aquatic" /> Aquatic <br />
                  <input type="checkbox" onClick={this.toggleClass} id="bird" value="bird" /> Bird <br />
                  <input type="checkbox" onClick={this.toggleClass} id="reptile" value="reptile" /> Reptile <br />
                  <input type="checkbox" onClick={this.toggleClass} id="dawn" value="dawn" /> Dawn <br />
                </div>
              </div>
            </div>
            <div className={styles.partWrapper}>
              <h4>Parts</h4>
              <form onSubmit={this.handleParts} className={styles.parts}>
                <input type="checkbox" name="delete" /> delete mode
                <input type="text" name="part" placeholder="Enter part name" />
                <input type="submit" name="submit" value="submit"/>
                <br/>
                Current parts: {this.state.parts}
                <br/>
                <a style={{ textDecoration: 'underline' }} href="http://axie.wiki/index.php?title=Parts">Part List</a>
              </form>
            </div>
            <div className={styles.partWrapper}>
              <div className="parts">
                <input type="checkbox" id="breedable" name="breedable" onChange={this.handleBreedable} /> Breedable

                <h4>Stage</h4>
                <select onChange={this.handleStage} value={this.state.stage} id="stage">
                  <option value="any">Any</option>
                  <option value="1">Egg</option>
                  <option value="2">Larva</option>
                  <option value="3">Petite</option>
                  <option value="4">Adult</option>
                </select>

                <br />

                <h4>Pureness</h4>
                <select onChange={this.handlePureness} value={this.state.pureness} id="pureness">
                  <option value="any">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>

                <br />
                
                <h4>Order by</h4>
                <select onChange={this.handleOrder} value={this.state.orderBy} id="orderBy" name="orderBy">
                  <option value="hightest_id">Highest Token Id</option>
                  <option value="lowest_id">Lowest Token Id</option>
                  <option value="lowest_price">Lowest Price</option>
                  <option value="highest_price">Highest Price</option>
                  <option value="latest_auction">Latest Auction</option>
                </select>
              </div>
            </div>
          </div>


          <Pager pager={this.state.pager} />

          <div className="axieList">
            {axiesElement}
          </div>

          <Pager pager={this.state.pager} />
               
        </Container>
      </FullHeight>
    );
  }
}

const mapStateToProps = ({ opensea }) => ({
  opensea,
});

export default connect(mapStateToProps)(SearchAxies);
