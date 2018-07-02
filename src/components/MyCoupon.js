import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, TouchableHighlight, Alert, RefreshControl, BackHandler, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { Global } from './../helpers/Global';
import { Actions } from 'react-native-router-flux';

export default class MyCoupon extends Component {

  constructor(props){
    super(props);
    this.state ={ refreshing: true }
  }

  _getData() {
    return fetch(Global.getBaseUrl() + 'api/v1/my-coupon', {
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
    return this._getData();
  }

  _voucherDetail(params) {
    if (params.is_available == true) {
      Actions.push('voucherDetail', {data:params});
    } else {
      Alert.alert("Coupon sudah tidak tersedia");
    }
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
          <TouchableOpacity onPress={() => this._voucherDetail(item)}>
            <Card
              containerStyle={{ opacity: (item.is_available == true) ? 1 : 0.2 }}
              image={{uri: item.file}}
              imageStyle={styles.cardImageStyle}>
              <Text style={styles.cardTitleTextStyle}>
                {item.name}
              </Text>
              <Button
                buttonStyle={{backgroundColor: '#2a64c1'}}
                onPress={() => Alert.alert("Thank you")}
                title="PAKAI"
                />
            </Card>
            { (item.is_available == false) ? <View style={styles.viewOverlayNotAvailable}><Text style={styles.textOverlayNotAvailable}>Kupon tidak tersedia</Text></View> : null }
          </TouchableOpacity>
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
  },
  viewOverlayNotAvailable: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOverlayNotAvailable: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a64c1'
  }
});