import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';

import * as filesActions from '../actions/files';
import * as downloadActions from '../actions/download';
import * as constants from '../constants';

const songsFolder
= `${RNFS.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

class SongDownloadManager extends Component {
  componentDidUpdate() {
    const { downloading } = this.props;
    let { songs } = this.props;
    songs = songs.toJS();

    if (downloading) {
      console.log('in downloading');
      return;
    }

    let { queue } = this.props;
    queue = queue.toJS();

    const keys = Object.keys(queue);

    if (keys.length === 0) {
      console.log('no more to download');
      return;
    }

    const songId = keys[0];
    const song = queue[songId];

    const { dispatch } = this.props;
    const { fileName, url } = song;
    const songName = songs[songId].name;

    RNFS.downloadFile({
      fromUrl: url,
      toFile: `${songsFolder}${fileName}`
    })
      .then(({ statusCode }) => {
        console.log(statusCode);
        if (statusCode === 200) {
          console.log('download done');
          dispatch(
            filesActions.updateSongFiles([fileName])
          );

          alert(`download ${songName} succ`);
        }
        else {
          alert(`download ${songName} fail`);
        }

        dispatch(
          downloadActions.downloadSongDone(songId)
        );
      });

    console.log('download start', songId);
    dispatch(downloadActions.downloadSongStart);
  }

  render() {
    return null;
  }
}

SongDownloadManager.propTypes = {
  dispatch: PropTypes.func,
  downloading: PropTypes.bool,
  queue: PropTypes.object,
  songs: PropTypes.object
};

function mapStateToProp(state) {
  const songDownloadQueue = state.get('songDownloadQueue');

  return {
    downloading: songDownloadQueue.get('downloading'),
    queue: songDownloadQueue.get('queue'),
    songs: state.get('songs')
  };
}

export default connect(mapStateToProp)(SongDownloadManager);
