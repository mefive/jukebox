import * as types from '../constants/actionTypes';
import service from '../service';
import * as constants from '../constants';

export function getNewAlbums({
  offset = 0,
  limit = 50,
  area = constants.ALBUM_AREA_OCCIDENT,
  year = 2016,
  month = 7
}) {
  return dispatch => {
    dispatch({
      type: types.GET_NEW_ALBUMS
    });

    service
      .get('http://music.163.com/api/discovery/new/albums/area', {
        area,
        offset,
        total: true,
        limit,
        year,
        month
      })
      .then(responseData => {
        const { code, message, monthData: data } = responseData;

        if (code === 200) {
          dispatch({
            type: types.UPDATE_NEW_ALBUMS,
            data
          });
        }
        else {
          alert(message);
        }
      });
  };
}
