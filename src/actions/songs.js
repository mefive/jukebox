import * as types from '../constants/actionTypes';
import service from '../service';

export function getNewSongs({ offset = 0, limit = 20 }) {
  return dispatch => {
    dispatch({
      type: types.GET_NEW_SONGS
    });

    service
      .get('http://music.163.com/api/new/songs', {
        area: 'ALL',
        offset,
        total: true,
        limit
      })
      .then(responseData => {
        const { code, message, songs } = responseData;

        if (code === 200) {
          const songIds = songs.map(i => i.songId);

          dispatch(getSongsDetail(songIds));
        }
        else {
          alert(message);
        }
      });
  };
}

export function getSongsDetail(ids = []) {
  return dispatch => {
    service
      .get(`http://music.163.com/api/song/detail?ids=[${ids.join(',')}]`)
      .then(responseData => {
        const { code, message, songs } = responseData;

        if (code === 200) {
          dispatch({
            type: types.UPDATE_NEW_SONGS,
            data: songs
          });
        }
        else {
          alert(message);
        }
      });
  };
}
