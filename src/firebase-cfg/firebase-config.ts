import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyBgLTC43AVYwRzOjY2Q68ZSIwuQUc5Ga38",
    authDomain: "login-e1880.firebaseapp.com",
    projectId: "login-e1880",
    storageBucket: "login-e1880.appspot.com",
    messagingSenderId: "377608874481",
    appId: "1:377608874481:web:489375312f21daff29fc50",
    measurementId: "G-SRYZ1B71W3"
};

const firebaseApp = firebase.default.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
