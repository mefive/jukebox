import { combineReducers } from 'redux-immutablejs';

import albums from './albums';
import newAlbums from './newAlbums';
import songs from './songs';
import songFiles from './songFiles';
import newSongs from './newSongs';
import artists from './artists';
import player from './player';
import songDownloadQueue from './songDownloadQueue';
import playlist from './playlist';
import appStatus from './appStatus';

const rootReducer = combineReducers({
  albums,
  newAlbums,
  songs,
  songFiles,
  newSongs,
  artists,
  player,
  songDownloadQueue,
  playlist,
  appStatus
});

export default rootReducer;
