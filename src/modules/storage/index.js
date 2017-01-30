/*eslint new-cap:0 */
import Model from 'react-native-db-models';
import { AsyncStorage } from 'react-native';
const USER_DATA_KEY = 'userData';

const DB = {
  app: new Model.create_db('app'),
  users: new Model.create_db('users')
};

class AppStorage {
  static addUserData(username) {
    return new Promise((resolve, reject) => {
      let user = {username: username};
      AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
      .then(() => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  static clearAllData() {
    AsyncStorage.clear();
  }

  static setUserData(value) {
    return new Promise((resolve, reject) => {
      DB.users.update({ key: USER_DATA_KEY }, value, (data) => {
        resolve(data);
      });
    });
  }

  static getUserData() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_DATA_KEY).then((result) => {
        resolve(JSON.parse(result));
      });
    });
  }

  static clearUserData() {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(USER_DATA_KEY).then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}

export default AppStorage;
