import { Component, PropTypes } from 'react';
import {
  Alert,
  NativeModules,
  NativeAppEventEmitter
} from 'react-native';

import { connect } from 'react-redux';
const { Audio } = NativeModules;

import fs from 'react-native-fs';

import * as constants from '../../constants';
import * as filesActions from '../../actions/files';
import * as playerActions from '../../actions/player';

const songsFolder
= `${fs.CachesDirectoryPath}/${constants.SONG_FILES_FOLDER_NAME}/`;

const AUDIO_STATUS_INIT = 'INIT';
const AUDIO_STATUS_PLAYING = 'PLAYING';
const AUDIO_STATUS_PAUSED = 'PAUSED';
const AUDIO_STATUS_STOPPED = 'STOPPED';

class Player extends Component {
  constructor(props) {
    super(props);

    this.setDuration = this.setDuration.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);

    NativeAppEventEmitter.addListener(
      'AudioBridgeEvent',
      e => {
        const { status, duration } = e;

        if ([
          AUDIO_STATUS_PLAYING,
          AUDIO_STATUS_PAUSED,
          AUDIO_STATUS_STOPPED
        ].includes(status)) {
          if (!this.state.needChangeSong && status === AUDIO_STATUS_STOPPED) {
            this.props.dispatch(playerActions.pause);
            Alert.alert('提示', '播放失败');
          }

          if (status === AUDIO_STATUS_PLAYING) {
            this.setDuration(duration);
          }

          this.setState({ audioDeviceStatus: e.status });
        }
      }
    );

    this.state = {
      audioDeviceStatus: AUDIO_STATUS_INIT,
      needChangeSong: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.songId !== this.props.songId
      || nextProps.status !== this.props.status
      || nextState.audioDeviceStatus !== this.state.audioDeviceStatus;
  }

  componentWillUpdate(nextProps) {
    let { songs, songFiles } = nextProps;
    const { songId, status } = nextProps;

    songFiles = songFiles.toJS();
    songs = songs.toJS();

    const song = this.getSong(songId, songFiles, songs);

    if (nextProps.songId !== this.props.songId) {
      if (![AUDIO_STATUS_STOPPED, AUDIO_STATUS_INIT]
        .includes(this.state.audioDeviceStatus)) {
        this.state.needChangeSong = true;
        Audio.stop();
      }
      else {
        Audio.play(song);
        this.setDuration(0);
      }
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

  componentDidUpdate() {
    const { songId } = this.props;
    const { audioDeviceStatus, needChangeSong } = this.state;

    let { songs, songFiles } = this.props;

    songFiles = songFiles.toJS();
    songs = songs.toJS();

    const song = this.getSong(songId, songFiles, songs);

    if (audioDeviceStatus === AUDIO_STATUS_PLAYING) {
      if (!this.timer) {
        this.setCurrentTime();
      }
    }
    else {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    if (needChangeSong
      && audioDeviceStatus === AUDIO_STATUS_STOPPED
    ) {
      this.state.needChangeSong = false;
      Audio.play(song);
      this.setDuration(0);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  getSong(songId, songFiles, songs) {
    const { dispatch } = this.props;

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

    return `file://${absoluteFileName}`;
  }

  setDuration(duration = 0) {
    this.props.dispatch(
      playerActions.updateDuration(duration));
  }

  setCurrentTime() {
    Audio.getCurrentTime((error, event) => this.props.dispatch(
      playerActions.updateCurrentTime(event.progress)
    ));
    this.timer = setTimeout(this.setCurrentTime, 1000);
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
