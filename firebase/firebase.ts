// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd28Bvb32vwI6yE-cKUSeXMTNb3YfPPIs",
  authDomain: "xsmlra.firebaseapp.com",
  projectId: "xsmlra",
  storageBucket: "xsmlra.firebasestorage.app",
  messagingSenderId: "193736377604",
  appId: "1:193736377604:web:6fb91ddf409d781038fc51",
  measurementId: "G-N0YQTMWDH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
