import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'
import Nav from '../components/Nav'


export default class Search extends Component {

  render() {
    return (
      <ViewContainer>
      <StatusbarBackground />
      <View
      style={styles.view}>
      <Text style={styles.heading}>Search</Text>

      <Text style={styles.text}>Location:</Text>

          <TextInput
          style={styles.textInput}
          // onChangeText={(text) => this.setState({location: text})}
          // value={this.state.email}
          placeholder="Zip Code"
          autoCorrect={false}
          returnKeyType="next"
          keyboardApperance="light"
          autoCapitalize="none"
          />
          <Text style={styles.text}>Type:</Text>
          <View style={styles.login}>
          <TouchableOpacity style={styles.loginButton} onPress={this._login}>
          <Text style={styles.loginButtonText}>
          Search
          </Text>
          </TouchableOpacity>
          </View>
          </View>

      <Nav />
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
      height: 30,
      borderBottomWidth: 1,
      borderColor: 'black',
      marginLeft: 30,
      marginRight: 30,
      marginBottom:10
    },
    view: {
      backgroundColor: 'white',
      shadowOpacity: 5,
      marginLeft: 30,
      marginRight: 30,
      paddingBottom: 30,
      paddingTop: 30,
      marginTop: 100,
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
        paddingBottom: 10,
        textAlign: 'center'

      }

  })
