import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../lib/scrollableTabBar/TabBar';
import * as color from '../../constants/color';

import NewAlbums from './NewAlbums';
import NewSongs from './NewSongs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabBar: {
    height: 40,
    backgroundColor: color.blue
  },

  tab: {
    paddingBottom: 5
  }
});

const NEW_ALBUMS_VIEW = 0;
const NEW_SONGS_VIEW = 1;
const HOT_VIEW = 2;
const PLAYLIST_VIEW = 3;
const DJ_VIEW = 4;

const viewLabels = {
  [NEW_ALBUMS_VIEW]: '新碟',
  [NEW_SONGS_VIEW]: '新曲',
  [HOT_VIEW]: '热门',
  [PLAYLIST_VIEW]: '歌单',
  [DJ_VIEW]: 'DJ'
};

export default class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: NEW_SONGS_VIEW
    };
  }

  changeTab(index) {
    if (this.state.currentView !== index) {
      this.setState({ currentView: index });
    }
  }

  render() {
    const { style } = this.props;
    const { currentView } = this.state;

    return (
      <ScrollableTabView
        style={[styles.container, style]}
        tabBarInactiveTextColor={color.white}
        tabBarUnderlineColor={color.primary}
        tabBarProps={{ style: styles.tabBar }}
        renderTabBar={() => (
          <TabBar
            style={styles.tabBar}
            tabStyle={styles.tab}
            underlineHeight={2}
            activeTextColor={color.white}
            inactiveTextColor={color.text}
          />
        )}
        initialPage={NEW_SONGS_VIEW}
        onChangeTab={change => {
          this.changeTab(change.i);
        }}
      >
        <NewAlbums
          tabLabel={viewLabels[NEW_ALBUMS_VIEW]}
          isCurrentView={currentView === NEW_ALBUMS_VIEW}
        />
        <NewSongs
          tabLabel={viewLabels[NEW_SONGS_VIEW]}
          isDefaultView
          isCurrentView={currentView === NEW_SONGS_VIEW}
        />
        <View
          tabLabel={viewLabels[HOT_VIEW]}
          isCurrentView={currentView === HOT_VIEW}
        />
        <View
          tabLabel={viewLabels[PLAYLIST_VIEW]}
          isCurrentView={currentView === PLAYLIST_VIEW}
        />
        <View
          tabLabel={viewLabels[DJ_VIEW]}
          isCurrentView={currentView === DJ_VIEW}
        />
      </ScrollableTabView>
    );
  }
}

Discover.propTypes = {
  ...View.propTypes
};
