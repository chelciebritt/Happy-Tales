import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


import Register from './scenes/Auth/Register'
import Login from './scenes/Auth/Login'
import { Router, Scene } from 'react-native-router-flux'
import Landing from './scenes/Landing'
import Nav from './components/Nav'
import Favorites from './scenes/Favorites'
import Search from './scenes/Search'
import Popup from './components/Popup'


export default class happytales extends Component{
  render() {
    return (

      <Popup />

      // <Router>
      // <Scene key={'root'}>
      // <Scene
      //   key={'login'}
      //   component={Login}
      //   initial={true}
      //   hideNavBar={true}
      //   />
      //   <Scene
      //   key={'register'}
      //   component={Register}
      //   />
      //   </Scene>
      //   </Router>
    );
  }
}
