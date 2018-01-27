'use strict';

import React, {Component} from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';

import {
  LOGIN,
} from '../../shared/constant';

class Logout extends Component {
  componentDidMount() {
    this.getInitialView();
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.logout();
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

  render() {
    return (
      <View />
    );
  }
}

export default Logout;
