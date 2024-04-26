import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDIex0SQlWiotiL4MkZ0QhmUiChYqcPAA",
  authDomain: "chatbot-81ed5.firebaseapp.com",
  projectId: "chatbot-81ed5",
  storageBucket: "chatbot-81ed5.appspot.com",
  messagingSenderId: "483371209947",
  appId: "1:483371209947:web:72a4c8410a81737b4428fe",
  measurementId: "G-FKS3T32Y6Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
