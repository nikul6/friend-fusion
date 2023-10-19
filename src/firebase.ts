import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAHb3qhi0VRCPOh8KKWcNjka5V47kpYonA",
    authDomain: "socialmedia-ececf.firebaseapp.com",
    projectId: "socialmedia-ececf",
    storageBucket: "socialmedia-ececf.appspot.com",
    messagingSenderId: "785405151672",
    appId: "1:785405151672:web:aa65aa3c45d8e3fd91e74d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, storage };
export default db;