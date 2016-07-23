import { combineReducers } from 'redux-immutablejs';

import albums from './albums';
import newAlbums from './newAlbums';

import songs from './songs';
import newSongs from './newSongs';

const rootReducer = combineReducers({
  albums,
  newAlbums,

  songs,
  newSongs
});

export default rootReducer;
