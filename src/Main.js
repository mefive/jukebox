import React, { Component, PropTypes } from 'react';
import { View, Navigator } from 'react-native';
import { connect } from 'react-redux';

import RNFS from 'react-native-fs';

import Port from './views/Port';
import Player from './views/player/Player';
import PlayerView from './views/player/PlayerView';
import SongDownloadManager from './views/SongDownloadManager';

import * as constants from './constants';
import * as navigation from './constants/navigation';
import * as filesActions from './actions/files';
import * as appStatusAction from './actions/appStatus';

const songsFolder
= `${RNFS.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

const imagesFolder
= `${RNFS.CachesDirectoryPath}/${constants.IMAGE_FILES_FOLDER_NAME}/`;

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
              filesActions.updateSongFiles(fileNames)
            );
          });
      });

    RNFS.mkdir(
      imagesFolder,
      true
    )
      .then(() => {
        RNFS.readdir(imagesFolder)
          .then(fileNames => {
            dispatch(
              filesActions.updateImageFiles(fileNames)
            );
          });
      });
  }

  render() {
    const { dispatch } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Navigator
          style={{ flex: 1 }}
          initialRoute={navigation.ROUTE_PORT}
          onWillFocus={() => {
            dispatch(appStatusAction.startNavigation());
          }}
          onDidFocus={() => {
            dispatch(appStatusAction.endNavigation());
          }}
          configureScene={route => {
            switch (route.index) {
              case navigation.ROUTE_PLAY.index:
                return Navigator.SceneConfigs.FloatFromBottom;

              default:
                return Navigator.SceneConfigs.PushFromRight;
            }
          }}
          renderScene={(route, navigator) => {
            const { index, passProps } = route;

            switch (index) {
              case navigation.ROUTE_PORT.index:
                return (
                  <Port
                    navigator={navigator}
                  />
                );

              case navigation.ROUTE_PLAY.index: {
                return (
                  <PlayerView navigator={navigator} {...passProps} />
                );
              }

              default:
                return null;
            }
          }}
        />
        <Player />
        <SongDownloadManager />
      </View>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Main);
