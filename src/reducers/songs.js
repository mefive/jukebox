import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as utils from '../utils';

const songModel = {
  id: 0,
  albumId: 0,
  bMusic: {},
  hMusic: {},
  lMusic: {},
  name: '',
  duration: 0,
  starred: false,
  mp3Url: '',
  artistIds: [],
  commentThreadId: ''
};

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [types.UPDATE_NEW_SONGS]: (state, action) => {
    const { data: raw = [] } = action;
    let rt = state;

    for (const i of raw) {
      const song = utils.restrictMerge(songModel, i);

      song.albumId = i.album.id;
      song.artistIds = i.artists.map(j => j.id);

      rt = rt.mergeDeep({ [song.id]: song });
    }
    return rt;
  }
});
