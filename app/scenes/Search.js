import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'
import Nav from '../components/Nav'

const types = [{
   "value": 'Dog',
 }, {
   "value": 'Cat',
 }, {
   "value": 'Bird',
 }, {
   "value": 'Reptile',
 }, {
   "value": 'Small Furry',
 }];

 const sizes = [{
    "value": 'Small',
  }, {
    "value": 'Medium',
  }, {
    "value": 'Large',
  }, {
    "value": 'Extra Large',
  }];

  const gender = [{
     "value": 'Female',
   }, {
     "value": 'Male',
   }];


export default class Search extends Component {

  _search() {
    Actions.landing()
  }

  render() {
    return (
      <ViewContainer>
      <StatusbarBackground />
      <View
      style={styles.view}>
      <Text style={styles.heading}>Search</Text>

          <TextInput
          style={styles.textInput}
          // onChangeText={(text) => this.setState({location: text})}
          // value={this.state.email}
          placeholder="Zip Code"
          placeholderTextColor = "rgba(0, 0, 0, .38)"
          autoCorrect={false}
          returnKeyType="next"
          keyboardApperance="light"
          autoCapitalize="none"
          />

          <View style={{ marginRight: 30, marginLeft: 30 }}>
          <Dropdown
          label='Select Type'
          data={types}
          />
          </View>
          <View style={{ marginRight: 30, marginLeft: 30 }}>
          <Dropdown
          label='Select Size'
          data={sizes}
          />
          </View>
          <View style={{ marginRight: 30, marginLeft: 30 }}>
          <Dropdown
          label='Select Gender'
          data={gender}
          />
          </View>


          <View style={styles.login}>
          <TouchableOpacity style={styles.loginButton} onPress={this._search}>
          <Text style={styles.loginButtonText}>
          Search
          </Text>
          </TouchableOpacity>
          </View>
          </View>


      </ViewContainer>

    )}
  }

  export const styles = StyleSheet.create({
    login: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 40
    },
    loginButton: {
      borderWidth: 1,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      backgroundColor: '#00f260',
      borderColor: '#00f260'
    },
    loginButtonText: {
      padding: 10,
      fontSize: 16,
    },
    textInput: {
      borderBottomWidth: .70,
      fontSize: 16,
      borderColor: 'rgba(0, 0, 0, .38)',
      marginLeft: 30,
      marginRight: 30,
      paddingVertical: 6
    },
    view: {
      backgroundColor: 'white',
      shadowOpacity: 5,
      marginLeft: 30,
      marginRight: 30,
      paddingBottom: 30,
      paddingTop: 30,
      marginTop: 75
    },
    text: {
      fontSize: 14,
      marginLeft: 30,
      marginRight: 30,
      paddingTop: 50,
      paddingBottom: 10,
      },
      heading: {
        fontSize: 28,
        color: '#0575e6',
        paddingBottom: 15,
        textAlign: 'center'
      }

  })
