import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import RNFS from 'react-native-fs';

import Port from './views/Port';
import Player from './views/player/Player';
import PlayerPanel from './views/player/PlayerPanel';
import DownloadManager from './views/DownloadManager';

import * as constants from './constants';
import * as songFilesActions from './actions/songFiles';

const songsFolder
= `${RNFS.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

class Main extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    RNFS.mkdir(
      songsFolder,
      true
    )
      .then(() => {
        RNFS.readdir(songsFolder)
          .then(fileNames => {
            dispatch(
              songFilesActions.updateSongFiles(fileNames)
            );
          });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Port />
        <PlayerPanel />
        <Player />
        <DownloadManager />
      </View>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Main);
