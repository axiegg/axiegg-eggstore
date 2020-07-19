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

    this.state = {
      axies: [],
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      breedable: false,
      pager: {
        totalAxies: 0,
        offset: 0,
        prev: 2,
        next: 0,
        pageId: 0,
      },
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
    //const data  = await this.getAxies(AXIE_TOKEN_ADDRESSES[1]);
    const pageId = parseInt(this.props.match.params.pageId,10);
    //console.log(data);

    let filters = {
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      breedable: false,
    };

    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));

        // update the filters component
        for(var i =0; i < filters.classes.length; i++) {
          var classId = filters.classes[i];
          document.getElementById(classId).checked = true;
        }

        document.getElementById('breedable').checked = filters.breedable;
        document.getElementById('mystic').checked = filters.mystic;

      }

    } 

    var payload = {
      //axies: data[0].axies,
      classes: filters.classes,
      parts: filters.parts,
      mystic: filters.mystic,
      pureness: filters.pureness,
      breedable: filters.breedable,
      pager: {
        totalAxies: 0,
        offset: ((parseInt(this.props.match.params.pageId,10) - 1) * 12),
        pageId: parseInt(this.props.match.params.pageId, 10),
      },
    };

    console.log('BREEDABLE: ', payload);


    this.setState({
      //axies: data[0].axies,
      classes: filters.classes,
      parts: filters.parts,
      mystic: filters.mystic,
      pureness: filters.pureness,
      breedable: filters.breedable,
      pager: {
        totalAxies: 0,
        offset: ((parseInt(this.props.match.params.pageId,10) - 1) * 12),
        pageId: parseInt(this.props.match.params.pageId, 10),
      },
    });


    console.log('COMPONENT DID MOUNT: ', filters.breedable, this.state);
  }

  async reloadAxies() {
    const data = await this.getAxies(AXIE_TOKEN_ADDRESSES[1]);
    var pager = this.state.pager;
    pager.totalAxies = data[0].totalAxies;
    pager.prev = (pager.pageId < 2) ? 1 : pager.pageId - 1;
    pager.next = (((pager.pageId*12)+2) > (pager.totalAxies - 12)) ? pager.pageId : pager.pageId + 1;
    this.setState({
      axies: data[0].axies,
      pager: pager,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state)) {
      this.reloadAxies();
    }
    
    console.log('COMPONENT DID update: ', this.state);
  }

  toggleClass = (e) => {
    var classes = this.state.classes;

    // show spinner
    this.setState({
      axies: null,
    });

    if (e.target.checked) {
      classes.push(e.target.value);
    } else {
      const index = classes.indexOf(e.target.value);
      if (index >= 0)
        classes.splice(index, 1);
    }
    
    let filters = {
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      breedable: false,
    };

    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));
      }
      filters.classes = classes;
      localStorage.setItem('filters', JSON.stringify(filters));
    } 

    this.setState({
      classes: classes
    });

    this.reloadAxies();
  }

  handleParts = (e) => {
    e.preventDefault();

    var parts = this.state.parts;
    
    // show spinner
    this.setState({
      axies: null,
    });

    if (!e.target.delete.checked)  {
      console.log('add');
      parts.push(e.target.part.value);

    } else {
      console.log('delete');
      const index = parts.indexOf(e.target.part.value);
      if (index >= 0)
        parts.splice(index, 1);
    }

    let filters = {
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      breedable: false,
    };

    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));
      }
      filters.parts= parts;
      localStorage.setItem('filters', JSON.stringify(filters));
    } 

    this.setState({
      parts: parts
    });

    this.reloadAxies();


    console.log(this.state);
  }
  
  handleOrder = () => {

  }

  handleBreedable = (e) => {

    const val = e.target.checked;

    // show spinner
    this.setState({
      axies: null,
    });

    let filters = {
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      breedable: false,
    };

    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));
      }
      filters.breedable = val;
      localStorage.setItem('filters', JSON.stringify(filters));
    } 

    this.setState({
      breedable: filters.breedable
    });

    this.reloadAxies();

    console.log('BREEDABLE: ',this.state.breedable, filters.breedable,  this.state);
  }

  handleStage = () => {

  }

  handleMystic = (e) => {

    const val = e.target.checked;

    // show spinner
    this.setState({
      axies: null,
    });

    let filters = {
      classes: [],
      parts: [],
      mystic: false,
      pureness: 1,
      breedable: false,
    };

    if (localStorage) {
      console.log('local storage supported');
      if (localStorage.getItem('filters') !== null) {
        filters = JSON.parse(localStorage.getItem('filters'));
      }
      filters.mystic = val;
      localStorage.setItem('filters', JSON.stringify(filters));
    } 

    this.setState({
      mystic: filters.mystic
    });

    this.reloadAxies();


  }

  render() {
    let axiesElement;
    if (this.state.axies !== null && this.state.axies.length > 0) {
      axiesElement = this.state.axies.map((axie, i) => <Bundle key={i} bundle={axie} />);
    } else if (this.state.axies === null) {
      axiesElement = <Loader />;
    } else if (this.state.axies.length > 0) {
      axiesElement = <p>Axies temporarily out of stock! Contact us on Discord to purchase Axies.</p>;
    }

    const { editFields } = this.state;

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
                <select onChange={this.handleStage} id="stage">
                  <option value="1">Egg</option>
                  <option value="2">Larva</option>
                  <option value="3">Petite</option>
                  <option value="4">Adult</option>
                </select>

                <br />
                
                <h4>Order by</h4>
                <select onChange={this.handleOrder} id="orderBy" name="orderBy">
                  <option>Token Id</option>
                  <option>Lowest Price</option>
                  <option>Highest Price</option>
                  <option>Latest Auction</option>
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
