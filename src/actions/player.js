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

export function updateDuration(duration) {
  return {
    type: types.UPDATE_DURATION,
    duration
  };
}

export function updateCurrentTime(currentTime) {
  return {
    type: types.UPDATE_CURRENT_TIME,
    currentTime
  };
}
