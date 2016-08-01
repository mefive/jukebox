import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const initialState
= Immutable.fromJS({ loading: false }).set('ids', new Immutable.Set());

export default createReducer(initialState, {
  [types.GET_NEW_SONGS]: state => state.set('loading', true),

  [types.UPDATE_NEW_SONGS]: (state, action) => {
    const { data: raw = [] } = action;
    let ids = state.get('ids');

    ids = ids.union(raw.map(i => i.id));

    return state.set('ids', ids).set('loading', false);
  }
});
