import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Vibration, Platform } from 'react-native';
import RNShakeEvent from 'react-native-shake-event';
import Toast from 'react-native-toast-native';

const DURATION = 3000;
const PATTERN = [1000, 2000, 3000];

const toastStyle = {
  height: Platform.OS === ("ios") ? 50 : 100,
  borderRadius: 15,
  yOffset: 40
};

export default class TabData extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentWillMount() {
    RNShakeEvent.addEventListener('shake', () => {
      Toast.show('Device Shake.', Toast.SHORT, Toast.BOTTOM, toastStyle);
      Vibration.vibrate(DURATION);
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  componentDidMount(){
    Toast.show('You can shake this phone.', Toast.SHORT, Toast.BOTTOM, toastStyle);
    return fetch('http://kalm.cranium.co.id/api/v1/get-cities/1', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function(){

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.dataSource}
          style={{padding:20}}
          renderItem={({item}) => <Text style={{padding: 20}}>{item.name}</Text>}
        />
      </View>
    );
  }
}