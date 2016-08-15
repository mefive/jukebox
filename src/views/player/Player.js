import React, { Component, PropTypes } from 'react';
import {
  NativeModules,
} from 'react-native';

import { connect } from 'react-redux';
const { Audio } = NativeModules;

import fs from 'react-native-fs';

import * as constants from '../../constants';
import * as filesActions from '../../actions/files';
import * as playerActions from '../../actions/player';

const songsFolder
= `${fs.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

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

  componentWillUpdate(nextProps) {
    let { songs, songFiles } = nextProps;
    const { songId, status } = nextProps;

    songFiles = songFiles.toJS();
    songs = songs.toJS();

    const song = this.getSong(songId, songFiles, songs);
    console.log(song);

    if (nextProps.songId !== this.props.songId) {
      Audio.stop();
      Audio.play(song);
      return;
    }

    if (status !== this.props.status) {
      if (status === constants.PLAYER_STATUS_PLAYING) {
        Audio.resume();
      }
      else {
        Audio.pause();
      }
    }
  }

  getSong(songId, songFiles, songs) {
    const { dispatch } = this.props;

    const song = songs[songId];

    if (!song) {
      return null;
    }

    const { hMusicId, hMp3Url } = song;
console.log(song);
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

    return `file://${absoluteFileName}`;
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
    return null;
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
