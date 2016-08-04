import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as utils from '../utils';

const artistModel = {
  id: 0,
  name: '',
  picUrl: ''
};

const initialState = Immutable.fromJS({});

function updateArtist(immutable, raw) {
  const artist = utils.restrictMerge(artistModel, raw);
  return immutable.mergeDeep({ [artist.id]: artist });
}

export default createReducer(initialState, {
  [types.UPDATE_NEW_ALBUMS]: (state, action) => {
    const { data: raw = [] } = action;
    let rt = state;

    for (const i of raw) {
      rt = updateArtist(rt, i.artist);
    }

    return rt;
  },

  [types.UPDATE_NEW_SONGS]: (state, action) => {
    const { data: raw = [] } = action;
    let rt = state;

    for (const i of raw) {
      const { artists } = i;

      for (const j of artists) {
        rt = updateArtist(rt, j);
      }
    }

    return rt;
  }
});
