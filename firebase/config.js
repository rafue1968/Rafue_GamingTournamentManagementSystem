import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCl-Ium0w_a3IXuy4FKEBfc9XWR5lI-qkw",
    authDomain: "gaming-tournament-system.firebaseapp.com",
    projectId: "gaming-tournament-system",
    storageBucket: "gaming-tournament-system.firebasestorage.app",
    messagingSenderId: "774077060075",
    appId: "1:774077060075:web:e31a4dce73c940fbf73fae"
  };


  // const app = initializeApp(firebaseConfig)
  // export const auth = getAuth(app);


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  export {auth, firestore}