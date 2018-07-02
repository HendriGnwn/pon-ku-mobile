import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
});

const list = [
  {
    name: 'Home',
    goto: 'voucher'
  },
  {
    name: 'Sign out',
    goto: 'login'
  },
];

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  _logout() {
    try {
      AsyncStorage.setItem("isLoggedIn", '0');
      Actions.jump('login');
    } catch (error) {

    }
  }

  _voucher() {
    Actions.drawerClose();
    Actions.voucher();
  }

  _myCoupon() {
    Actions.drawerClose();
    Actions.myCoupon();
  }

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <ListItem
            title='My Coupon'
            onPress={() => this._myCoupon()}
          />
          <ListItem
            title='Logout'
            onPress={() => this._logout()}
          />
        </List>
      </View>
    );
  }
}

export default DrawerContent;
