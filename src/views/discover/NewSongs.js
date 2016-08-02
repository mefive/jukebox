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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'flex-start'
  },

  item: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1
  },

  itemTitle: {
    marginTop: 10
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
        { pic: album.picUrl }
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

  render() {
    const { width } = this.state;
    const songWidth = (width / 2);
    const imageDimesion = songWidth - 10;

    return (
      <View
        ref="container"
        onLayout={this.measure}
        style={{ flex: 1 }}
      >
        <ListView
          contentContainerStyle={[styles.container, { width }]}
          enableEmptySections
          showsVerticalScrollIndicator
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(this.getSongs())}
          renderRow={song => (
            <View
              style={[styles.item, { width: songWidth }]}
              key={song.id}
            >
              <Image
                source={{ uri: song.pic }}
                style={{ width: imageDimesion, height: imageDimesion }}
              />
              <Text style={styles.itemTitle}>{song.name}</Text>
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
