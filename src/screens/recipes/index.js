'use strict';

import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ScreenTitle from '../../components/screen-title';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu';

import {
  RECIPES,
  MY_RECIPES
} from '../../shared/constant';

class Recipes extends Component {
  static navigationOptions = ({ navigation }) => ({
    /*title: `My Recipes ${navigation.state.params.name}`,*/
    title: `My Recipes huhu`,
  });

  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containers}>
          <Text>Welcome!, here are my recipes!</Text>
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
