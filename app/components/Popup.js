import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';

import StatusbarBackground from './StatusbarBackground'
import ViewContainer from './ViewContainer'


export default class Popup extends Component {

 state = {
   modalVisible: false,
  }

  setModalVisible(visible) {
  this.setState({modalVisible: visible});
 }

 render() {
   return (
     <ViewContainer>
     <StatusbarBackground />
      <View style={{marginTop: 22}}>
      <Modal
       animationType="slide"
       transparent={false}
       visible={this.state.modalVisible}
       onRequestClose={() => {alert("Modal has been closed.")}}
        >

        <View style={{marginTop: 22}}>
        <View>
        <Text>Hello World!</Text>


        <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible)
        }}>
        <Text>Hide Modal</Text>
        </TouchableHighlight>
        </View>
        </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true) }}>
          <Text>Show Modal</Text>
          </TouchableHighlight>
          </View>
          </ViewContainer>
         );
        }
       }
