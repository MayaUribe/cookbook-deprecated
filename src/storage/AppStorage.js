/*eslint new-cap:0 */
import Model from 'react-native-db-models';

const USER_DATA_KEY = 'userData';

const DB = {
  app: new Model.create_db('app'),
  users: new Model.create_db('users')
};

class AppStorage {

  addUserData(cookie, username) {
    return new Promise((resolve, reject) => {
      DB.users.add({key: USER_DATA_KEY, app_cookie: cookie, username: username}, function(addedData) {
        resolve(addedData);
      });
    });
  }

  clearAllData() {
    DB.users.erase_db(function(removedData) {
      console.log(removedData);
    });
  }

  setUserData(value) {
    return new Promise((resolve, reject) => {
      DB.users.update({ key: USER_DATA_KEY }, value, (data) => {
        resolve(data);
      });
    });
  }

  getUserData() {
    return new Promise((resolve, reject) => {
      DB.users.get({key: USER_DATA_KEY}, (results) => {
        resolve(results[0]);
      });
    });
  }

  clearUserData() {
    return new Promise((resolve, reject) => {
      console.log('remove user');
      DB.users.remove({ key: USER_DATA_KEY }, (data) => {
        DB.users.add({key: USER_DATA_KEY});
        resolve(data);
      });
    });
  }
}

export default AppStorage;
