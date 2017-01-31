/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component} from 'react';
import {
  StatusBar,
  Navigator,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import Login from './screens/login';
import Recipes from './screens/recipes';
import Storage from './modules/storage';

import {
  LOGIN,
  RECIPES,
  APP_NAME,
  LOADING
} from './shared/constant';

var deviceWidth = Dimensions.get('window').width;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.renderScene = this.renderScene.bind(this);
    // Storage.clearAllData();
    this._checkInitialScreen();
  }

  _checkInitialScreen() {
    Storage.getUserData().then((userData) => {
      if (userData) {
        this.setState({screen: RECIPES});
      } else {
        this.setState({screen: LOGIN});
      }
    });
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
        Storage.clearAllData();
        break;
    }
  }

  render() {
    let content;

    if (this.state.screen) {
      content = (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#262a2e" barStyle="light-content" />
          <Navigator style={{ flex: 1 }}
                     initialRoute={{ name: this.state.screen }}
                     renderScene={this.renderScene.bind(this)} />
        </View>
      );
    } else {
      content = (<View style={styles.container}>
                   <View style={styles.content}>
                     <Image source={require('./assets/img/cookbook_512.png')}
                            style={styles.logo} />
                     <Text style={styles.appText}>{APP_NAME}</Text>
                     <Text style={styles.loadingText}>{LOADING}</Text>
                   </View>
                 </View>);
    }
    return (
      content
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E6C88'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: 'contain',
    width: deviceWidth / 2,
    height: deviceWidth / 2
  },
  appText: {
    fontFamily: 'OpenSans',
    fontSize: 24,
    color: '#FFF',
    marginTop: 15
  },
  loadingText: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: '#FFF'
  }
});

export default App;
