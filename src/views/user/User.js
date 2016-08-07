import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 0;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 2;

class User extends Component {
  render() {
    const playlist = this.props.playlist.toJS();
    const songIds = playlist.songs;
    const songs = this.props.songs.toJS();

    const playlistSongs = [];

    for (const i of songIds) {
      playlistSongs.push(songs[i]);
    }

    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustInsets={false}
        horizontal
        decelerationRate={0}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: CARD_PREVIEW_WIDTH
        }}
      >
        {playlistSongs.map((i, j) => (
          <Image
            key={i.id}
            source={{ uri: i.picUrl }}
            style={{
              flex: 1,
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

User.propTypes = {
  ...View.propTypes
};

function mapStateToProps(state) {
  return {
    playlist: state.get('playlist'),
    songs: state.get('songs')
  };
}

export default connect(mapStateToProps)(User);
