import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { VibrancyView } from 'react-native-blur';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class User extends Component {
  render() {
    const uri = 'http://p4.music.126.net/83zQvZQTGrT4BTm5JiMbBA==/18289276416663628.jpg';

    return (
      <Image
        source={{ uri }}
        style={styles.container}
      >
        <VibrancyView blurType="light" style={{ flex: 1 }}>
          <Text>Hi, I am a tiny menu item</Text>
        </VibrancyView>
      </Image>
    );
  }
}

User.propTypes = {
  ...View.propTypes
};

export default connect()(User);
