import * as types from '../constants/actionTypes';
import * as constants from '../constants';
import RNFS from 'react-native-fs';

const imagesFolder
= `${RNFS.CachesDirectoryPath}/${constants.IMAGE_FILES_FOLDER_NAME}/`;

export function updateSongFiles(fileNames) {
  return {
    type: types.UPDATE_SONG_FILES,
    fileNames
  };
}

export function downloadSong({ songId, fileName, url }) {
  return {
    type: types.DOWNLOAD_SONG,
    songId,
    fileName,
    url
  };
}

export function updateImageFiles(fileNames) {
  return {
    type: types.UPDATE_IMAGE_FILES,
    fileNames
  };
}

export function downloadImage({ url, fileName }) {
  return dispatch => {
    dispatch({
      type: types.DOWNLOAD_IMAGE,
      fileName
    });

    RNFS.downloadFile({
      fromUrl: url,
      toFile: `${imagesFolder}${fileName}`
    })
      .then(({ statusCode }) => {
        console.log('image download statusCode', statusCode);

        if (statusCode === 200) {
          dispatch(
            updateImageFiles([fileName])
          );
        }
      });
  };
}
