/**
 * @class Home
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

import * as firebase from 'firebase';
import Button from 'apsl-react-native-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo} from 'react-native-textinput-effects';

import Database from '../../modules/firebase/database';
import DismissKeyboard from 'dismissKeyboard';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      mobile: '',
      mobileForm: ''
    };

    this.logout = this.logout.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
  }

  async logout() {
    try {
      await firebase.auth().signOut();

      this.props.navigator.push({
        name: 'Login'
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Mobile Changes
      Database.listenUserMobile(user.uid, (mobileNumber) => {
        this.setState({
          mobile: mobileNumber,
          mobileForm: mobileNumber
        });
      });

      this.setState({
        uid: user.uid
      });
    } catch (error) {
      console.log(error);
    }
  }

  saveMobile() {
    // Set Mobile
    if (this.state.uid) {
      Database.setUserMobile(this.state.uid, '333222');
    }
    /* if (this.state.uid && this.state.mobileForm) {
      Database.setUserMobile(this.state.uid, this.state.mobileForm);
      DismissKeyboard();
    }*/
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
          <Text style={styles.heading}>Mobile Number (From Database): {this.state.mobile}</Text>
          <View style={styles.form}>
            <TextInput
                style={{flex: 1}}
                value={this.state.mobileForm}
                onChangeText={(mobileForm) => this.setState({mobileForm})}
            />
          </View>
          <View style={styles.logout}>
            <Button onPress={this.saveMobile} style={styles.buttons} textStyle={{fontSize: 18}}>
              Save
            </Button>
            <Button onPress={this.logout} style={styles.buttons} textStyle={{fontSize: 18}}>
              Logout
            </Button>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center'
  },

  logout: {
    padding: 50
  },

  form: {
    paddingTop: 50
  },

  container: {
    flex: 1,
    backgroundColor: '#8781bd',
    paddingTop: 50
  },

  buttons: {
    backgroundColor: 'whitesmoke'
  }
});

module.exports = Home;
