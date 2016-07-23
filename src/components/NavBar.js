import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede'
  },
  button: {
    paddingLeft: 15,
    paddingTop: 6,
    paddingRight: 30
  }
});

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.back = this.back.bind(this);
  }

  back() {
    const { navigator } = this.props;
    navigator.pop();
  }

  render() {
    const { title, hasBorder, iconName } = this.props;

    return (
      <View
        style={[
          styles.container,
          hasBorder && styles.bottomBorder
        ]}
      >
        <NavigationBar
          title={{ title }}
          leftButton={
            <TouchableOpacity
              style={styles.button}
              onPress={this.back}
            >
              <Icon name={iconName} size={30} color="#999" />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

NavBar.propTypes = {
  navigator: PropTypes.object.isRequired,
  title: PropTypes.string,
  hasBorder: PropTypes.bool,
  iconName: PropTypes.string
};

NavBar.defaultProps = {
  title: '',
  hasBorder: true,
  iconName: 'ios-arrow-back'
};
