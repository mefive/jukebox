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

export function playNext() {
  return (dispatch, getState) => {
    const state = getState();
    const songs = state.get(['playlist', 'songs']);
    const playlistId = state.get(['playlist', 'id']);
    const songId = state.getIn(['player', 'songId']);

    let index = songs.findLastIndex(i => i === songId);

    if (index === -1 || index === songs.size - 1) {
      index = 0;
    }

    const nextSongId = songs.get(index);

    dispatch(playSong({ songId: nextSongId, playlistId }));
  };
}
