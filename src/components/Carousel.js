import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image
} from 'react-native';

const PRELOAD_COUNT = 1;

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      loadMap: {}
    };

    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  componentWillMount() {
    this.preload(this.props);
  }

  componentWillUpdate(nextProps) {
    this.preload(nextProps);
  }

  onScrollEnd(e) {
    const { width } = this.props;
    const { x } = e.nativeEvent.contentOffset;
    const { offset } = this.state;

    if (offset !== x) {
      this.state.offset = x;
      this.changPage(Math.ceil(x / width));
    }
  }

  changPage(index) {
    this.props.onChange(index);
  }

  preload({ index, dataSource }) {
    const { preloadCount } = this.props;

    const count = dataSource.length || 1;
    const min = Math.max(0, index - preloadCount);
    const max = Math.min(count - 1, index + preloadCount);
    for (let i = min; i <= max; i++) {
      this.state.loadMap[i] = true;
    }
  }

  render() {
    const { index, width, height, dataSource } = this.props;
    const { loadMap } = this.state;
    const offset = index * width;

    return (
      <View style={{ height }}>
        <ScrollView
          automaticallyAdjustInsets={false}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.onScrollEnd}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: offset }}
        >
          {dataSource.map((i, j) => {
            if (loadMap[j]) {
              return (
                <View key={i.id}>
                  <Image
                    source={{ uri: i.uri }}
                    style={{ width, height }}
                  />
                </View>
              );
            }

            return (
              <View
                key={i.id}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width, height
                }}
              >
                <Text>loading</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

Carousel.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func,
  index: PropTypes.number,
  preloadCount: PropTypes.number,
  ...View.propTypes
};

Carousel.defaultProps = {
  onChange: () => null,
  preloadCount: PRELOAD_COUNT,
  index: 0,
  dataSource: []
};
