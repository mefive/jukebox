import * as types from '../constants/actionTypes';
import service from '../service';

export function getNewAlbums({ offset = 0, limit = 50 }) {
  return dispatch => {
    dispatch({
      type: types.GET_NEW_ALBUMS
    });

    service
      .get('http://music.163.com/api/album/new', {
        area: 'ALL',
        offset,
        total: true,
        limit
      })
      .then(responseData => {
        const { code, message, albums } = responseData;

        if (code === 200) {
          dispatch({
            type: types.UPDATE_NEW_ALBUMS,
            data: albums
          });
        }
        else {
          alert(message);
        }
      });
  };
}
