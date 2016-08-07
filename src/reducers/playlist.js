import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const playlistModel = {
  id: 0,
  songs: []
};

const initialState = Immutable.fromJS(playlistModel);

export default createReducer(initialState, {
  [types.UPDATE_PLAY_LIST]: (state, action) => state
    .set('id', action.id)
    .set('songs', Immutable.fromJS(action.songs))
});
