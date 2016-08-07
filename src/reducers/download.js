import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const downloadModel = {
  downloading: false,
  queue: {}
};

const initialState = Immutable.fromJS(downloadModel);

export default createReducer(initialState, {
  [types.DOWNLOAD_SONG]: (state, action) => {
    const queue = state.get('queue');
    const { songId, fileName, url } = action;
    return state.set('queue', queue.merge({ [`${songId}`]: { fileName, url } }));
  },

  [types.DOWNLOAD_SONG_START]: state => state.set('downloading', true),

  [types.DOWNLOAD_SONG_DONE]: (state, action) => {
    const queue = state.get('queue');
    return state
      .set('queue', queue.delete(`${action.songId}`))
      .set('downloading', false);
  }
});
