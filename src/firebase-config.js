import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxskS14W4zM49Tou3dRnS9Ex7h8gmKpQE",
  authDomain: "react-crud-74c55.firebaseapp.com",
  projectId: "react-crud-74c55",
  storageBucket: "react-crud-74c55.appspot.com",
  messagingSenderId: "991658271599",
  appId: "1:991658271599:web:7892981cb5f1b4333f3e9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
