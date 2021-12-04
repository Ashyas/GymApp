import * as firebase from 'firebase/app'

import "firebase/storage"

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCuBVtdjghZU7caV63G6goIuKh46NxHEEk",
    authDomain: "gymapp-b60ab.firebaseapp.com",
    databaseURL: "https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gymapp-b60ab",
    storageBucket: "gymapp-b60ab.appspot.com",
    messagingSenderId: "919859984535",
    appId: "1:919859984535:web:df5dc0cfcf536b2a1d91d2",
    measurementId: "G-E2J4RLZLCQ"
  };
  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);