import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from '../../components/Carousel';
import * as playerActions from '../../actions/player';
import * as color from '../../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';

const COVER_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  }
});

class PlayerView extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.back = this.back.bind(this);

    this.state = {
      playlist: [],
      songs: [],
      ready: false
    };
  }

  componentWillMount() {
    this.setStateByProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateByProps(nextProps);

    if (nextProps.onRouting === false
      && this.props.onRouting === true
    ) {
      this.state.ready = true;
    }
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.onRouting;
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
    const { dispatch } = this.props;
    dispatch(playerActions.playSong({ songId }));
  }

  back() {
    const { navigator } = this.props;
    navigator.pop();
  }

  render() {
    const { playlist, songs } = this.state;
    const { songId } = this.props;

    const playlistSongs = [];

    for (const i of playlist) {
      playlistSongs.push(songs[i]);
    }

    let index = playlist.findIndex(i => i === songId);
    const song = songs[songId];

    let dataSource;

    if (this.state.ready) {
      dataSource
      = playlistSongs.map(i => ({ uri: i.picUrl, id: i.id }));
    }
    else {
      dataSource
      = [{ uri: song.picUrl, id: song.id }];

      index = 0;
    }

    return (
      <View
        style={[
          styles.container
        ]}
      >
        <Carousel
          index={index}
          width={COVER_WIDTH}
          height={COVER_WIDTH}
          dataSource={dataSource}
          onChange={this.onChange}
        />

        <Text>{song.name}</Text>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            height: 60
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 25,
              marginLeft: 10
            }}
            onPress={this.back}
          >
            <Icon
              name="ios-arrow-down" size={30}
              style={{
                color: color.white
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PlayerView.propTypes = {
  ...View.propTypes,
  navigator: PropTypes.object
};

function mapStateToProps(state) {
  return {
    playlist: state.getIn(['playlist', 'songs']),
    songs: state.get('songs'),
    songId: state.getIn(['player', 'songId']),
    onRouting: state.getIn(['appStatus', 'onRouting'])
  };
}

export default connect(mapStateToProps)(PlayerView);
