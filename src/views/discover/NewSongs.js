import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  ListView,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import TabScenceView from '../../components/TabScenceView';
import * as songsActions from '../../actions/songs';

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
  }
});

class NewSongs extends TabScenceView {
  constructor(props) {
    super(props);

    this.measure = this.measure.bind(this);

    this.state = {
      width: 0
    };
  }

  getSongs() {
    let { songs, albums, ids } = this.props;

    songs = songs.toJS();
    ids = ids.toJS();
    albums = albums.toJS();

    const rt = [];

    for (const i of ids) {
      const song = songs[i];
      const album = albums[song.albumId];

      rt.push(Object.assign(
        song,
        { pic: album.picUrl, albumName: album.name }
      ));
    }

    return rt.slice(0, 10);
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

  render() {
    const imageDimesion = 40;

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
            <View
              style={[styles.item]}
              key={song.id}
            >
              <Image
                source={{ uri: song.pic }}
                style={{ width: imageDimesion, height: imageDimesion }}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: 10,
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={{}}
                >{song.name}</Text>

                <Text
                  style={{}}
                >{song.artist[0].name} - {song.albumName}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

NewSongs.propTypes = {
  dispatch: PropTypes.func,
  ids: PropTypes.object,
  songs: PropTypes.object,
  albums: PropTypes.object,
  loading: PropTypes.bool,
  isCurrentView: PropTypes.bool
};

function mapStateToProps(state) {
  const ids = state.getIn(['newSongs', 'ids']);
  const songs = state.get('songs');
  const albums = state.get('albums');
  const loading = state.getIn(['newSongs', 'loading']);

  return {
    ids,
    songs,
    albums,
    loading
  };
}

export default connect(mapStateToProps)(NewSongs);
