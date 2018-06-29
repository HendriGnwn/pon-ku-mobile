import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { 
  Button,
  Text,
  FormLabel,
  FormInput,
  Overlay
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {
  
  constructor(props){
    super(props);
    this.state ={ buttonIsLoading: false}
  }
  
  _processLoginClicked = () => {
    this.setState({
      buttonIsLoading: true,
    }, function(){

    });

    setTimeout(() => {
      this.setState({
        buttonIsLoading: false,
      }, function(){
        try {
          AsyncStorage.setItem("isLoggedIn", '1');
          Actions.jump('home');
        } catch (error) {

        }
        
      });
    }, 1000);
  }

  render() {
    return(
      <ScrollView>
        <View>
          <StatusBar backgroundColor="#2a64c1" barStyle="light-content" />
          <Image
            source={require('./../images/logo.png')}
            style={styles.logo}
          />
          <FormLabel>Email</FormLabel>
          <FormInput/>
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry={true}/>
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}
          <Button
            raised
            loading={this.state.buttonIsLoading}
            title={this.state.buttonIsLoading ? ' ' : 'Login'}
            containerViewStyle={styles.loginButton}
            buttonStyle={{backgroundColor: '#2a64c1'}}
            onPress={this._processLoginClicked} />
        </View>
      </ScrollView>
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
