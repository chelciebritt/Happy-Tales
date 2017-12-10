import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

export default class Landing extends Component {

  _search() {
    Actions.search()
  }

  _landing() {
    Actions.landing()
  }

  _login() {
    Actions.login()
  }

  _favorites() {
    Actions.favorites()
  }

  render() {
    return (

      <BottomNavigation
        labelColor="#0575e6"
        rippleColor="#0575e6"
        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
        // onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
      >
        <Tab
          barBackgroundColor='white'
          label="Search"
          icon={<Icon size={24} color="#0575e6" name="search"
          />}
        />
        <Tab
          barBackgroundColor='white'
          label="Pets"
          icon={<Icon size={24} color="#0575e6" name="pets"
           />}
        />
        <Tab
          barBackgroundColor='white'
          label="Favorites"
          icon={<Icon size={24} color="#0575e6" name="favorite"
           />}
        />
        <Tab
          barBackgroundColor='white'
          label="Sign Out"
          icon={<Icon size={24} color="#0575e6" name="https" />}
        />
      </BottomNavigation>

    );
  }
}
