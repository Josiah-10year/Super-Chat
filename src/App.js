import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBvDuAcrqb8LDTq-Cgy-8XdPiPYyR1kfZ0",
  authDomain: "superchat-9a69c.firebaseapp.com",
  projectId: "superchat-9a69c",
  storageBucket: "superchat-9a69c.appspot.com",
  messagingSenderId: "113222082528",
  appId: "1:113222082528:web:6b1bc57b00b13828db1585"
})

const auth = firebase.auth();
const firestore = firebase.firestore();//store sdk as variable


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
