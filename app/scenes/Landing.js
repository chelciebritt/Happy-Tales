import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import flattenStyle from 'flattenStyle'
import CardStack from 'react-native-card-stack'

import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'
import Nav from '../components/Nav'



export default class Landing extends Component {

  constructor(props) {
   super(props);
   this.state = {
     allCards: [],
     displayedCards: [],
   };
 }

 componentWillMount() {
   this.pullUsers();
 }

 async pullUsers() {
     try {

       let response = await fetch ('https://api.petfinder.com/pet.find?format=json&key=853aa0b2ae20f99be52beec7f44c1812&output=full&location=80002');
       let result = await response.json();
       let resultKeyed = []
       for (var i = 0; i < result.petfinder.pets.pet.length; i++){
         result.petfinder.pets.pet[i].key = result.petfinder.pets.pet[i].name.$t;
         resultKeyed.push(petfinder.pets.pet[i]);
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

   renderCard(cardObject) {
     return(
       <View style={Styles.card}>
         <View style={Styles.cardTop}/>
         <View style={Styles.cardImageBorder}/>
         <Image source={{uri: cardObject.picture.large}} style={Styles.cardImage}/>
         <View style={Styles.cardText}>
           <Text style={Styles.cardTextMain}>{cardObject.name.$t.toUpperCase()}</Text>
           // <Text style={Styles.cardTextSecondary}>{cardObject.location.city.toUpperCase()} </Text>
           // <Text style={Styles.cardTextSecondary}>{cardObject.location.state.toUpperCase()}</Text>
           // <Text style={Styles.cardTextTerciary}>{cardObject.email}</Text>
         </View>
       </View>
     )
   }

   render() {
     return (
       <ViewContainer>
       <StatusbarBackground />

       <Nav />
       </ViewContainer>
       // <CardStack
       //   cardList={this.state.displayedCards}
       //   renderCard={this.renderCard}
       //   cardHeight={flattenStyle(Styles.card).height}
       //   cardWidth={flattenStyle(Styles.card).width}
       //   cardRotation={20}
       //   cardOpacity={0.5}
       //   onSwipeRight={this.handleRemove}
       //   onSwipeLeft={this.handleRemove}
       //   onSwipeUp={this.handleRemove}
       //   onSwipeDown={this.handleRemove}
       //   leftSwipeThreshold={-150}
       //   rightSwipeThreshold={150}
       //   upSwipeThreshold={-150}
       //   downSwipeThreshold={150}
       // />
     );
   }
 }

 // const Styles = StyleSheet.create({
 //   card: {
 //     height: 500,
 //     width: 350,
 //     borderWidth: 1,
 //     borderColor: '#A9A9A9',
 //     borderRadius: 8,
 //     justifyContent: 'center',
 //     alignItems: 'center',
 //     backgroundColor: '#FFF',
 //     overflow: 'hidden'
 //   },
 //   cardTop: {
 //     position: 'absolute',
 //     left: 0,
 //     top: 0,
 //     height: 200,
 //     width: 350,
 //     backgroundColor: '#D3D3D3'
 //   },
 //   cardImage: {
 //     position: 'absolute',
 //     left: 85,
 //     top: 110,
 //     width: 180,
 //     height: 180,
 //     borderRadius: 90,
 //     borderColor: '#FFF',
 //     borderWidth: 4,
 //     backgroundColor: '#1E90FF'
 //   },
 //   cardImageBorder: {
 //     position: 'absolute',
 //     left: 83.5,
 //     top: 108.5,
 //     width: 183,
 //     height: 183,
 //     borderRadius: 91.5,
 //     backgroundColor: '#A9A9A9'
 //   },
 //   cardText: {
 //     position: 'absolute',
 //     left: 0,
 //     top: 300,
 //     width: 350,
 //     alignItems: 'center',
 //     padding: 20
 //   },
 //   cardTextMain: {
 //     textAlign: 'left',
 //     fontSize: 25,
 //     color: '#696969',
 //     backgroundColor: 'transparent',
 //     paddingBottom: 10
 //   },
 //   cardTextSecondary: {
 //     textAlign: 'left',
 //     fontSize: 18,
 //     color: 'grey',
 //     backgroundColor: 'transparent'
 //   },
 //   cardTextTerciary: {
 //     textAlign: 'left',
 //     fontSize: 18,
 //     color: '#696969',
 //     backgroundColor: 'transparent',
 //     paddingTop: 10
 //   }
 // });
