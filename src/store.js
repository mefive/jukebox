import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from './lib/reduxLogger';

import Immutable from 'immutable';
import reducer from './reducers/index';

import * as actionTypes from './constants/actionTypes';

const logger = createLogger({
  predicate: (getState, action) => action.type
    !== actionTypes.UPDATE_CURRENT_TIME
});
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const state = Immutable.fromJS({});
const store = reducer(state);

export default createStoreWithMiddleware(reducer, store);
