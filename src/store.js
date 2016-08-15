import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from './lib/reduxLogger';

import Immutable from 'immutable';
import reducer from './reducers/index';

import * as actionTypes from './constants/actionTypes';

const logger = createLogger({
  predicate: (getState, action) => ![
    actionTypes.UPDATE_CURRENT_TIME,
    actionTypes.UPDATE_IMAGE_FILES,
    actionTypes.DOWNLOAD_IMAGE
  ].includes(action.type)
});
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const state = Immutable.fromJS({});
const store = reducer(state);

export default createStoreWithMiddleware(reducer, store);
