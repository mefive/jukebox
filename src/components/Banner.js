/*
 * @providesModule components/Banner
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Dimensions,
  Image
} from 'react-native';
// import Carousel from '../lib/Carousel';
import Swiper from 'react-native-swiper';
import * as constans from '../constans';
import * as utils from '../utils';

export default class Banner extends Component {
  getDimension() {
    const dimensions = Dimensions.get('window');
    const { width } = dimensions;

    const height
    = this.props.height || utils.divide(width, this.props.aspectRatio);

    return { width, height };
  }

  render() {
    const dimension = this.getDimension();
    const { style } = this.props;

    return (
      <View style={[style]}>
        <Swiper
          width={dimension.width}
          height={dimension.height}
          autoplay
        >
          {this.props.dataSource.map(data => (
            <Image
              ref="banner"
              source={{ uri: data.uri }}
              style={{
                width: dimension.width,
                height: dimension.height
              }}
              key={data.uri}
            />
          ))}
        </Swiper>
      </View>
    );
  }
}

Banner.propTypes = {
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  dataSource: PropTypes.array,
  aspectRatio: PropTypes.number
};

Banner.defaultProps = {
  style: {},
  width: 0,
  height: 0,
  dataSource: [],
  aspectRatio: constans.HOME_BANNER_ASPECT_RATIO
};
