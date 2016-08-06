import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

import * as color from '../constants/color';
import _ from 'lodash';

export default class PlayerPanelSongInfo extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.songId !== this.props.songId;
  }

  getSongInfo() {
    const { songId } = this.props;
    let { songs, albums, artists } = this.props;

    songs = songs.toJS();
    albums = albums.toJS();
    artists = artists.toJS();

    const song = songs[songId];

    song.artistName
    = _.values(_.pick(artists, song.artistIds))
      .map(i => i.name).join('/');

    song.picUrl = albums[song.albumId].picUrl;

    return song;
  }

  render() {
    const song = this.getSongInfo();

    return (
      <View
        style={{
          flex: 5,
          flexDirection: 'row',
        }}
      >
        <Image
          source={{ uri: song.picUrl }}
          style={{
            width: 40,
            height: 40
          }}
        />

        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
            numberOfLines={1}
          >{song.name}</Text>
          <Text
            style={{
              color: color.textLight,
              fontSize: 12
            }}
            numberOfLines={1}
          >{song.artistName}</Text>
        </View>
      </View>
    );
  }
}

PlayerPanelSongInfo.propTypes = {
  songId: PropTypes.number,
  songs: PropTypes.object,
  albums: PropTypes.object,
  artists: PropTypes.object
};
