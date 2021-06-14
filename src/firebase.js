import firebase from "firebase";

import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDZdQC4YRmqofFrB3di_tXgTQCG20fMrU",
    authDomain: "plunkorders.firebaseapp.com",
    projectId: "plunkorders",
    storageBucket: "plunkorders.appspot.com",
    messagingSenderId: "723953577896",
    appId: "1:723953577896:web:0b1dd079ddd4451ebd379d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
