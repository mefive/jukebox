import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as types from '../constants/actionTypes';

const downloadModel = {
  currentList: [],
  queue: {}
};

const initialState = Immutable.fromJS(downloadModel);

export default createReducer(initialState, {
  [types.DOWNLOAD_IMAGE]: (state, action) => {
    const queue = state.get('queue');
    const { fileName, url } = action;
    return state
      .set('queue', queue.merge({ [fileName]: { fileName, url } }));
  },

  [types.DOWNLOAD_IMAGE_START]: (state, action) => {
    const { fileName } = action;
    const currentList = state.get('currentList');
    const queue = state.get('queue');

    return state
      .set('currentList', currentList.push(fileName))
      .set('queue', queue.delete(fileName));
  },

  [types.DOWNLOAD_IMAGE_DONE]: (state, action) => {
    const currentList = state.get('currentList');
    const index = currentList.indexOf(action.fileName);

    if (index !== -1) {
      return state.set('currentList', currentList.delete(index));
    }

    return state;
  }
});
