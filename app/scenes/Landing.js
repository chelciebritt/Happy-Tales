import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert

} from 'react-native';

import flattenStyle from 'flattenStyle'
import CardStack from 'react-native-card-stack'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'react-native-elements'


import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'


export default class Landing extends Component {

  constructor(props) {
   super(props);
   this.pullImages=this.pullImages.bind(this)

 }
 state = {
   allCards: [],
   displayedCards: [],
   expandedCards: false,
   image: [],
   displayedImages: []
 }

 componentWillMount() {
   this.pullUsers();
 }

 async pullUsers() {
     try {
       let response = await fetch ('https://api.petfinder.com/pet.find?format=json&key=853aa0b2ae20f99be52beec7f44c1812&output=full&location=80301');
       let result = await response.json();
       let resultKeyed = []
       let resultPhotos = []
       for (var i = 0; i < result.petfinder.pets.pet.length; i++){
         result.petfinder.pets.pet[i].key = result.petfinder.pets.pet[i].name.$t;
         resultKeyed.push(result.petfinder.pets.pet[i]);
         this.pullImages();
       }
       this.setState({
         allCards: resultKeyed,
         image: resultPhotos
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

   async pullImages() {
       try {
         let response = await fetch ('https://dog.ceo/api/breeds/image/random');
         let result = await response.json();
         console.log(result.message);
       } catch (err) {
       console.log(err)
       alert(`message: ${err.message}`);
       }
       return result
       }

   handleAdd() {
     if (this.state.allCards.length > 0) {
       let newCard = this.state.allCards.shift()
       let newImage = this.state.image.shift()
       this.setState({
         displayedCards: [newCard, ...this.state.displayedCards],
         displayedImages: [newImage, ...this.state.displayedImages]

       });
     }
   };

   handleRemove = (index) => {
     this.state.displayedCards.pop();
     this.state.displayedImages.pop();

     this.setState({
       displayedCards: this.state.displayedCards,
       displayedImages: this.state.displayedImages

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
        <View style={Styles.ViewContainer}>
        <Text style={Styles.cardTextSecondary}>Age: {cardObject.age.$t}</Text>
        <Text style={Styles.cardTextSecondary}>Gender: {cardObject.sex.$t}</Text>
        <Text style={Styles.cardTextTerciary}>{cardObject.description.$t}</Text>
        </View>)
     }

     return(
       <View style={ this.state.expandedCards ? Styles.expandedCards : Styles.card }>
         <View style={Styles.cardImageBorder}/>
         <Image source={{uri: cardObject.image}} style={Styles.cardImage}/>

         <View style={Styles.cardText}>
          <Text style={Styles.cardTextMain}>{cardObject.name.$t.toUpperCase()}</Text>
          <View style={Styles.buttons}>
           <TouchableOpacity
           onPress= {() => {
             this.setState({expandedCards: !this.state.expandedCards})
           }}
           >
            <Image
              style={Styles.info}
              source={require('../images/info.png')}
             />
             </TouchableOpacity>
             <TouchableOpacity
             onPress={() => {
               Alert.alert('Added to your favorites!');
  }}
             >
              <Image
                style={Styles.heart}
                source={require('../images/likes.png')}
              />
              </TouchableOpacity>
           </View>

           {details}
         </View>
       </View>

     )
   }

   render() {
     return (
       <ViewContainer>
       <View style={Styles.ViewContainer}>
       {this.props.children}
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
       />
       </View>
       </ViewContainer>
     );
   }
 }

 const Styles = StyleSheet.create({
   ViewContainer:{
     flex:1,
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'stretch',
   },
  buttons: {
  flexDirection: 'row',
  paddingBottom: 5,
  paddingTop: 5
   },
   info: {
     marginRight: 45,
   },
   heart: {
     marginLeft: 45,
   },
  card: {
    flex: 1,
    top: -20,
    height: 400,
    width: 325,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    marginTop: 335,
    shadowOpacity: .25,

  },
  expandedCards: {
    flex: 1,
    height: 580,
    width: 325,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    marginTop: 222,

    marginBottom: 50
  },
  cardImage: {
    alignItems: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: 'white',
    borderWidth: 4,
    backgroundColor: 'white',
  },
  cardText: {
    alignItems: 'center',
    padding: 20,
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 32,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 16,
    color: '#696969',
    backgroundColor: 'transparent',

  },
  cardTextTerciary: {
    textAlign: 'left',
    fontSize: 12,
    color: '#696969',
    backgroundColor: 'transparent',
    height: 200
  }
});
