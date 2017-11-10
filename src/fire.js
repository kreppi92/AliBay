import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBR3g3G-ujYin0fpky-R-FvTgN2gMkj350",
    authDomain: "alibay-1065c.firebaseapp.com",
    databaseURL: "https://alibay-1065c.firebaseio.com",
    projectId: "alibay-1065c",
    storageBucket: "alibay-1065c.appspot.com",
    messagingSenderId: "399183524517"
};
firebase.initializeApp(config);


export default firebase;