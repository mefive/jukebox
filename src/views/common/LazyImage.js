import React, { Component, PropTypes } from 'react';
import { View, Image, Text } from 'react-native';
import Immutable from 'immutable';

import RNFS from 'react-native-fs';
import * as constants from '../../constants';
import * as filesActions from '../../actions/files';

const imagesFolder
= `${RNFS.CachesDirectoryPath}/${constants.IMAGE_FILES_FOLDER_NAME}/`;

export default class LazyImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFile: false,
      downloading: false
    };
  }

  componentDidMount() {
    this.tryDownload();
  }

  shouldComponentUpdate() {
    return !this.state.hasFile;
  }

  componentDidUpdate() {
    this.tryDownload();
  }

  tryDownload() {
    const { dispatch, url, picId } = this.props;
    const { hasFile, downloading } = this.state;

    if (!hasFile && !downloading) {
      dispatch(
        filesActions.downloadImage({
          url,
          fileName: `${picId}.jpg`
        })
      );
    }
  }

  render() {
    const {
      defaultView, defaultFileName,
      imageFiles, style, picId
    } = this.props;

    let fileName;

    let file = imageFiles.get(`${picId}.jpg`);
    if (!file) {
      fileName = defaultFileName;
    }
    else {
      file = file.toJS();
      this.state.downloading = file.downloading;

      if (file.downloading) {
        fileName = defaultFileName;
      }
      else {
        this.state.hasFile = true;
        fileName = `file://${imagesFolder}${file.fileName}`;
      }
    }

    if (fileName) {
      return (
        <Image
          source={{ uri: fileName }}
          style={style}
        />
      );
    }

    if (defaultView) {
      return <View>{defaultView}</View>;
    }

    return (
      <View
        style={[
          { alignItems: 'center', justifyContent: 'center' },
          style
        ]}
      >
        <Text>loading</Text>
      </View>
    );
  }
}

LazyImage.propTypes = {
  ...Image.propTypes,
  url: PropTypes.string,
  picId: PropTypes.number,
  defaultView: PropTypes.object,
  defaultFileName: PropTypes.string,
  imageFiles: PropTypes.instanceOf(Immutable.Map),
  imageProps: PropTypes.object,
  dispatch: PropTypes.func
};

LazyImage.defaultProps = {
  download: () => null,
  dispatch: () => null
};
