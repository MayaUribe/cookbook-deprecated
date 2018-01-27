/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';

import * as firebase from 'firebase';
import Login from './screens/login';
import Recipes from './screens/recipes';
import Signup from './screens/signup';
import Firebase from './modules/firebase/firebase';

import {
  LOGIN,
  LOGOUT,
  RECIPES,
  APP_NAME,
  LOADING,
  SIGNUP
} from './shared/constant';

let deviceWidth = Dimensions.get('window').width;

const StackNavigation = StackNavigator({
  Login: {
    screen: Login,
  },
  Recipes: {
    path: 'recipes/:name',
    screen: Recipes,
  },
  Signup: {
    screen: Signup,
  },
});


class App extends Component {

  constructor(props) {
    super(props);

    Firebase.initialise();
    this.getInitialView();
    this.navigator = null;

    this.state = {
      userLoaded: false,
      initialView: null
    };

    this.renderScene = this.renderScene.bind(this);
    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {
      let initialView = user ? RECIPES : LOGIN;

      this.setState({
        userLoaded: true,
        initialView: initialView
      });
    });
  }

  renderScene(route, navigator) {
    let ScreenComponent = null;
    this.navigator = navigator;

    switch (route.name) {
      case LOGIN:
        ScreenComponent = Login;
        break;
      case RECIPES:
        ScreenComponent = Recipes;
        break;
      case SIGNUP:
        ScreenComponent = Signup;
        break;
    }

    if (ScreenComponent) {
      return <ScreenComponent navigator={navigator} onMenuItemSelected={this.onMenuItemSelected.bind(this)} {...route.passProps} />;
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();

      // Navigate to login view
      this.props.navigation.navigate(LOGIN);
    } catch (error) {
      console.log(error);
    }
  }

  onMenuItemSelected(item) {
    switch (item) {
      case LOGOUT:
        this.logout();
        break;
    }
  }

  render() {
    let content;

    if (this.state.initialView) {
      content = (
        <View style={styles.flexOne}>
          <StatusBar backgroundColor="#262a2e" barStyle="light-content" />
          <StackNavigation
            screenProps='test'
            onMenuItemSelected={this.onMenuItemSelected.bind(this)}
          />
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

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
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
