import { createStore, compose, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

import reducers from './duck';


const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      ReduxPromise,
    )
  )
);

export default store;

//const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//export default createStoreWithMiddleware(reducers);
