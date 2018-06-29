import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, ActivityIndicator, Alert, RefreshControl, BackHandler, Vibration, ScrollView } from 'react-native';
import { Card, Text, Button, Overlay } from 'react-native-elements';
import { Global } from './../helpers/Global';
import { Actions } from 'react-native-router-flux';
import RNShakeEvent from 'react-native-shake-event';

const data = [
  {
    name: 'Discount 50% Starbucks',
    file: 'https://i2.wp.com/www.morepromo.info/wp-content/uploads/2016/01/12489397_10156355781425333_2648707575936813409_o.png',
    description: ''
  },
  {
    name: 'Discount 50% Pizza Hut',
    file: 'http://1.bp.blogspot.com/-8Q-fNvwmGTk/T9iQKL3APgI/AAAAAAAABD0/Irn7tnATlTE/s1600/pizza+hut+50%25+off+cheesy+bites+steak+pizza.jpg',
    description: ''
  },
  {
    name: 'Discount 50% Coffee Bean',
    file: 'http://katalogpromosi.com/wp-content/uploads/2017/09/coffee-bean_mega_26102017.jpg',
    description: ''
  }
];

export default class VoucherDetail extends Component {

  constructor(props){
    super(props);
    this.state = {data: {name: null, file: null, description:null}, shakeCounter: 0, shakeLoading: false, isResultShake: false};
  }

  componentWillMount() {
    this.setState({data: {name: null, file: null, description:null}, shakeCounter: 0, shakeLoading: false, isResultShake: false});
  }

  componentDidMount() {
    RNShakeEvent.addEventListener('shake', () => {
      this._shake();
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
      this.setState({
        shakeLoading: false,
        isResultShake: true
      });
      Vibration.vibrate(300);
      const result = data[Math.round(Math.random() * (data.length - 0) + 0)];
      var index = data.indexOf(5);
      if (index > -1) {
        data.splice(index, Math.round(Math.random() * (data.length - 0) + 0));
      }
      this.setState({
        data: result,
        shakeCounter: (this.state.shakeCounter + 1)
      });
      return true;
    }, 3000);
    return true;
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
        <ScrollView>
          <View style={styles.container}>
            {
              this.state.isResultShake ? 
              <Card
                image={{uri: this.state.data.file ? this.state.data.file : '' }}
                imageStyle={styles.cardImageStyle}>
                <Text style={styles.cardTitleTextStyle}>
                  {this.state.data.name}
                </Text>
                <Text>
                  {this.state.data.description}
                </Text>
              </Card>
              :
              null
            }
            {
              this.state.isResultShake ?
              <Button title="Download" onPress={() => Alert.alert("Anda telah mengambil Super Coupon.")} buttonStyle={{marginTop: 16, backgroundColor: '#2a64c1'}} />
              :
              <Button title="Shake" onPress={() => this._shake()} buttonStyle={{marginTop: 16}} />
            }
            {
              this.state.isResultShake ?
              <Button title="Skip and Shake Again" onPress={() => this._shake()} buttonStyle={{marginTop: 16}} />
              :
              null
            }
            
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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