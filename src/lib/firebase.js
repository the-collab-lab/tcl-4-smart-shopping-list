// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from "firebase/app";
import "firebase/firestore";

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
    apiKey: "AIzaSyBRIyX-A9oiNcN124_i35C0m-aodSkQFSY",
    authDomain: "tcl-4-smart-shopping-list.firebaseapp.com",
    databaseURL: "https://tcl-4-smart-shopping-list.firebaseio.com",
    projectId: "tcl-4-smart-shopping-list",
    storageBucket: "tcl-4-smart-shopping-list.appspot.com",
    messagingSenderId: "725896730402",
    appId: "1:725896730402:web:f571876e80350ab17ff77b"
};

let fb = firebase.initializeApp(config);

export { fb };
