import * as firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCYjg9w7bAyjyG6OB7GrdXXK1VI7CnsQk0",
    authDomain: "barter-app-25bb2.firebaseapp.com",
    projectId: "barter-app-25bb2",
    storageBucket: "barter-app-25bb2.appspot.com",
    messagingSenderId: "1041817365018",
    appId: "1:1041817365018:web:e7ce24796e98221d5a7fa3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();