import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, ActivityIndicator, Alert, RefreshControl, BackHandler, Vibration, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { Global } from './../helpers/Global';
import { Actions } from 'react-native-router-flux';
import RNShakeEvent from 'react-native-shake-event';

const data = [
  {
    name: 'Test',
  },
  {
    name: 'Test 2',
  },
  {
    name: 'Test 3',
  }
];

export default class VoucherDetail extends Component {

  constructor(props){
    super(props);
    this.state = {data: {name: null}, shakeCounter: 0, shakeLoading: false};
  }

  componentDidMount() {
    RNShakeEvent.addEventListener('shake', () => {
      if (this.state.shakeCounter >= 3) {
        Alert.alert("Super coupon hanya dapat di shake maksimal 3 kali.");
        return true;
      }
      this.setState({
        shakeLoading: true
      });
      setTimeout(() => {
        this.setState({
          shakeLoading: false
        });
        Vibration.vibrate(500);
        this.setState({
          data: data[Math.round(Math.random() * (data.length - 0) + 0)],
          shakeCounter: (this.state.shakeCounter + 1)
        });
        return true;
      }, 3000);
      return true;
    });
  }

  _shake() {
    if (this.state.shakeCounter >= 3) {
      Alert.alert("Super coupon hanya dapat di shake maksimal 3 kali.");
      return true;
    }
    this.setState({
      shakeLoading: true
    });
    setTimeout(() => {
      Vibration.vibrate(500);
      this.setState({
        data: data[Math.round(Math.random() * (data.length - 0) + 0)],
        shakeCounter: (this.state.shakeCounter + 1),
        shakeLoading: false
      });
    }, 3000);
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  render() {
    if(this.state.shakeLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return(
        <View>
          <ScrollView>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8, marginBottom: 8 }}>
              { this.state.data.name }
            </Text>
            <Button title="Trigger Shake Me" onPress={() => this._shake()} />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
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
});