import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const newAlbumsModel = {
  loading: false,
  ids: [],
};

const initialState = Immutable.fromJS(newAlbumsModel);

export default createReducer(initialState, {
  [types.GET_NEW_ALBUMS]: state => state.set('loading', true),

  [types.UPDATE_NEW_ALBUMS]: (state, action) => {
    const { data: raw = [] } = action;

    const ids = raw.map(i => i.id);

    return state.set('ids', ids).set('loading', false);
  }
});
