import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as albumsAction from './actions/albums';
import * as songsAction from './actions/songs';

import Port from './views/Port';

class Main extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(albumsAction.getNewAlbums({}));
    dispatch(songsAction.getNewSongs({}));
  }

  render() {
    return (
      <View />
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Main);
