import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
      const response = await fetch("https://randomuser.me/api?results=200");
      const json = await response.json();
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
            title={`${item.name.first} ${item.name.last}`}
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
