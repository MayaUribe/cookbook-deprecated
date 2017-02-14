'use strict';

var React = require('react-native');
import StyleSheet from '../../shared/stylesheet';
var { Dimensions } = React;
const window = Dimensions.get('window');

module.exports = StyleSheet({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#8E6C88',
    padding: 20,
    flexDirection: 'column'
  },
  title: {
    color: '#FFF',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  username: {
    fontWeight: 'bold'
  },
  optionMenu: {
    flexDirection: 'row'
  },
  menuIcon: {
    marginRight: 10
  },
  menuTitle: {
    color: '#FFF',
    alignSelf: 'center',
    height: 25
  }
});
