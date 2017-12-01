import * as Firebase from 'firebase'

var config = {
   apiKey: "AIzaSyDBRG2r-2kctx3XVZiVdz3XNNIPMSRnoYY",
   authDomain: "happy-tales.firebaseapp.com",
   databaseURL: "https://happy-tales.firebaseio.com",
 };

 export const firebaseRef = Firebase.initializeApp(config);
