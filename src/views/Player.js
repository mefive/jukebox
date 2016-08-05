import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';

import Video from 'react-native-video';
import RNFS from 'react-native-fs';

import * as constants from '../constants';
import * as songFilesActions from '../actions/songFiles';

const songsFolder
= `${RNFS.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

class Player extends Component {
  getSong(songId, songFiles) {
    const { dispatch } = this.props;

    let { songs } = this.props;
    songs = songs.toJS();

    const song = songs[songId];

    if (!song) {
      return null;
    }

    const { lMusicId, mp3Url } = song;
    const fileName = `${lMusicId}.mp3`;
    const absoluteFileName = `${songsFolder}${fileName}`;
    const hasFile = songFiles.includes(fileName);

    if (!hasFile) {
      RNFS.downloadFile({
        fromUrl: mp3Url,
        toFile: absoluteFileName
      })
        .then(({ statusCode }) => {
          console.log(song.name, statusCode);

          if (statusCode === 200) {
            dispatch(
              songFilesActions.updateSongFiles([fileName])
            );
          }
        });

      return mp3Url;
    }
    return absoluteFileName;
  }

  render() {
    let { songFiles, player } = this.props;

    songFiles = songFiles.toJS();
    player = player.toJS();

    const { songId, status } = player;
    const song = this.getSong(songId, songFiles);

    console.log(song);

    return (
      <View style={{ height: 0 }}>
        {song
        ? (
          <Video
            source={{ uri: song }}
            paused={status !== constants.PLAYER_STATUS_PLAYING}
            onLoad={(e) => console.log('onload', e)}
            ref="player"
          />
        )
        : null}
      </View>
    );
  }
}

Player.propTypes = {
  dispatch: PropTypes.func,
  songFiles: PropTypes.object,
  player: PropTypes.object,
  songs: PropTypes.object
};

function mapStateToProps(state) {
  const songFiles = state.get('songFiles');
  const player = state.get('player');
  const songs = state.get('songs');

  return {
    songFiles,
    player,
    songs
  };
}

export default connect(mapStateToProps)(Player);
