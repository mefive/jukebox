import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [types.UPDATE_IMAGE_FILES]: (state, action) => {
    let rt = state;
    const { fileNames } = action;

    for (const i of fileNames) {
      rt = rt.mergeDeep({
        [i]: { downloading: false, fileName: i }
      });
    }

    return rt;
  },

  [types.DOWNLOAD_IMAGE]: (state, action) => state.mergeDeep({
    [action.fileName]: { downloading: true, fileName: action.fileName }
  })
});
