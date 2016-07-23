const React = require('react');
const ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated,
} = ReactNative;
const Button = require('./Button');

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    underlineHeight: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
  },

  getInitialState() {
    return {
      textWidths: [],
      page: 0
    }
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      underlineColor: 'navy',
      backgroundColor: null,
      underlineHeight: 4,
    };
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <Button
      style={{flex: 1}}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => {
        this.props.goToPage(page);
        this.setState({ page });
      }}
    >
      <View style={[styles.tab, this.props.tabStyle]}>
        <Text
          style={[{color: textColor, fontWeight, }, textStyle, ]}
          onLayout={this.onTextLayout(page)}
        >
          {name}
        </Text>
      </View>
    </Button>;
  },

  onTextLayout(page) {
    return e => {
      const { nativeEvent: { layout: { width } } } = e;
      const { textWidths } = this.state;
      const { length: tabsCount } = this.props.tabs;

      if (textWidths.length === tabsCount) {
        return;
      }

      textWidths.push({ page, width });
      this.state.textWidths = textWidths;

      if (textWidths.length === tabsCount) {
        this.forceUpdate();
      }
    }
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const { page,  textWidths } = this.state;

    let tabUnderlineWidth = textWidths.find(i => i.page === page);

    tabUnderlineWidth = tabUnderlineWidth ? tabUnderlineWidth.width : 0;

    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.underlineHeight,
      backgroundColor: 'transparent',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, { left }, { flexDirection: 'row', justifyContent: 'center' }]}>
          <View style={{ width: tabUnderlineWidth,  backgroundColor: this.props.underlineColor }} />
        </Animated.View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});

module.exports = DefaultTabBar;
