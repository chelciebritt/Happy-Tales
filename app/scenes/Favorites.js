import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";

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

    fetchData = async () => {
      const response = await fetch("https://api.petfinder.com/pet.find?format=json&key=853aa0b2ae20f99be52beec7f44c1812&output=full&location=80301");
      const json = await response.json();
      console.log(response);
      this.setState({ data: json.results });
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
        <TouchableOpacity>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
            <ListItem
            roundAvatar
            avatar={{ uri:item.picture.thumbnail }}
            title={`${result.petfinder.pets.pet.name.$t}`}
          />}
          />
          </TouchableOpacity>
          </List>
        </View>
        <Nav />
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
