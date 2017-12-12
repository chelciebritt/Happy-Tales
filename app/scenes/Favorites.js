import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'react-native-elements'
import StatusbarBackground from '../components/StatusbarBackground'

import Communications from 'react-native-communications';


export default class Favorites extends Component {
    state = {
      data: [
{
    name: 'Nettie',
    avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/39977315/1/?bust=1511322245&width=95&-fpm.jpg",
},
{
   name: 'Falcor',
   avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/38943568/1/?bust=1511805005&width=95&-fpm.jpg",
 },
 {
   name: 'Wendy',
   avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/40011570/1/?bust=1511804256&width=95&-fpm.jpg",
 },
 {
   name: 'Sunny',
   avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/40077559/1/?bust=1512408382&width=95&-fpm.jpg",
 },
 {
   name: 'Kelly',
   avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/39797395/1/?bust=1512010173&width=95&-fpm.jpg",
 },
 {
   name: 'Olaf',
   avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/39915995/1/?bust=1510720299&width=95&-fpm.jpg",
 },
 {
   name: 'Kemba',
   avatar_url: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/36446366/1/?bust=1503438064&width=95&-fpm.jpg",
 },
      ]
    };

    render() {
      return (
        <View style={styles.ViewContainer}>
        {this.props.children}
          <View style={styles.header}>
        <StatusbarBackground />
        <Text style={styles.text}>Favorites</Text>
        </View>
        <View style={styles.container}>
        <List>
        <TouchableOpacity onPress={() => Communications.email(['emailAddress1', 'emailAddress2'],null,null,'My Subject','My body text')}>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
            <ListItem
            roundAvatar
            avatar={{ uri: item.avatar_url }}
            title={`${item.name}`}
          />}
          />
          </TouchableOpacity>
          </List>
        </View>

        </View>

      );
    }
  }

  const styles = StyleSheet.create({
    ViewContainer:{
      flex:1,
      flexDirection: 'column',
      overflow: 'hidden'
    },
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    header: {
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: '#0575e6'
    },
    text: {
      fontSize: 28,
      color: 'white',
      textAlign: 'justify',
      paddingBottom: 20,

    }
  });
