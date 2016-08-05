import * as types from '../constants/actionTypes';

export function playSong(songId) {
  return {
    type: types.PLAY_SONG,
    songId
  };
}

export const pause = {
  type: types.PUASE_SONG
};
