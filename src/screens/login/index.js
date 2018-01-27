'use strict';

import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from './constants';
import * as firebase from 'firebase';

import {
  APP_NAME,
  LOGIN,
  RECIPES,
  SIGNUP
} from '../../shared/constant';

var deviceWidth = Dimensions.get('window').width;

class Login extends Component {

  constructor(props) {
    super(props);
    this.inputedEmail = '';
    this.inputedPassword = '';
  }

  _navigate(screen) {
    this.props.navigation.navigate(screen, {name: 'Test'});
  }

  async login(email, pass) {
    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, pass);

      this._navigate(RECIPES);
    } catch (error) {
      console.log(error.toString());
    }
  }

  onLoginPressed() {
    this.login(this.inputedEmail, this.inputedPassword);
  }

  onSignupPressed() {
    this._navigate(SIGNUP);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containers}>
          <View style={styles.titleContainer}>
            <Image source={require('../../assets/img/cookbook_128.png')}
                   style={styles.logo} />
            <Text style={styles.title}>{APP_NAME}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View>
              <View style={styles.inputContainer}>
                <Icon
                  name="ios-person"
                  size={Constant.ICON_SIZE}
                  color="#2B2E33"
                />
                <TextInput
                  style={styles.input}
                  ref='email'
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder='Email'
                  underlineColorAndroid={'rgba(0,0,0,0.0)'}
                  placeholderTextColor="#2B2E33"
                  onChangeText={(text) => { this.inputedEmail = text; }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon
                  name="ios-key"
                  size={Constant.ICON_SIZE}
                  color="#2B2E33"
                />
                <TextInput
                  style={styles.input}
                  ref='password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder='Password'
                  underlineColorAndroid={'rgba(0,0,0,0.0)'}
                  placeholderTextColor="#2B2E33"
                  secureTextEntry
                  onChangeText={(text) => { this.inputedPassword = text; }}
                />
              </View>
              <TouchableHighlight
                style={styles.button}
                underlayColor='#000000'
                onPress={this.onLoginPressed.bind(this)}
              >
                <Text style={styles.btnText}>{LOGIN}</Text>
              </TouchableHighlight>
              <Text style={styles.hiperlink}>Forgot password</Text>
              <TouchableHighlight
                underlayColor='rgba(0,0,0,0.0)'
                onPress={this.onSignupPressed.bind(this)}>
                <Text style={styles.hiperlink}>Sign up</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E3E3'
  },
  containers: {
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 35,
    color: '#2B2E33'
  },
  inputsContainer: {
    flex: 3
  },
  inputContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    padding: 0,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    fontFamily: 'Open Sans',
    fontSize: 13,
    flex: 1,
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 10,
    borderWidth: 0
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 15,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009999'
  },
  btnText: {
    fontFamily: 'Open Sans',
    color: '#fff',
    fontWeight: 'bold'
  },
  logo: {
    resizeMode: 'contain',
    width: deviceWidth / 4,
    height: deviceWidth / 4
  },
  hiperlink: {
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'center',
    color: '#0A2239'
  }
});

export default Login;
