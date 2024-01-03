// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC0axCgq2yx9e_25tagBlPFXpLijMlJ7o",
  authDomain: "mapsapp-matan.firebaseapp.com",
  projectId: "mapsapp-matan",
  storageBucket: "mapsapp-matan.appspot.com",
  messagingSenderId: "24494650512",
  appId: "1:24494650512:web:53ca15492a91bc258a5415",
  measurementId: "G-BXC0NR9015",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
