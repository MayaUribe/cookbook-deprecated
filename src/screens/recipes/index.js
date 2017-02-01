'use strict';

import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ScreenTitle from '../../components/screen-title';
const SideMenu = require('react-native-side-menu');
import Menu from '../../components/menu';

import {
  RECIPES,
  MY_RECIPES
} from '../../shared/constant';

class Recipes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  _navigate(name) {
    this.props.navigator.pop({
      name: RECIPES,
      passProps: {
        name: name
      }
    });
  }

  updateMenu(isOpen) {
    this.setState({isOpen: isOpen});
  }

  toggleMenu() {
    this.setState({isOpen: !this.state.isOpen});
  }

  onMenuItemSelected(item) {
    this.props.onMenuItemSelected(item);
    this.updateMenu(false);
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenu(isOpen)}>
        <View style={styles.container}>
          <ScreenTitle style={styles.toolbar}
                       title={MY_RECIPES}
                       icon="md-menu"
                       onPress={() => this.toggleMenu()}/>
          <View style={styles.containers}>
            <Text>Hello World!, here are my recipes!</Text>
          </View>
        </View>
      </SideMenu>
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
