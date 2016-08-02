import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../lib/scrollableTabBar/TabBar';
import * as color from '../../constants/color';

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

const NEW_SONGS_VIEW = 0;
const HOT_VIEW = 1;
const PLAYLIST_VIEW = 2;
const DJ_VIEW = 3;

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
        onChangeTab={change => {
          this.changeTab(change.i);
        }}
      >
        <NewSongs
          tabLabel="新碟新曲"
          isCurrentView={currentView === NEW_SONGS_VIEW}
        />
        <View
          tabLabel="热门"
          isCurrentView={currentView === HOT_VIEW}
        />
        <View
          tabLabel="歌单"
          isCurrentView={currentView === PLAYLIST_VIEW}
        />
        <View
          tabLabel="DJ"
          isCurrentView={currentView === DJ_VIEW}
        />
      </ScrollableTabView>
    );
  }
}

Discover.propTypes = {
  ...View.propTypes
};
