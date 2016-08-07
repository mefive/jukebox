import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as utils from '../utils';

const songModel = {
  id: 0,
  albumId: 0,
  bMusicId: 0,
  hMusicId: 0,
  lMusicId: 0,
  playTime: 0,
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

      song.lMusicId = i.lMusic.dfsId;
      song.bMusicId = i.bMusic.dfsId;
      song.hMusicId = i.hMusic.dfsId;

      song.playTime = i.lMusic.playTime;
      song.picUrl = i.album.picUrl;

      rt = rt.mergeDeep({ [song.id]: song });
    }
    return rt;
  },

  [types.PLAY_SONG]: (state, action) => {
    const { songId } = action;
    let song = state.get(`${songId}`);
    const hMp3Url = song.get('hMp3Url');

    if (hMp3Url) {
      return state;
    }

    const hMusicId = song.get('hMusicId');
    song = song.set('hMp3Url', utils.getSongUrl(hMusicId));
    return state.set(`${songId}`, song);
  }
});
