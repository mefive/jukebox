import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from '../../components/Carousel';
import * as playerActions from '../../actions/player';

const COVER_WIDTH = Dimensions.get('window').width;

class PlayerView extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = {
      playlist: [],
      songs: []
    };
  }

  componentWillMount() {
    this.setStateByProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateByProps(nextProps);
  }

  onChange(index) {
    const { playlist } = this.state;
    const songId = playlist[index];
    this.play(songId);
  }

  setStateByProps(props) {
    this.state.playlist = props.playlist.toJS();
    this.state.songs = props.songs.toJS();
  }

  play(songId) {
    console.log('playSong', songId);
    const { dispatch } = this.props;
    dispatch(playerActions.playSong({ songId }));
  }

  render() {
    const { playlist, songs } = this.state;
    const { songId } = this.props;

    const playlistSongs = [];

    for (const i of playlist) {
      playlistSongs.push(songs[i]);
    }

    const index = playlist.findIndex(i => i === songId);

    return (
      <Carousel
        index={index}
        width={COVER_WIDTH}
        height={COVER_WIDTH}
        dataSource={
          playlistSongs.map(i => ({ uri: i.picUrl, id: i.id })).slice(0, 10)
        }
        onChange={this.onChange}
      />
    );
  }
}

PlayerView.propTypes = {
  ...View.propTypes
};

function mapStateToProps(state) {
  return {
    playlist: state.getIn(['playlist', 'songs']),
    songs: state.get('songs'),
    songId: state.getIn(['player', 'songId'])
  };
}

export default connect(mapStateToProps)(PlayerView);
