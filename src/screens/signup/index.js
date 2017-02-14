'use strict';

import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from './constants';
import * as firebase from 'firebase';
import Database from '../../modules/firebase/database';

import {
  RECIPES,
  SIGNUP
} from '../../shared/constant';

var deviceWidth = Dimensions.get('window').width;

class Signup extends Component {

  constructor(props) {
    super(props);
    this.inputedEmail = '';
    this.inputedPassword = '';
    this.confirmedPassword = '';
    this.inputedName = '';
    this.inputedLastname = '';
  }

  _navigate(screen) {
    this.props.navigator.push({
      name: screen
    });
  }

  async signup() {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(this.inputedEmail, this.inputedPassword);
      // @Todo: send email to registered user
      // @Todo: Maybe a welcome message with a quick introduction
      // @Todo: Add a loading when saving the data
      let user = await firebase.auth().currentUser;
      Database.setUserName(user.uid, this.inputedName, this.inputedLastname);
      this._navigate(RECIPES);
    } catch (error) {
      console.log(error.toString());
    }
  }

  onSignupPressed() {
    // this.signup('test@test.com', 'usertest');
    if (this.inputedEmail === '' || this.inputedPassword === '' ||
        this.confirmedPassword === '' || this.inputedName === '' ||
        this.inputedLastname === '') {
      console.log('Please enter all fields');
    } else if (this.inputedPassword !== this.confirmedPassword) {
      console.log('Passwords must match');
    } else {
      this.signup();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containers}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an account</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View>
              <View style={styles.inputContainer}>
                <Icon
                  name="ios-mail"
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
                  name="ios-person"
                  size={Constant.ICON_SIZE}
                  color="#2B2E33"
                />
                <TextInput
                  style={styles.input}
                  ref='name'
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder='Name'
                  underlineColorAndroid={'rgba(0,0,0,0.0)'}
                  placeholderTextColor="#2B2E33"
                  onChangeText={(text) => { this.inputedName = text; }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon
                  name="ios-person"
                  size={Constant.ICON_SIZE}
                  color="#2B2E33"
                />
                <TextInput
                  style={styles.input}
                  ref='lastname'
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder='Lastname'
                  underlineColorAndroid={'rgba(0,0,0,0.0)'}
                  placeholderTextColor="#2B2E33"
                  onChangeText={(text) => { this.inputedLastname = text; }}
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
              <View style={styles.inputContainer}>
                <Icon
                  name="ios-checkmark"
                  size={Constant.ICON_SIZE}
                  color="#2B2E33"
                />
                <TextInput
                  style={styles.input}
                  ref='password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder='Confirm password'
                  underlineColorAndroid={'rgba(0,0,0,0.0)'}
                  placeholderTextColor="#2B2E33"
                  secureTextEntry
                  onChangeText={(text) => { this.confirmedPassword = text; }}
                />
              </View>
              <TouchableHighlight
                style={styles.button}
                underlayColor='#000000'
                onPress={this.onSignupPressed.bind(this)}
              >
                <Text style={styles.btnText}>{SIGNUP}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  inputsContainer: {
    flex: 3
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 35,
    color: '#2B2E33'
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
  }
});

export default Signup;
