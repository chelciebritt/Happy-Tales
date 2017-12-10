import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

  import { List, ListItem } from 'react-native-elements'
  import StatusbarBackground from '../components/StatusbarBackground'
  import Nav from '../components/Nav'


  export default class Favorites extends Component {
    state = {
      data: []
    };

    componentWillMount() {
      this.fetchData();
    }

    async fetchData() {
       try {
         let response = await fetch ('https://api.petfinder.com/pet.find?format=json&key=853aa0b2ae20f99be52beec7f44c1812&output=full&location=80301');
         let result = await response.json();
         let resultKeyed = []
         for (var i = 0; i < result.petfinder.pets.pet.length; i++){
           result.petfinder.pets.pet[i].key = result.petfinder.pets.pet[i].name.$t;
           resultKeyed.push(result.petfinder.pets.pet[i]);
         }

         this.setState({
           data: resultKeyed
         })
       } catch (err) {
           console.log(err)
           alert(`message: ${err.message}`);

         }
       }


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
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
            <ListItem
            roundAvatar
            avatar={{ uri: item.media.photos.photo[0].$t }}
            title={`${item.name.$t}`}
          />}
          />
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
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      overflow: 'hidden'
    },
    container: {
      flex: 1,
      justifyContent: "center",
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
