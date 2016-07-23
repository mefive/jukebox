import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import commonStyle from '../styles/common';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  numberButtonContainer: {
    borderWidth: 1,
    borderColor: '#999'
  },

  numberButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },

  disabled: {
    color: 'rgba(0, 0, 0, 0.2)'
  }
});

export default class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  onBlur(e) {
    const { text } = e.nativeEvent;
    this.changeValue(+text);
  }

  getReach() {
    const { value, minValue, maxValue } = this.props;

    return {
      reachMin: value === minValue,
      reachMax: value === maxValue
    };
  }

  increase() {
    const { value } = this.props;
    this.changeValue(value + 1);
  }

  decrease() {
    const { value } = this.props;
    this.changeValue(value - 1);
  }

  changeValue(value) {
    const { onChange } = this.props;
    onChange(this.formatValue(value));
  }

  formatValue(value) {
    const { minValue, maxValue } = this.props;
    let result = isNaN(value) ? minValue : value;

    if (!isNaN(minValue)) {
      result = Math.max(minValue, result);
    }

    if (!isNaN(maxValue)) {
      result = Math.min(maxValue, result);
    }

    return result;
  }

  render() {
    const { value } = this.props;
    const { reachMax, reachMin } = this.getReach();

    return (
      <View
        style={[commonStyle.horizontalContainer]}
      >
        <View
          style={[
            styles.numberButtonContainer,
            {
              borderTopLeftRadius: 1,
              borderBottomLeftRadius: 1
            }
          ]}
        >
          {reachMin
          ? (
            <Icon
              style={[styles.disabled, styles.numberButton]}
              name="ios-remove" size={20}
            />)
          : (
            <TouchableOpacity
              style={styles.numberButton}
              onPress={this.decrease}
            >
              <Icon name="ios-remove" size={20} />
            </TouchableOpacity>)
          }
        </View>

        <View
          style={{
            borderColor: '#999',
            borderTopWidth: 1,
            borderBottomWidth: 1
          }}
        >
          <TextInput
            style={{
              width: 40,
              height: 32,
              color: '#666',
              textAlign: 'center'
            }}
            keyboardType="numeric"
            defaultValue={`${value}`}
            onBlur={this.onBlur}
          />
        </View>

        <View
          style={[
            styles.numberButtonContainer,
            {
              borderTopRightRadius: 1,
              borderBottomRightRadius: 1
            }
          ]}
        >
        {reachMax
        ? (
          <Icon
            style={[styles.numberButton, styles.disabled]}
            name="ios-add" size={20}
          />)
        : (
          <TouchableOpacity
            style={styles.numberButton}
            onPress={this.increase}
          >
            <Icon name="ios-add" size={20} />
          </TouchableOpacity>)
        }
        </View>
      </View>
    );
  }
}

NumberInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number
};

NumberInput.defaultProps = {
  value: 0,
  onChange: () => {},
  minValue: NaN,
  maxValue: NaN
};
