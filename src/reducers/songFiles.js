import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const initialState = new Immutable.Set();

export default createReducer(initialState, {
  [types.UPDATE_SONG_FILES]: (state, action) => state
    .union(action.fileNames)
});
