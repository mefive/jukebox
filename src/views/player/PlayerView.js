import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

const CARD_PREVIEW_WIDTH = 0;
const CARD_MARGIN = 0;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 2;

class PlayerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0
    };

    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  onScrollEnd(e) {
    const { x } = e.nativeEvent.contentOffset;
    const { offset } = this.state;

    if (offset !== x) {
      this.state.offset = x;
      this.changSong(x / (CARD_WIDTH + CARD_MARGIN * 2));
    }
  }

  changSong(index) {
    console.log('changSong: ', index);
  }

  render() {
    const { songId } = this.props;
    const playlist = this.props.playlist.toJS();
    const songIds = playlist.songs;
    const songs = this.props.songs.toJS();

    const playlistSongs = [];

    for (const i of songIds) {
      playlistSongs.push(songs[i]);
    }

    const index = playlistSongs.findIndex(i => i.id === songId);
    const offset = (CARD_WIDTH + CARD_MARGIN * 2) * index;

    this.state.offset = offset;

    return (
      <ScrollView
        automaticallyAdjustInsets={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={this.onScrollEnd}
        ref="swiper"
        contentOffset={{ x: offset }}
      >
        {playlistSongs.slice(0, 10).map(i => (
          <Image
            key={i.id}
            source={{ uri: i.picUrl }}
            style={{
              backgroundColor: '#ccc',
              width: CARD_WIDTH,
              margin: CARD_MARGIN,
              height: CARD_WIDTH,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        ))}
      </ScrollView>
    );
  }
}

PlayerView.propTypes = {
  ...View.propTypes
};

function mapStateToProps(state) {
  return {
    playlist: state.get('playlist'),
    songs: state.get('songs'),
    songId: state.getIn(['player', 'songId'])
  };
}

export default connect(mapStateToProps)(PlayerView);
