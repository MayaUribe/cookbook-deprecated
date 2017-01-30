'use strict';

import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ScreenTitle from '../../components/screen-title';

import {
  RECIPES
} from '../../shared/constant';

class Recipes extends Component {

  _navigate(name) {
    this.props.navigator.pop({
      name: RECIPES,
      passProps: {
        name: name
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenTitle style={styles.toolbar}
                     title="My Recipes"
                     icon="md-menu"
                     onPress={this._navigate.bind(this)}/>
        <View style={styles.containers}>
          <Text>Hello World!, here are my recipes!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flex: 70
  },
  container: {
    flex: 1,
    backgroundColor: '#E8E3E3'
  },
  containers: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Recipes;
