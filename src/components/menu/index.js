const React = require('react');

const {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} = require('react-native');
const { Component } = React;
import Octicons from 'react-native-vector-icons/Octicons';
import Constant from './constants';
import {
  LOGIN,
} from '../../shared/constant';
import styles from './style';
import * as firebase from 'firebase';
import Database from '../../modules/firebase/database';

class Menu extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastname: ''
    };
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;
      this.setUserData(user);
    } catch (error) {
      console.log(error);
    }
  }

  setUserData(user) {
    Database.listenUserData(user.uid, (name, lastname) => {
      this.setState({
        name: name,
        lastname: lastname
      });
    });

    this.setState({
      uid: user.uid
    });
  }

  _navigateTo(screen) {
    this.props.navigation.navigate(screen);
  }

  async logout() {
    try {
      await firebase.auth().signOut();

      // Navigate to login view
      this._navigateTo(LOGIN)
    } catch (error) {
      console.log(error);
    }
  }

  onItemSelected(item) {
    this.logout();
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View>
          <Text style={styles.title}>
            Welcome, <Text style={styles.username}>{this.state.name} {this.state.lastname}</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.optionMenu} onPress={() => this.onItemSelected(Constant.LOGOUT_LABEL)} >
          <Octicons name="sign-out" size={Constant.ICON_SIZE} color="#FFF" style={styles.menuIcon}/>
          <Text
            style={styles.menuTitle}>
            {Constant.LOGOUT_LABEL}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
};

export default Menu;
