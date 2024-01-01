import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';  

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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header >
        SuperChat
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return(
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate</p>
    </>
  )
}

function SignOut(){
  return auth.currentUser &&(
    <button onClick={() => auth.signOut()}> Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef();

  const msgRef = firestore.collection('messages');//ref to database
  const query = msgRef.orderBy('createdAt').limit(25);//subset of doc 

  const[messages] = useCollectionData(query, {idField: 'id'});//listen to updates real time

  const [formValue, setFormValue] = React.useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await msgRef.add({//creatiion of doc in db
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL
    })

    setFormValue('');
  }

  return(
    <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>

    
    <form>
      <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}/>

      <button type="submit">Send</button>
      
    </form>
    </> 
    )

}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'; 

  return(
    <div className={`message ${messageClass}`}>

      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
