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
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import Backup from './scenes/Backup'




export default class happytales extends Component{
  render() {
    return (

<Backup />


     //  <Router>
     //  <Scene key={'root'}>
     //
     //  <Scene
     // key={'login'}
     // component={Login}
     // initial={true}
     // hideNavBar={true}
     // />
     // <Scene
     // key={'register'}
     // component={Register}
     // />
     //  <Scene key="app"
     //   tabs={true}
     //   hideNavBar={true}>
     //    <Scene
     //    key={'Pets'}
     //    component={Landing}
     //    hideNavBar={true}
     //    />
     //    <Scene
     //    key={'Search'}
     //    component={Search}
     //    hideNavBar={true}
     //    />
     //    <Scene
     //    key={'Favorites'}
     //    component={Favorites}
     //    hideNavBar={true}
     //    />
     //    <Scene
     //    key={'Log Out'}
     //    component={Login}
     //    hideNavBar={true}
     //    />
     //    </Scene>
     //    </Scene>
     //    </Router>
    );
  }
}
