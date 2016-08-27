import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as color from '../../constants/color';
import * as constants from '../../constants';
import * as navigation from '../../constants/navigation';
import * as playerActions from '../../actions/player';

import PlayerPanelSongInfo from './PlayerPanelSongInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.white,
    alignItems: 'center',
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: -1,
      width: 0
    }
  },

  action: {
    flex: 1,
    position: 'relative'
  },

  actionButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },

  actionIcon: {
    color: color.primary
  }
});

class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.doAction = this.doAction.bind(this);
    this.goPlayerView = this.goPlayerView.bind(this);

    this.state = {
      width: Dimensions.get('window').width
    };
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.onRouting;
  }

  getIcon() {
    const { status } = this.props;

    if (status === constants.PLAYER_STATUS_PLAYING) {
      return (
        <Icon
          name="pause-circle"
          size={30}
          style={[styles.actionIcon]}
        />
      );
    }

    return (
      <Icon
        name="play-circle"
        size={30}
        style={[styles.actionIcon]}
      />
    );
  }

  pause() {
    this.props.dispatch(playerActions.pause);
  }

  play() {
    const { songId, dispatch } = this.props;
    const playlist = this.props.playlist.toJS();

    dispatch(playerActions.playSong({
      songId,
      playlistId: playlist.id,
      playlist: playlist.songs
    }));
  }

  doAction() {
    const { status } = this.props;
    if (status === constants.PLAYER_STATUS_PLAYING) {
      this.pause();
    }
    else {
      this.play();
    }
  }

  goPlayerView() {
    const { navigator } = this.props;
    navigator.push(navigation.ROUTE_PLAY);
  }

  render() {
    if (!this.props.songId) {
      return null;
    }

    const { duration, currentTime } = this.props;
    const { width } = this.state;

    const percent = duration
      ? (currentTime / duration)
      : 0;

    return (
      <TouchableWithoutFeedback
        onPress={this.goPlayerView}
      >
        <View style={styles.container}>
          <View
            style={{
              height: 2,
              width: (width * percent),
              backgroundColor: color.primary,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          <View style={styles.action}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={this.doAction}
              delayPressIn={0}
              delayPressOut={0}
            >
              {this.getIcon()}
            </TouchableOpacity>
          </View>

          <PlayerPanelSongInfo
            {...this.props}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

PlayerPanel.propTypes = {
  navigator: PropTypes.object,
  dispatch: PropTypes.func,
  songId: PropTypes.number,
  status: PropTypes.string,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  songs: PropTypes.object,
  albums: PropTypes.object,
  artists: PropTypes.object,
  playlist: PropTypes.object
};

function mapStateToProps(state) {
  const player = state.get('player');

  return {
    songId: player.get('songId'),
    status: player.get('status'),
    duration: player.get('duration'),
    currentTime: player.get('currentTime'),
    songs: state.get('songs'),
    artists: state.get('artists'),
    albums: state.get('albums'),
    playlist: state.get('playlist'),
    onRouting: state.getIn(['appStatus', 'onRouting'])
  };
}

export default connect(mapStateToProps)(PlayerPanel);
