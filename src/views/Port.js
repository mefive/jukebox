import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import * as color from '../constants/color';

import Discover from './discover/Discover';
import User from './user/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  tabTitle: {
    paddingLeft: 18,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 30,
    zIndex: 1
  },

  tabTitleText: {
    color: '#fff',
    fontSize: 18
  },

  tabBar: {
    backgroundColor: color.darkBlue,
    top: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: 64,
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 19
  },

  tab: {
    flex: 0,
    paddingBottom: 0,
    width: 30,
    marginLeft: 15
  },

  icon: {
    color: '#fff'
  },

  selectedIcon: {
    color: 'rgba(255, 255, 255, 0.5)'
  },

  scence: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 0
  }
});

const USER_VIEW = 'user_view';
const DISCOVER_VIEW = 'discover_view';

const viewTitles = {
  [USER_VIEW]: '我的音乐',
  [DISCOVER_VIEW]: '发现音乐'
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: DISCOVER_VIEW
    };
  }

  getIcon(view, selected) {
    return () => {
      let name;

      switch (view) {
        case USER_VIEW:
          name = 'md-headset';
          break;

        case DISCOVER_VIEW:
          name = 'md-musical-notes';
          break;

        default:
          name = 'md-headset';
      }

      return (
        <Icon
          name={name}
          style={selected ? styles.icon : styles.selectedIcon}
          size={30}
        />
      );
    };
  }

  render() {
    const { selectedTab } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.tabTitle}>
          <Text style={styles.tabTitleText}>
            {viewTitles[selectedTab]}</Text>
        </View>

        <TabNavigator tabBarStyle={styles.tabBar} sceneStyle={styles.scence} >
          <TabNavigator.Item
            selected={selectedTab === USER_VIEW}
            renderIcon={this.getIcon(USER_VIEW, false)}
            renderSelectedIcon={this.getIcon(USER_VIEW, true)}
            onPress={() => this.setState({ selectedTab: USER_VIEW })}
            tabStyle={styles.tab}
          >
            <User />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === DISCOVER_VIEW}
            renderIcon={this.getIcon(DISCOVER_VIEW, false)}
            renderSelectedIcon={this.getIcon(DISCOVER_VIEW, true)}
            onPress={() => this.setState({ selectedTab: DISCOVER_VIEW })}
            tabStyle={styles.tab}
          >
            <Discover />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
