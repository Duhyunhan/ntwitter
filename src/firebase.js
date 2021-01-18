import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB6rPkpmN-yBzaCp1Xb1kXLdeHdAnoJBNE",
    authDomain: "ntwitter-f5ba3.firebaseapp.com",
    projectId: "ntwitter-f5ba3",
    storageBucket: "ntwitter-f5ba3.appspot.com",
    messagingSenderId: "689456407117",
    appId: "1:689456407117:web:1d8ea79b0191488a267204"
  };

  firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;// 무슨 차이인지 잘 모르겠음 
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();