import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as utils from '../utils';

const artistModel = {
  img1v1Id: 0,
  albumSize: 0,
  img1v1Url: '',
  trans: '',
  picId: 0,
  musicSize: 0,
  picUrl: '',
  briefDesc: '',
  name: '',
  id: 0
};

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

const albumsModel = {
  loading: false,
  data: {}
};

const initialState = Immutable.fromJS(albumsModel);

function updateAlbum(immutable, raw) {
  const album = utils.restrictMerge(albumModel, raw);
  return immutable.mergeDeep({ [album.id]: album });
}

export default createReducer(initialState, {
  [types.UPDATE_NEW_ALBUMS]: (state, action) => {
    const { data: raw = [] } = action;
    let data = state.get('data');

    for (const i of raw) {
      data = updateAlbum(data, i);
    }

    return state.set('data', data);
  },

  [types.UPDATE_NEW_SONGS]: (state, action) => {
    const { data: raw = [] } = action;
    let data = state.get('data');

    for (const i of raw) {
      const { album } = i;
      data = updateAlbum(data, album);
    }

    return state.set('data', data);
  }
});
