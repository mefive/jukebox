import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const appStatusModel = {
  onRouting: false
};

const initialState = Immutable.fromJS(appStatusModel);

export default createReducer(initialState, {
  [types.START_NAVIGATION]: state => state.set('onRouting', true),

  [types.END_NAVIGATION]: state => state.set('onRouting', false)
});
