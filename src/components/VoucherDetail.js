import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, Alert, RefreshControl, BackHandler, Image, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { Global } from './../helpers/Global';
import { Actions } from 'react-native-router-flux';

export default class VoucherDetail extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    Actions.refresh({title: this.props.data.name});
  }

  componentDidMount(){
    console.log(this.props.data);
  }

  render() {
    return(
      <View>
        <ScrollView>
          <Image
            source={{uri: this.props.data.file}}
            style={styles.cardImageStyle} />
          <View style={styles.container}>
            <Text style={styles.cardTitleTextStyle}>
              {this.props.data.name}
            </Text>
            <Text>
              {this.props.data.short_description}
            </Text>
            <Text>
              {this.props.data.description}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8, marginBottom: 8 }}>
              Syarat dan Ketentuan
            </Text>
            <Text>
            {this.props.data.term_condition}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  cardImageStyle: {
    height: 200,
  },
  cardTitleTextStyle: {
    marginBottom: 10, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111'
  },
});