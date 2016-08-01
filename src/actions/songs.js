import * as types from '../constants/actionTypes';
import service from '../service';
import * as constants from '../constants';

export function getNewSongs({
  offset = 0, limit = 20,
  area = constants.AREA_OCCIDENT
}) {
  return dispatch => {
    dispatch({
      type: types.GET_NEW_SONGS
    });

    service
      .get('http://music.163.com/api/discovery/new/songs', {
        areaId: area,
        offset,
        total: true,
        limit
      })
      .then(responseData => {
        const { code, message, data } = responseData;

        if (code === 200) {
          dispatch({
            type: types.UPDATE_NEW_SONGS,
            data
          });
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
