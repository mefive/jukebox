import React, { PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Immutable from 'immutable';

import { connect } from 'react-redux';
import TabScenceView from '../../components/TabScenceView';
import LazyImage from '../common/LazyImage';

import * as songsActions from '../../actions/songs';
import * as playerActions from '../../actions/player';

import * as constants from '../../constants';
import * as color from '../../constants/color';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },

  songTitle: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 5
  },

  songName: {
    fontSize: 16,
    color: color.textDark
  }
});

class NewSongs extends TabScenceView {
  constructor(props) {
    super(props);

    this.measure = this.measure.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      width: 0
    };
  }

  getSongs() {
    let { ids, songs, albums, artists } = this.props;

    songs = songs.toJS();
    ids = ids.toJS();
    albums = albums.toJS();
    artists = artists.toJS();

    const rt = [];

    for (const i of ids) {
      const song = songs[i];
      const album = albums[song.albumId];
      const artist = artists[song.artistIds[0]];

      rt.push(Object.assign(
        song,
        { picUrl: album.picUrl, picId: album.picId, albumName: album.name },
        { artist }
      ));
    }

    return rt;
  }

  load() {
    const { ids, loading, dispatch } = this.props;

    if (ids.size !== 0 || loading) {
      return;
    }

    dispatch(songsActions.getNewSongs({}));
  }

  measure() {
    if (this.state.width) {
      return;
    }

    const { container } = this.refs;
    container.measure((x, y, width) => {
      this.setState({ width });
    });
  }

  play(songId) {
    const { dispatch, ids } = this.props;

    return () => {
      dispatch(
        playerActions.playSong({
          songId,
          playlistId: constants.PLAYLIST_NEW_SONG,
          playlist: ids.toJS()
        })
      );
    };
  }

  render() {
    const imageDimesion = 50;
    const { imageFiles, dispatch } = this.props;
    return (
      <View
        ref="container"
        onLayout={this.measure}
        style={{ flex: 1 }}
      >
        <ListView
          contentContainerStyle={[styles.container]}
          enableEmptySections
          showsVerticalScrollIndicator
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(this.getSongs())}
          renderRow={song => (
            <TouchableOpacity
              key={song.id}
              onPress={this.play(song.id)}
            >
              <View
                style={[styles.item]}
              >
                <LazyImage
                  url={song.picUrl}
                  picId={song.picId}
                  imageFiles={imageFiles}
                  style={{ width: imageDimesion, height: imageDimesion }}
                  dispatch={dispatch}
                />

                <View style={styles.songTitle}>
                  <Text
                    style={styles.songName}
                    numberOfLines={1}
                  >{song.name}</Text>

                  <Text
                    style={{ color: color.textLight }}
                    numberOfLines={1}
                  >{song.artist.name} - {song.albumName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

NewSongs.propTypes = {
  dispatch: PropTypes.func,
  ids: PropTypes.object,
  loading: PropTypes.bool,
  songs: PropTypes.object,
  albums: PropTypes.object,
  artists: PropTypes.object,
  isCurrentView: PropTypes.bool,
  imageFiles: PropTypes.instanceOf(Immutable.Map)
};

function mapStateToProps(state) {
  return {
    ids: state.getIn(['newSongs', 'ids']),
    loading: state.getIn(['newSongs', 'loading']),
    songs: state.get('songs'),
    albums: state.get('albums'),
    artists: state.get('artists'),
    imageFiles: state.get('imageFiles')
  };
}

export default connect(mapStateToProps)(NewSongs);
