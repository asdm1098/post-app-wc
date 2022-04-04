import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxVLEC6yC52syEeqpDL3_l5sayGf7-JJs",
  authDomain: "post-app-8eef6.firebaseapp.com",
  projectId: "post-app-8eef6",
  storageBucket: "post-app-8eef6.appspot.com",
  messagingSenderId: "848184802503",
  appId: "1:848184802503:web:659f7c6f2615b5afe7d2e2"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//     appId: process.env.REACT_APP_APPID
//   };

  //variable de entorno verlas
 // console.log(process.env);
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); 
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db, 
      googleAuthProvider,
      firebase
  }