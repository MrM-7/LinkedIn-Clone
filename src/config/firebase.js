import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBxDN6V87E9axrDz5syS-ZRs3WpFFn0wZ0",
  authDomain: "linkedin-clone-5cd9f.firebaseapp.com",
  projectId: "linkedin-clone-5cd9f",
  storageBucket: "linkedin-clone-5cd9f.appspot.com",
  messagingSenderId: "600982513501",
  appId: "1:600982513501:web:1cce92e73a47a4a1eaeab4",
  measurementId: "G-J1NK0TF8X1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore(app);
const storage = getStorage(app)

export {
    auth,
    googleProvider,
    db,
    storage
}
