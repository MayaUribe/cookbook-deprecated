/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

class cookbook extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('cookbook', () => cookbook);
