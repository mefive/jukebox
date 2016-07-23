import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from './lib/reduxLogger';

import Immutable from 'immutable';
import reducer from './reducers/index';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const state = Immutable.fromJS({});
const store = reducer(state);

export default createStoreWithMiddleware(reducer, store);
