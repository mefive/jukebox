import * as actionTypes from '../constants/actionTypes';

export function startNavigation() {
  return {
    type: actionTypes.START_NAVIGATION
  };
}

export function endNavigation() {
  return {
    type: actionTypes.END_NAVIGATION
  };
}
