const React = require('react');

const {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} = require('react-native');
const { Component } = React;
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from './constants';
import styles from './style';
import Storage from '../../modules/storage';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
    this.getUsername();
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired
  };

  onItemSelected(item) {
    this.props.onItemSelected(item);
  }

  getUsername() {
    Storage.getUserData().then((userData) => {
      if (userData) {
        this.setState({username: userData.username});
      }
    });
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View>
          <Text style={styles.title}>
            Welcome, <Text style={styles.username}>{this.state.username}</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.optionMenu} onPress={() => this.onItemSelected(Constant.LOGOUT_LABEL)} >
          <Icon name="ios-log-out" size={Constant.ICON_SIZE} color="#FFF" style={styles.menuIcon}/>
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
