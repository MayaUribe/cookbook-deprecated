/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component} from 'react';
import { StatusBar, Navigator, View, Text, Platform } from 'react-native';
import AppStorage from './storage/AppStorage';
import Login from './screens/login';
import Recipes from './screens/recipes';

import {
  LOGIN,
  RECIPES
} from './share/constant';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.appStorage = new AppStorage();
    this.renderScene = this.renderScene.bind(this);
    this._checkInitialScreen();
  }

  _checkInitialScreen() {
    console.log('Check initial screen');
    this.setState({screen: RECIPES});
  }

  renderScene(route, navigator) {
    let ScreenComponent = null;

    switch (route.name) {
      case LOGIN:
        ScreenComponent = Login;
        break;
      case RECIPES:
        ScreenComponent = Recipes;
        break;
    }

    if (ScreenComponent) {
      return <ScreenComponent navigator={navigator} onMenuItemSelected={this.onMenuItemSelected.bind(this)} {...route.passProps} />;
    }
  }

  onMenuItemSelected(item) {
    switch (item) {
      case 'Logout':
        this.appStorage.clearAllData();
        break;
    }
  }

  render() {
    let content;
    let bgColor = (Platform.OS === 'ios' ? 'white' : '#262a2e');

    if (this.state.screen) {
      content = (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={bgColor} barStyle="light-content" />
          <Navigator style={{ flex: 1 }}
                     initialRoute={{ name: this.state.screen }}
                     renderScene={this.renderScene.bind(this)} />
        </View>
      );
    } else {
      content = (<View style={global.content}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'OpenSans', fontSize: 20, color: '#FFF'}}>Loading...</Text>
                    <Text style={{fontFamily: 'OpenSans', fontSize: 20, color: '#FFF'}}>Please wait</Text>
                  </View>
                </View>);
    }
    return (
      content
    );
  }
}

export default App;
