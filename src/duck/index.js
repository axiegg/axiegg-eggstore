import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import web3 from './web3';
import user from './user';
import opensea from './opensea';
import contracts from './contracts';
import cards from './cards';

const reducers = combineReducers({
  notifications,
  web3,
  user,
  opensea,
  contracts,
  cards,
});

export default reducers;
