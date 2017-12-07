import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,

} from 'react-native';

import flattenStyle from 'flattenStyle'
import CardStack from 'react-native-card-stack'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'
import Nav from '../components/Nav'




export default class Landing extends Component {

  constructor(props) {
   super(props);
 }
 state = {
   allCards: [],
   displayedCards: [],
   expandedCards: false
 }

 componentWillMount() {
   this.pullUsers();
 }

 async pullUsers() {
     try {
       let response = await fetch ('https://api.petfinder.com/pet.find?format=json&key=853aa0b2ae20f99be52beec7f44c1812&output=full&location=80301');
       let result = await response.json();
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
       console.log(err)
       alert(`message: ${err.message}`);

     }
   }

   handleAdd() {
     if (this.state.allCards.length > 0) {
       let newCard = this.state.allCards.shift()
       this.setState({
         displayedCards: [newCard, ...this.state.displayedCards]
       });
     }
   };

   handleRemove = (index) => {
     this.state.displayedCards.pop();
     this.setState({
       displayedCards: this.state.displayedCards
     });
     this.handleAdd();
   };

   renderCard = (cardObject) => {
     let details = <View
    style={{overflow: 'hidden'}}
      />;
     console.log(this.state);
     if(this.state.expandedCards) {
      details = (
        <View>
        <Text>Age: {cardObject.age.$t}</Text>
        <Text style={Styles.cardTextTerciary}>Gender: {cardObject.sex.$t}</Text>
        <Text style={Styles.cardTextTerciary}>Breed: {cardObject.breeds.breed[0].$t}</Text>
        <Text style={Styles.cardTextTerciary}>Mix: {cardObject.mix.$t.toUpperCase()}</Text>
        <Text style={Styles.cardTextTerciary}>Description: {cardObject.description.$t}</Text>
        </View>)
     }

     return(

       <View style={Styles.card}>
         <View style={Styles.cardImageBorder}/>
         <Image source={{uri: cardObject.media.photos.photo[2].$t}} style={Styles.cardImage}/>
         <View style={Styles.cardText}>
          <Text style={Styles.cardTextMain}>{cardObject.name.$t.toUpperCase()}</Text>
           {details}
         </View>



         <View style={Styles.buttons}>
          <TouchableOpacity
          style={{overflow: 'hidden'}}
          onPress= {() => {
            console.log('Card.onPress:', this.state)
            this.setState({expandedCards: !this.state.expandedCards})
          }}
          >
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
     )
   }

   render() {
     return (
       <ViewContainer style={{overflow: 'hidden'}}>
       <StatusbarBackground />
       <CardStack
         cardList={this.state.displayedCards}
         renderCard={this.renderCard}
         cardHeight={flattenStyle(Styles.card).height}
         cardWidth={flattenStyle(Styles.card).width}
         cardRotation={20}
         cardOpacity={0.5}
         onSwipeRight={this.handleRemove}
         onSwipeLeft={this.handleRemove}
         leftSwipeThreshold={-150}
         rightSwipeThreshold={150}
         style={{overflow: 'hidden'}}
       />
       <Nav />
       </ViewContainer>
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
    flex: 1,
    top: -20,
    height: 400,
    width: 325,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  cardImage: {
    alignItems: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: '#FFF',
    borderWidth: 4,
    backgroundColor: '#1E90FF',
    overflow: 'hidden',
  },
  cardText: {
    alignItems: 'center',
    padding: 20,
    overflow: 'hidden'
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 36,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingBottom: 10,
    overflow: 'hidden'

  },
  cardTextTerciary: {
    textAlign: 'left',
    fontSize: 18,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingTop: 10,
    overflow: 'hidden'

  }
});
