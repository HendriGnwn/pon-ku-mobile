/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, Alert, Text, TouchableOpacity, Image } from 'react-native';
import { Router, Scene, Drawer} from 'react-native-router-flux';

import Voucher from './components/Voucher';
import Login from './components/Login';
import DrawerContent from './drawer/DrawerContent';

import MenuIcon from './images/ic_menu.png';

export default class App extends Component {

  // componentDidMount() {
  //   try {
  //     AsyncStorage.getItem("isLoggedIn").then((value) => {
  //       Alert.alert(value);
  //       if(value == "1") {
  //         Actions.jump('home');
  //       }
  //       return true;
  //     });
      
  //   } catch (error) {

  //   }
  // }

  render() {
    return (
      <Router>
        <Scene navigationBarStyle={{ backgroundColor: '#2a64c1', borderBottomWidth: 0, elevation: 0 }} titleStyle={{ color: '#FFFFFF' }}>
          <Scene
              hideNavBar 
              key="login" 
              component={Login} 
              title="Login Page"
              />
          <Drawer
              hideNavBar={true}
              key="drawer"
              contentComponent={DrawerContent}
              drawerImage={MenuIcon}
              drawerIcon= {null}
            >
            <Scene 
              key="home" 
              component={Voucher} 
              title="Home"
              titleStyle={{color: '#fff', textAlign: 'center', flex: 1 }}
              renderRightButton={() => <TouchableOpacity><Image source={require('./images/ic_search.png')} style={{width: 22, height:22, marginRight: 12}} /></TouchableOpacity> }
              />
          </Drawer>
        </Scene>
      </Router>
    );
  }
}