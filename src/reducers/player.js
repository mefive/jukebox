import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as constants from '../constants';

const playerModel = {
  status: constants.PLAYER_STATUS_STOP,
  songId: 0,
  duration: 0,
  currentTime: 0
};

const initialState = Immutable.fromJS(playerModel);

export default createReducer(initialState, {
  [types.PLAY_SONG]: (state, action) => state
    .set('status', constants.PLAYER_STATUS_PLAYING)
    .set('songId', action.songId),

  [types.PUASE_SONG]: state => state
    .set('status', constants.PLAYER_STATUS_PAUSE),

  [types.UPDATE_DURATION]: (state, action) => state
    .set('duration', action.duration),

  [types.UPDATE_CURRENT_TIME]: (state, action) => state
    .set('currentTime', action.currentTime)
});
