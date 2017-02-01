import * as firebase from 'firebase';

class Firebase {

  /**
   * Initialises Firebase
   */
  static initialise() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAX22DPuIukNY0VJeaeVEHnvCW2wlSXmB0',
      authDomain: 'cookbook-b0d4f.firebaseapp.com',
      databaseURL: 'https://cookbook-b0d4f.firebaseio.com',
      storageBucket: 'cookbook-b0d4f.appspot.com',
      messagingSenderId: '384642986962'
    });
  }

}

module.exports = Firebase;
