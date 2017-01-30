'use strict';

import React, {Component} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from './constants';
import styles from './style';

class ScreenTitle extends Component {

  _onPressButton() {
    this.props.onPress();
  }

  render() {
    let icon = this.props.icon || 'md-arrow-back';

    return (
      <View>
        <View style={styles.toolbarScreen}>
          <TouchableOpacity onPress={this._onPressButton.bind(this)}>
            <Icon name={icon} size={Constant.ICON_SIZE} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.toolbarTitleContainer}>
            <Text style={styles.screenTitle}>
              {this.props.title}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ScreenTitle.propTypes = {
  onPress: React.PropTypes.func,
  title: React.PropTypes.string
};

export default ScreenTitle;
