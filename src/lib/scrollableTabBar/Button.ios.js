const React = require('react');
const ReactNative = require('react-native');
const {
 TouchableWithoutFeedback,
  View,
} = ReactNative;

const Button = (props) => {
  return <TouchableWithoutFeedback {...props}>
    {props.children}
  </TouchableWithoutFeedback>;
};

module.exports = Button;
