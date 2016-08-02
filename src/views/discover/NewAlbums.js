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
import * as albumsAction from '../../actions/albums';
import * as color from '../../constants/color';

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
    marginBottom: 20,
    padding: 5,
    flex: 1
  },

  itemPrimaryTitle: {
    marginTop: 10
  },

  itemSecondaryTitle: {
    color: color.textLight
  }
});

class NewAlbums extends TabScenceView {
  constructor(props) {
    super(props);

    this.measure = this.measure.bind(this);

    this.state = {
      width: 0
    };
  }

  getAlbums() {
    let { albums, ids } = this.props;

    ids = ids.toJS();
    albums = albums.toJS();

    const rt = [];

    for (const i of ids) {
      rt.push(albums[i]);
    }

    return rt.slice(0, 10);
  }

  load() {
    const { ids, loading, dispatch } = this.props;

    if (ids.size !== 0 || loading) {
      return;
    }

    dispatch(albumsAction.getNewAlbums({}));
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
    const itemWidth = (width / 2);
    const imageDimesion = itemWidth - 10;

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
          dataSource={ds.cloneWithRows(this.getAlbums())}
          renderRow={album => (
            <View
              style={[styles.item, { width: itemWidth }]}
              key={album.id}
            >
              <Image
                source={{ uri: album.picUrl }}
                style={{ width: imageDimesion, height: imageDimesion }}
              />

              <Text
                style={styles.itemPrimaryTitle}
                numberOfLines={2}
              >{album.name}</Text>

              <Text
                style={styles.itemSecondaryTitle}
                numberOfLines={1}
              >{album.artist.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

NewAlbums.propTypes = {
  dispatch: PropTypes.func,
  ids: PropTypes.object,
  albums: PropTypes.object,
  loading: PropTypes.bool,
  isCurrentView: PropTypes.bool
};

function mapStateToProps(state) {
  const ids = state.getIn(['newAlbums', 'ids']);
  const albums = state.get('albums');
  const loading = state.getIn(['newAlbums', 'loading']);

  return {
    ids,
    albums,
    loading
  };
}

export default connect(mapStateToProps)(NewAlbums);
