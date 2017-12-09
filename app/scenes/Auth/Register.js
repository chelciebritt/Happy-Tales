import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import ViewContainer from '../../components/ViewContainer'
import StatusbarBackground from '../../components/StatusbarBackground'
import { styles } from './styles'
import { firebaseRef } from '../../services/Firebase'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'



export default class Register extends Component{
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
    this._register = this._register.bind(this)
  }

  _register() {
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    })
  }

  _register() {
    Actions.search()
  }

  render() {
    return (
      <ViewContainer>
      <StatusbarBackground />
        <View
        style={styles.view2}>
        <View
        style={styles.logo}>
        <Image source={require('../../images/logo-text.png')}
        />
        </View>
        <Text
        style={styles.text}>Login or Create an Account</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder="Email Address"
            autoCorrect={false}
            returnKeyType="next"
            keyboardApperance="light"
            autoCapitalize="none"
            />
          <TextInput
           style={styles.textInput}
           onChangeText={(text) => this.setState({password: text})}
           value={this.state.password}
           placeholder="Password"
           secureTextEntry={true}
           autoCorrect={false}
           returnKeyType="go"
           keyboardApperance="light"
           autoCapitalize="none"
            />
            <View style={styles.login}>
            <TouchableOpacity style={styles.loginButton} onPress={this._register}>
            <Text style={styles.loginButtonText}>
            Sign Up
            </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.register}>
            </View>
        </View>

      </ViewContainer>

    );
  }
}
