/**
 * Class Custom
 * @author Hendri Gunawan <hendri.gnw@gmail.com>
 */

import { AsyncStorage, Platform, Alert, ToastAndroid } from 'react-native';

export class Global {

  static TEST_MODE = true;

  static getBaseUrl() {
    if (this.TEST_MODE == true) {
      return 'http://cranium.co.id/ponku/';
    }
    return 'http://cranium.co.id/ponku/';
  }

  static presentToast(message) {
    if (Platform.OS == 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return true;
    }
    Alert.alert(message);
  }
}

export class Session {

  static getIsLoggedIn() {
    return AsyncStorage.getItem("isLoggedIn");
  }

  static setIsLoggedIn(value) {
    try {
      AsyncStorage.setItem("isLoggedIn", '1');
    } catch (error) {

    }
  }

  static setDefaultUser() {
    return {
      name: null
    };
  }

  static getUser() {
    return AsyncStorage.getItem("user");
  }

  static setUser(user) {
    try {
      AsyncStorage.setItem("isLoggedIn", "1");
      this.isLoggedIn = true;
      AsyncStorage.setItem("user", JSON.stringify(user));
      this.user = user;
    } catch(error) {

    }
  }
}