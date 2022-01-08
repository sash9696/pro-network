import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBFTRhGqMM5-W7_ocWAVEmrx4SFv5x3lpI",
    authDomain: "pro-networking22.firebaseapp.com",
    projectId: "pro-networking22",
    storageBucket: "pro-networking22.appspot.com",
    messagingSenderId: "523185901821",
    appId: "1:523185901821:web:6e789cd7b8dbf38ac1ee94"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebaseApp.auth();
  
  export {auth};
  export default db;
 

