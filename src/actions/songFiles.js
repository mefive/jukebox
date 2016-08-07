import * as types from '../constants/actionTypes';

export function updateSongFiles(fileNames) {
  return {
    type: types.UPDATE_SONG_FILES,
    fileNames
  };
}

export function downloadSong({ songId, fileName, url }) {
  return {
    type: types.DOWNLOAD_SONG,
    songId,
    fileName,
    url
  };
}
