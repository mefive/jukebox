import * as types from '../constants/actionTypes';

export function playSong({ songId, playlistId, playlist }) {
  return (dispatch, getState) => {
    const state = getState();

    if (playlistId && state.getIn(['playlist', 'id']) !== playlistId) {
      dispatch({
        type: types.UPDATE_PLAY_LIST,
        id: playlistId,
        songs: playlist
      });
    }

    dispatch({
      type: types.PLAY_SONG,
      songId
    });
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
