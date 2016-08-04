import { combineReducers } from 'redux-immutablejs';

import albums from './albums';
import newAlbums from './newAlbums';

import songs from './songs';
import newSongs from './newSongs';

import artists from './artists';

const rootReducer = combineReducers({
  albums,
  newAlbums,

  songs,
  newSongs,

  artists
});

export default rootReducer;
