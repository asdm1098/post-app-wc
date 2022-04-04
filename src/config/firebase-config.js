import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBxVLEC6yC52syEeqpDL3_l5sayGf7-JJs",
//   authDomain: "post-app-8eef6.firebaseapp.com",
//   projectId: "post-app-8eef6",
//   storageBucket: "post-app-8eef6.appspot.com",
//   messagingSenderId: "848184802503",
//   appId: "1:848184802503:web:659f7c6f2615b5afe7d2e2"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

  //variable de entorno verlas
 // console.log(process.env);

/*
const firebaseConfigTesting = {
    apiKey: "AIzaSyBCsdKUJ-5CMGU3XMQDUzeRSqDjV_9hR30",
    authDomain: "redux-demo-pruebas.firebaseapp.com",
    databaseURL: "https://redux-demo-pruebas.firebaseio.com",
    projectId: "redux-demo-pruebas",
    storageBucket: "redux-demo-pruebas.appspot.com",
    messagingSenderId: "723814828715",
    appId: "1:723814828715:web:cff66e4ffa1c18e06545ee"
  };

  if ( process.env.NODE_ENV === 'test' ) {
      //testing
      firebase.initializeApp(firebaseConfigTesting);

  } else {
      //dev/prod
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  };

*/
  //Para grabar información y google Auth Provider
  
  
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); 
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db, 
      googleAuthProvider,
      firebase
  }