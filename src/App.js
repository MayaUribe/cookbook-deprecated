/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';

import * as firebase from 'firebase';
import LoginScreen from './screens/login';
import LogoutScreen from './screens/logout';
import RecipesScreen from './screens/recipes';
import SignupScreen from './screens/signup';
import Firebase from './modules/firebase/firebase';

import {
  LOGIN,
  LOGOUT,
  APP_NAME,
  LOADING,
} from './shared/constant';

let deviceWidth = Dimensions.get('window').width;

// drawer stack
const DrawerStack = DrawerNavigator({
  Recipes: {
    path: 'recipes/:name',
    screen: RecipesScreen,
  },
  Signout: {
    title: 'Logout',
    screen: LogoutScreen,
  },
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#009999'
    },
    title: 'My Recipes',
    headerTintColor: 'white',
  })
});

// login stack
const LoginStack = StackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  /* forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }*/
}, {
  headerMode: 'none',
});

class App extends Component {

  constructor() {
    super();

    Firebase.initialise();
    this.getInitialView();
    this.navigator = null;

    this.state = {
      loading: true,
    };

    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
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
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Image source={require('./assets/img/cookbook_512.png')}
                   style={styles.logo} />
            <Text style={styles.appText}>{APP_NAME}</Text>
            <Text style={styles.loadingText}>{LOADING}</Text>
          </View>
        </View>
      )
    }

    if (!this.state.authenticated) {
      return (
        <View style={styles.flexOne}>
          <View style={styles.flexOne}>
            <StatusBar backgroundColor="#262a2e" barStyle="light-content" />
            <LoginStack />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.flexOne}>
          <View style={styles.flexOne}>
            <StatusBar backgroundColor="#262a2e" barStyle="light-content" />
            <DrawerNavigation
              screenProps='test'
              onMenuItemSelected={this.onMenuItemSelected.bind(this)}
            />
          </View>
        </View>
      );
    }
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
