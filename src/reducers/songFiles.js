import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';
import * as utils from '../utils';

const songFilesModel = {
  donwloading: false,
  fileName: ''
};

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [types.UPDATE_SONG_FILES]: (state, action) => {
    let rt = state;
    const { fileNames } = action;

    for (const i of fileNames) {
      rt = rt.mergeDeep({
        [i]: utils.restrictMerge(songFilesModel, { fileName: i })
      });
    }

    return rt;
  },

  [types.DOWNLOAD_SONG]: (state, action) => state.mergeDeep({
    [action.fileName]: { downloading: true, fileName: action.fileName }
  })
});
