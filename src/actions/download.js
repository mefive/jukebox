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

export function downloadImageStart(fileName) {
  return {
    type: types.DOWNLOAD_IMAGE_START,
    fileName
  };
}

export function downloadImageDone(fileName) {
  return {
    type: types.DOWNLOAD_IMAGE_DONE,
    fileName
  };
}
