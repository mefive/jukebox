import * as types from '../constants/actionTypes';

export function updateSongFiles(fileNames) {
  return {
    type: types.UPDATE_SONG_FILES,
    fileNames
  };
}
