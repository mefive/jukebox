import { combineReducers } from 'redux-immutablejs';

import albums from './albums';
import newAlbums from './newAlbums';

import songs from './songs';
import songFiles from './songFiles';
import newSongs from './newSongs';

import artists from './artists';

import player from './player';

import download from './download';

import playlist from './playlist';

const rootReducer = combineReducers({
  albums,
  newAlbums,

  songs,
  songFiles,
  newSongs,

  artists,

  player,

  download,

  playlist
});

export default rootReducer;
