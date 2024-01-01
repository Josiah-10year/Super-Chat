import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore';

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

      <section>
        {user ? <ChatRoom /> : <SignIn />}//turanary operator if user show chatroom else show sign in
      </section>

    </div>
  );
}

function SignIn() {
  
  return(
    <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser &&(
    <button onClick={() => auth.signOut()}> Sign Out</button>
  )
}

function ChatRoom(){

  const msgRef = firestore.collection('messages');//ref to database
  const query = msgRef.orderBy('createdAt').limit(25);//subset of doc 

  const[messages] = useCollectionData(query, {idField: 'id'});//listen to updates real time

  return(
    <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}//sends key prop & msg ID
    </div>

    <div>
    </div>
    </> 
    )

}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;

  return <p>{text}</p>  
}

export default App;
