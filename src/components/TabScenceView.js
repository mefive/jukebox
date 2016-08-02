import { Component, PropTypes } from 'react';

export default class TabScenceView extends Component {
  componentDidMount() {
    this.tryLoad(this.props.isCurrentView);
  }

  componentWillReceiveProps(nextProps) {
    const { isCurrentView } = nextProps;

    if (this.props.isCurrentView !== isCurrentView) {
      this.tryLoad(isCurrentView);
    }
  }

  tryLoad(isCurrentView) {
    if (isCurrentView) {
      this.load();
    }
  }

  load() {
    return null;
  }
}

TabScenceView.propTypes = {
  isCurrentView: PropTypes.bool
};
