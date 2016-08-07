import * as types from '../constants/actionTypes';

export const downloadSongStart = {
  type: types.DOWNLOAD_SONG_START
};

export function downloadSongDone(songId) {
  return {
    type: types.DOWNLOAD_SONG_DONE,
    songId
  };
}
