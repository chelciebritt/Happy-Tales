'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import flattenStyle from 'flattenStyle';
import CardStack from 'react-native-card-stack';

export default class SwipeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allCards: [],

    };
  }

  componentWillMount() {
    this.pullUsers();
  }

  async pullUsers() {
    try {
      let response = await fetch ('https://api.petfinder.com/pet.find?format=json&key=853aa0b2ae20f99be52beec7f44c1812&output=full&location=80301');
      let result = await response.json();
      console.log(response);
      let resultKeyed = []
      for (var i = 0; i < result.petfinder.pets.pet.length; i++){
        result.petfinder.pets.pet[i].key = result.petfinder.pets.pet[i].name.$t;
        resultKeyed.push(result.petfinder.pets.pet[i]);
      }
      this.setState({
        allCards: resultKeyed
      });
      let selection = []
      for (var i = 0; i < 3; i++){
        selection.push(this.state.allCards.shift(i))
      }
      this.setState({
        allCards: this.state.allCards,
        displayedCards: selection.reverse()
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }


  renderCard(cardObject) {
    return(
      <View style={Styles.card}>
        <View style={Styles.cardTop}/>
        <View style={Styles.cardImageBorder}/>
        <Image source={{uri: cardObject.media.photos.photo[2].$t}} style={Styles.cardImage}/>
        <View style={Styles.cardText}>
         <Text style={Styles.cardTextMain}>{cardObject.name.$t.toUpperCase()}</Text>
          <Text style={Styles.cardTextSecondary}>Age: {cardObject.age.$t} </Text>
          <Text style={Styles.cardTextSecondary}>Gender: {cardObject.sex.$t.toUpperCase()}</Text>
          <Text style={Styles.cardTextTerciary}>{cardObject.description.$t}</Text>
          <View style={Styles.buttons}>
           <TouchableOpacity>
            <Image
              style={Styles.info}
              source={require('../images/info.png')}
             />
             </TouchableOpacity>
             <TouchableOpacity>
              <Image
                style={Styles.heart}
                source={require('../images/likes.png')}
              />
              </TouchableOpacity>
           </View>
        </View>

      </View>
    )
  }

  render() {
    return (
      <CardStack
        cardList={this.state.displayedCards}
        renderCard={this.renderCard}
        cardHeight={flattenStyle(Styles.card).height}
        cardWidth={flattenStyle(Styles.card).width}
        cardRotation={20}
        cardOpacity={0.5}
        leftSwipeThreshold={-150}
        rightSwipeThreshold={150}
              />
    );
  }
}

const Styles = StyleSheet.create({
  buttons: {
  flexDirection: 'row',
   },
   info: {
     marginRight: 45
   },
   heart: {
     marginLeft: 45
   },
  card: {
    height: 850,
    width: 370,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  cardImage: {
    position: 'absolute',
    left: 85,
    top: 110,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: '#FFF',
    borderWidth: 4,
    backgroundColor: '#1E90FF'
  },
  cardImageBorder: {
    position: 'absolute',
    left: 83.5,
    top: 108.5,
    width: 183,
    height: 183,
    borderRadius: 91.5,
    backgroundColor: '#A9A9A9'
  },
  cardText: {
    position: 'absolute',
    left: 0,
    top: 300,
    width: 350,
    alignItems: 'center',
    padding: 20
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 25,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 18,
    color: 'grey',
    backgroundColor: 'transparent'
  },
  cardTextTerciary: {
    textAlign: 'left',
    fontSize: 18,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingTop: 10
  }
});
