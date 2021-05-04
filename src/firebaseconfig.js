import firebase from 'firebase/app';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB6ZgMkL4vVRhGPb4lPE9ogjqL4z887rXQ",
    authDomain: "fplreact.firebaseapp.com",
    databaseURL: "https://fplreact-default-rtdb.firebaseio.com",
    projectId: "fplreact",
    storageBucket: "fplreact.appspot.com",
    messagingSenderId: "673989926914",
    appId: "1:673989926914:web:5418435491c040fada071b",
    measurementId: "G-SYFGPSE778"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
