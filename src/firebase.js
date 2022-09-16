import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getAuth , GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYgRTyRsujnC5rjiMuykGsV6BYH2eRsq4",
    authDomain: "yt-clone-7978b.firebaseapp.com",
    projectId: "yt-clone-7978b",
    storageBucket: "yt-clone-7978b.appspot.com",
    messagingSenderId: "836496572636",
    appId: "1:836496572636:web:8dad7d8c188964e4b33419"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default storage;

