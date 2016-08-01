import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as utils from '../utils';

const albumModel = {
  paid: false,
  onSale: false,
  status: 0,
  tags: '',
  description: '',
  publishTime: 0,
  company: '',
  artist: {},
  id: 0,
  name: '',
  blurPicUrl: '',
  picUrl: ''
};

const initialState = Immutable.fromJS({});

function updateAlbum(immutable, raw) {
  const album = utils.restrictMerge(albumModel, raw);
  return immutable.mergeDeep({ [album.id]: album });
}

export default createReducer(initialState, {
  [types.UPDATE_NEW_ALBUMS]: (state, action) => {
    const { data: raw = [] } = action;
    let rt = state;

    for (const i of raw) {
      rt = updateAlbum(rt, i);
    }

    return rt;
  },

  [types.UPDATE_NEW_SONGS]: (state, action) => {
    const { data: raw = [] } = action;
    let rt = state;

    for (const i of raw) {
      rt = updateAlbum(rt, i.album);
    }

    return rt;
  }
});
