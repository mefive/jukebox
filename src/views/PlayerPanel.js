import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import * as color from '../constants/color';
import * as constants from '../constants';
import * as playerActions from '../actions/player';

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
    flex: 1
  },

  actionButton: {
    borderColor: color.primary,
    borderWidth: 1,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },

  actionIcon: {
    color: color.primary
  }
});

class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.doAction = this.doAction.bind(this);
  }

  getIcon() {
    const { status } = this.props;

    if (status === constants.PLAYER_STATUS_PLAYING) {
      return (
        <Icon
          name="md-pause"
          size={20}
          style={[styles.actionIcon, { marginTop: 2 }]}
        />
      );
    }

    return (
      <Icon
        name="md-play"
        size={20}
        style={[styles.actionIcon, { marginLeft: 3, marginTop: 2 }]}
      />
    );
  }

  pause() {
    this.props.dispatch(playerActions.pause);
  }

  play() {
    const { songId, dispatch } = this.props;
    dispatch(playerActions.playSong(songId));
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

  render() {
    if (!this.props.songId) {
      return null;
    }

    return (
      <View style={styles.container}>
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
    );
  }
}

PlayerPanel.propTypes = {
  dispatch: PropTypes.func,
  songId: PropTypes.number,
  status: PropTypes.string,
  songs: PropTypes.object,
  albums: PropTypes.object,
  artists: PropTypes.object
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
    albums: state.get('albums')
  };
}

export default connect(mapStateToProps)(PlayerPanel);
