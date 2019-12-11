import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { initWeb3 } from 'services/Web3Service';
import Routes from 'Routes';

class App extends Component {
  componentDidMount() {
    this.setup();
  }

  setup = async () => {
    await initWeb3();
  }

  render() {
    return (
      <Routes />
    );
  }
}

export default hot(module)(App);
