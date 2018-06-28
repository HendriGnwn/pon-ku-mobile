import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, Alert, RefreshControl, BackHandler, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { Global } from './../helpers/Global';
import { Actions } from 'react-native-router-flux';

export default class Voucher extends Component {

  constructor(props){
    super(props);
    this.state ={ refreshing: true }
  }

  _getData() {
    return fetch(Global.getBaseUrl() + 'api/v1/regular-vouchers', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        refreshing: false,
        dataSource: responseJson.data,
      }, function(){
        
      });

    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.

    
      // if (!this.onMainScreen()) {
      //   this.goBack();
      //   return true;
      // }
      // BackHandler.exitApp();
      console.log(this.name);
      //return false;
    });
    

    return this._getData();
  }

  _voucherDetail(params) {
    Actions.push('voucherDetail', {data:params});
  }

  _onPressShakeMe() {
    Actions.push('superCoupon');
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._getData();
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          contentContainerStyle={styles.flatListContentContainerStyle}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}/>
          }
          renderItem={({item}) => 
          <TouchableNativeFeedback onPress={() => this._voucherDetail(item)}>
            <Card
              image={{uri: item.file}}
              imageStyle={styles.cardImageStyle}>
              <Text style={styles.cardTitleTextStyle}>
                {item.name}
              </Text>
              <Text>
                {item.short_description}
              </Text>
            </Card>
          </TouchableNativeFeedback>
          }
        />
        <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacityStyle} onPress={() => this._onPressShakeMe()} >
          <Image source={require('./../images/shake.png')} style={styles.floatingButtonStyle} />
          <Text style={{ fontWeight: 'bold', color: '#2a64c1' }}>Shake Me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContentContainerStyle: {
    paddingBottom: 16
  },
  cardImageStyle: {
    height: 180,
  },
  cardTitleTextStyle: {
    marginBottom: 10, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 70,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  }
});