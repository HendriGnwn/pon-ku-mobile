import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, TouchableNativeFeedback, Alert, RefreshControl, BackHandler } from 'react-native';
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

    
      if (!Actions.currentScene.currentScene == 'home') {
        this.goBack();
        return true;
      }
      BackHandler.exitApp();
      return false;
    });

    return this._getData();
  }

  _voucherDetail(title) {
    Alert.alert(title.name);
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
  }
});