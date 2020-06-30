import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { initWeb3 } from 'services/Web3Service';
import { requestCardsData } from 'services/Axie';
import Routes from 'Routes';

class App extends Component {
  componentDidMount() {
    // wait for button click
    this.setup();
  }

  setup = async () => {
    await initWeb3();
    await requestCardsData();
  }

  render() {
    return (
      <Routes />
    );
  }
}

export default hot(module)(App);
