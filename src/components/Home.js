import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import TabData from './TabData';

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#444' }]} />
);

export default class Home extends Component {
  state = {
    index: 1,
    routes: [
      { key: 'first', title: 'Home' },
      { key: 'data', title: 'Voucher' },
      { key: 'third', title: 'Super' },
      { key: 'account', title: 'Account' },
    ],
  };

  _renderTabBar = props => (
    <TabBar style={{backgroundColor:'#fff'}} labelStyle={{ color: '#888' }} indicatorStyle={{ backgroundColor: '#ffffff' }} {...props} />
  )

  render() {
    return(
      <TabView
        navigationState={this.state}
        renderTabBar={this._renderTabBar}
        swipeEnabled={false}
        renderScene={SceneMap({
          first: FirstRoute,
          data: TabData,
          third: SecondRoute,
          account: SecondRoute
        })}
        tabBarPosition="bottom"
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  loginButton: {
    marginTop: 10
  },
  registerButton: {
    marginLeft: 16,
    marginTop: 10
  }
});
