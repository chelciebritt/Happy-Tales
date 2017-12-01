import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground
} from 'react-native';



export default class ViewContainer extends Component{
  render() {
    return (
      <ImageBackground
        source={require('../images/background.png')}
          style={{width: '100%', height: '100%'}}
      >

      <View style={styles.ViewContainer}>
      {this.props.children}
      </View>
      </ImageBackground>
    );
  }
}

const styles=StyleSheet.create({
  ViewContainer:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
})
