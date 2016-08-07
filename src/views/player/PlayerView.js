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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class PlayerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemWidth: 0
    };
  }

  getWidth() {
    const { width } = Dimensions.get('window');
    this.state.itemWidth = width;

    return this.state.itemWidth;
  }

  render() {
    const playlist = this.props.playlist.toJS();
    const songIds = playlist.songs;
    const songs = this.props.songs.toJS();

    const playlistSongs = [];

    for (const i of songIds) {
      playlistSongs.push(songs[i]);
    }

    let { itemWidth } = this.state;

    if (itemWidth === 0) {
      itemWidth = this.getWidth();
    }

    return (
      <ScrollView
        style={styles.container}
        horizontal
        pagingEnabled
      >
        {playlistSongs.map((i, j) => (
          <View
            key={i.id}
            style={{
              padding: 20
            }}
          >
            <Image
              source={{ uri: i.picUrl }}
              style={{
                width: itemWidth - 100,
                height: itemWidth
              }}
            />
          </View>
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
    songs: state.get('songs')
  };
}

export default connect(mapStateToProps)(PlayerView);
