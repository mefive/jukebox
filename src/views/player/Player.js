import React, { Component, PropTypes } from 'react';
import {
  View
} from 'react-native';

import { connect } from 'react-redux';

import Video from 'react-native-video';
import RNFS from 'react-native-fs';

import * as constants from '../../constants';
import * as filesActions from '../../actions/files';
import * as playerActions from '../../actions/player';

const songsFolder
= `${RNFS.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

class Player extends Component {
  constructor(props) {
    super(props);

    this.setDuration = this.setDuration.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.songId !== this.props.songId
      || nextProps.status !== this.props.status;
  }

  getSong(songId, songFiles) {
    const { dispatch } = this.props;

    let { songs } = this.props;
    songs = songs.toJS();

    const song = songs[songId];

    if (!song) {
      return null;
    }

    const { hMusicId, hMp3Url } = song;

    const fileName = `${hMusicId}.mp3`;
    const absoluteFileName = `${songsFolder}${fileName}`;
    const songFile = songFiles[fileName];
    if (!songFile) {
      setTimeout(() => {
        if (this.props.songId === songId) {
          dispatch(filesActions.downloadSong({
            songId, fileName, url: hMp3Url
          }));
        }
      }, 5000);

      return hMp3Url;
    }
    else if (songFile.donwloading) {
      return hMp3Url;
    }

    return absoluteFileName;
  }

  setDuration({ duration }) {
    this.props.dispatch(
      playerActions.updateDuration(duration));
  }

  setCurrentTime({ currentTime }) {
    this.props.dispatch(
      playerActions.updateCurrentTime(currentTime)
    );
  }

  playNext() {
    const { dispatch } = this.props;
    dispatch(playerActions.playNext());
  }

  render() {
    let { songFiles } = this.props;
    const { songId, status } = this.props;

    songFiles = songFiles.toJS();

    const song = this.getSong(songId, songFiles);

    return (
      <View style={{ height: 0 }}>
        {song
        ? (
          <Video
            source={{ uri: song }}
            paused={status !== constants.PLAYER_STATUS_PLAYING}
            onLoad={this.setDuration}
            onProgress={this.setCurrentTime}
            playInBackground
            playWhenInactive
            onEnd={this.playNext}
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
  songId: PropTypes.number,
  status: PropTypes.string,
  songs: PropTypes.object
};

function mapStateToProps(state) {
  const songFiles = state.get('songFiles');
  const player = state.get('player');
  const songs = state.get('songs');

  return {
    songFiles,
    songId: player.get('songId'),
    status: player.get('status'),
    songs
  };
}

export default connect(mapStateToProps)(Player);
