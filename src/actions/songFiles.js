import * as types from '../constants/actionTypes';

export function updateSongFiles(fileNames) {
  return {
    type: types.UPDATE_SONG_FILES,
    fileNames
  };
}

export function downloadSong(fileName) {
  return {
    type: types.DOWNLOAD_SONG,
    fileName
  };
}
