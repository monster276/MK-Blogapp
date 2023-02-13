
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAjkj4Plr6y2d6zvAVzyDcTYER7Hnybdms",
  authDomain: "monkey-blog-94f43.firebaseapp.com",
  projectId: "monkey-blog-94f43",
  storageBucket: "monkey-blog-94f43.appspot.com",
  messagingSenderId: "160592971649",
  appId: "1:160592971649:web:8bae5d0b16fcef62fe0a80",
  measurementId: "G-6PRC1WN5SB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export  const auth = getAuth(app)