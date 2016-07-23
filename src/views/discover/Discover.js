import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../lib/scrollableTabBar/TabBar';
import * as color from '../../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabBar: {
    height: 40
  },

  tab: {
    paddingBottom: 5
  }
});

export default class Discover extends Component {
  getText() {
    return '123';
  }

  render() {
    const { style } = this.props;

    return (
      <ScrollableTabView
        style={[styles.container, style]}
        tabBarUnderlineColor={color.primary}
        tabBarProps={{
          style: styles.tabBar
        }}
        renderTabBar={() => (
          <TabBar
            style={styles.tabBar}
            tabStyle={styles.tab}
            underlineHeight={2}
            activeTextColor={color.primary}
            inactiveTextColor={color.text}
          />
        )}
      >
        <View tabLabel="新碟新曲" />
        <View tabLabel="热门" />
        <View tabLabel="歌单" />
        <View tabLabel="DJ" />
      </ScrollableTabView>
    );
  }
}

Discover.propTypes = {
  ...View.propTypes
};
