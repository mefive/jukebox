import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import fs from 'react-native-fs';

import * as filesActions from '../actions/files';
import * as downloadActions from '../actions/download';
import * as constants from '../constants';

const imagesFolder
= `${fs.CachesDirectoryPath}/${constants.IMAGE_FILES_FOLDER_NAME}/`;

const MAX_DOWNLOAD_COUNT = 10;

class ImageDownloadManager extends Component {
  componentDidUpdate() {
    if (this.props.currentList.size >= MAX_DOWNLOAD_COUNT) {
      return;
    }

    const queue = this.props.queue.toJS();
    const keys = Object.keys(queue);

    if (keys.length === 0) {
      return;
    }

    const { dispatch } = this.props;
    const fileName = keys[0];
    const url = queue[fileName].url;

    fs.downloadFile({
      fromUrl: url,
      toFile: `${imagesFolder}${fileName}`
    })
      .then(({ statusCode }) => {
        if (statusCode === 200) {
          dispatch(filesActions.updateImageFiles([fileName]));
        }

        dispatch(downloadActions.downloadImageDone(fileName));
      });

    dispatch(downloadActions.downloadImageStart(fileName));
  }

  render() {
    return null;
  }
}

ImageDownloadManager.propTypes = {
  dispatch: PropTypes.func,
  currentList: PropTypes.instanceOf(Immutable.List),
  queue: PropTypes.instanceOf(Immutable.Map)
};

function mapStateToProp(state) {
  return {
    currentList: state.getIn(['imageDownloadQueue', 'currentList']),
    queue: state.getIn(['imageDownloadQueue', 'queue'])
  };
}

export default connect(mapStateToProp)(ImageDownloadManager);
