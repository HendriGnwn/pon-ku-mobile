/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, TouchableHighlight, Image, Text } from 'react-native';
import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';

import Voucher from './components/Voucher';
import VoucherDetail from './components/VoucherDetail';
import SuperCoupon from './components/SuperCoupon';
import MyCoupon from './components/MyCoupon';
import Login from './components/Login';
import DrawerContent from './drawer/DrawerContent';
import SplashScreen from 'react-native-splash-screen';

import MenuIcon from './images/ic_menu.png';

export default class App extends Component {

  componentDidMount() {
    try {
      AsyncStorage.getItem("isLoggedIn").then((value) => {
        SplashScreen.hide();
        if(value == "1") {
          Actions.jump('home');
        } else {
          Actions.jump('login');
        }
        return true;
      });
      
    } catch (error) {
      SplashScreen.hide();
      Actions.jump('login');
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root" navigationBarStyle={{ backgroundColor: '#2a64c1', borderBottomWidth: 0, elevation: 0 }} titleStyle={{ color: '#FFFFFF' }}>
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
            {/* <Scene 
              key="home" 
              component={Home} 
              title="Home"
              titleStyle={{color: '#fff', textAlign: 'center', flex: 1 }}
              renderRightButton={() => <TouchableOpacity><Image source={require('./images/ic_search.png')} style={{width: 22, height:22, marginRight: 12}} /></TouchableOpacity> }
              /> */}
            <Scene 
              key="home" 
              component={Voucher} 
              title="Voucher"
              titleStyle={{color: '#fff', textAlign: 'center', flex: 1 }}
              renderRightButton={() => <TouchableOpacity><Image source={require('./images/ic_search.png')} style={{width: 22, height:22, marginRight: 12}} /></TouchableOpacity> }
            />
          </Drawer>
          <Scene 
            key="voucherDetail" 
            component={VoucherDetail} 
            title=""
            titleStyle={{color: '#fff', textAlign: 'left', flex: 1 }}
            />
          <Scene 
            key="superCoupon" 
            component={SuperCoupon} 
            title="Super Coupon"
            titleStyle={{color: '#fff', textAlign: 'left', flex: 1 }}
            />
          <Scene 
            key="myCoupon" 
            component={MyCoupon} 
            title="My Coupon"
            titleStyle={{color: '#fff', textAlign: 'left', flex: 1 }}
            />
        </Scene>
      </Router>
    );
  }
}