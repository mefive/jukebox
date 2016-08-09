import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Image
} from 'react-native';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0
    };

    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  onScrollEnd(e) {
    const { width } = this.props;
    const { x } = e.nativeEvent.contentOffset;
    const { offset } = this.state;

    if (offset !== x) {
      this.state.offset = x;
      this.changPage(x / width);
    }
  }

  changPage(index) {
    this.props.onChange(index);
  }

  render() {
    const { index, width, height, dataSource } = this.props;
    const offset = index * width;

    return (
      <ScrollView
        automaticallyAdjustInsets={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={this.onScrollEnd}
        contentOffset={{ x: offset }}
      >
        {dataSource.map(i => (
          <Image
            key={i.id}
            source={{ uri: i.uri }}
            style={{ width, height }}
          />
        ))}
      </ScrollView>
    );
  }
}

Carousel.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func,
  index: PropTypes.number,
  ...View.propTypes
};

Carousel.defaultProps = {
  onChange: () => null
};
