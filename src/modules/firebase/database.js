import * as firebase from 'firebase';

class Database {

  /**
   * Sets a users mobile number
   * @param userId
   * @param name
   * @param lastname
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserName(userId, name, lastname) {
    let userPath = '/user/' + userId + '/details';

    return firebase.database().ref(userPath).set({
      name: name,
      lastname: lastname
    });
  }

  /**
   * Listen for changes to a users mobile number
   * @param userId
   * @param callback Users mobile number
   */
  static listenUserData(userId, callback) {
    let userPath = '/user/' + userId + '/details';

    firebase.database().ref(userPath).on('value', (snapshot) => {
      var name = '';
      var lastname = '';

      if (snapshot.val()) {
        name = snapshot.val().name;
        lastname = snapshot.val().lastname;
      }

      callback(name, lastname);
    });
  }
}

module.exports = Database;
