import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import components and containers
import Menu from 'containers/Menu';
import Footer from 'components/Footer';
import NotificationsList from 'containers/NotificationsList';
import NotFound from 'pages/NotFound';

import Home from 'pages/Home';
import Teams from 'pages/Teams';
import Profile from 'pages/Profile';
import BundleLister from 'pages/BundleLister';
import Axie from 'pages/Axie';

const Routes = () => (
  <Router>
    <Route render={({ location }) => (
      <div id="app">
        <NotificationsList />
        <Menu />
        <Switch>
          <Route path="/axie/:axieId" component={Axie} />
          <Route path="/bundle-lister" component={BundleLister} />
          <Route path="/profile/:address" component={Profile} />
          <Route path="/teams" component={Teams} />
          <Route path="/" exact component={Home} />
          <Route path="/" component={NotFound} />
        </Switch>
        <Footer {...{ location }} />
      </div>)}
    />
  </Router>
);

export default Routes;
