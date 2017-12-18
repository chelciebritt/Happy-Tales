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




export default class Backup extends Component {

    data = [
      "https://dog.ceo/api/img/retriever-flatcoated/n02099267_3044.jpg",

      "https://dog.ceo/api/img/newfoundland/n02111277_1298.jpg",

      "https://dog.ceo/api/img/saluki/n02091831_11177.jpg",

      "https://dog.ceo/api/img/pinscher-miniature/n02107312_3368.jpg",

      "https://dog.ceo/api/img/terrier-silky/n02097658_4081.jpg",

      "https://dog.ceo/api/img/terrier-westhighland/n02098286_5621.jpg",

      "https://dog.ceo/api/img/collie-border/n02106166_5057.jpg",

      "https://dog.ceo/api/img/stbernard/n02109525_14249.jpg",

      "https://dog.ceo/api/img/shiba/shiba-13.jpg",

      "https://dog.ceo/api/img/terrier-sealyham/n02095889_3734.jpg",

      "https://dog.ceo/api/img/setter-gordon/n02101006_1153.jpg",

      "https://dog.ceo/api/img/retriever-chesapeake/n02099849_2416.jpg",

      "https://dog.ceo/api/img/bullterrier-staffordshire/n02093256_5711.jpg",

      "https://dog.ceo/api/img/terrier-fox/n02095314_2803.jpg",

      "https://dog.ceo/api/img/hound-basset/n02088238_1944.jpg",

      "https://dog.ceo/api/img/dingo/n02115641_1574.jpg",

      "https://dog.ceo/api/img/mountain-swiss/n02107574_140.jpg",

      "https://dog.ceo/api/img/terrier-tibetan/n02097474_4106.jpg",

      "https://dog.ceo/api/img/schipperke/n02104365_8161.jpg",

      "https://dog.ceo/api/img/poodle-miniature/n02113712_3315.jpg",

      "https://dog.ceo/api/img/sheepdog-shetland/n02105855_14781.jpg",

      "https://dog.ceo/api/img/maltese/n02085936_3217.jpg",

      "https://dog.ceo/api/img/stbernard/n02109525_13154.jpg",

      "https://dog.ceo/api/img/african/n02116738_7170.jpg",

      "https://dog.ceo/api/img/basenji/n02110806_6323.jpg",

      "https://dog.ceo/api/img/spaniel-cocker/n02102318_11704.jpg"
]


  constructor(props) {
   super(props);
 }
 state = {
   allCards: [],
   displayedCards: [],
   expandedCards: false,
   url: ''

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

   getRandom = () => {
     var randomString = this.data[Math.floor(this.data.length * Math.random())];
     return randomString
   }

   renderCard = (cardObject) => {
     let details = <View/>;
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
         <Image source={{uri: this.getRandom()}}
         style={Styles.cardImage}/>
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
   };

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
