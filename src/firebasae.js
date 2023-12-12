// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ6SM-tiLyH00VrMTfvKVyma8Kdad1Q7A",
  authDomain: "todoapp-42d78.firebaseapp.com",
  projectId: "todoapp-42d78",
  storageBucket: "todoapp-42d78.appspot.com",
  messagingSenderId: "863635411521",
  appId: "1:863635411521:web:1bc1f30ed6865c55512cc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

const db = getFirestore(app)

export {db, auth}