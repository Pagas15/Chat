import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const keyFirebase = {
  apiKey: "AIzaSyAgDa94eoTKjoyqicCT2QQmvytHsDmQJl0",
  authDomain: "chat-react-42d30.firebaseapp.com",
  projectId: "chat-react-42d30",
  storageBucket: "chat-react-42d30.appspot.com",
  messagingSenderId: "650333422599",
  appId: "1:650333422599:web:a6ed6430b0b3a201e1d6a2",
  measurementId: "G-B18N03K8N3"
}

firebase.initializeApp(keyFirebase)

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

