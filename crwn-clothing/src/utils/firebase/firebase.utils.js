import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
     } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';  

const firebaseConfig = {
    apiKey: "AIzaSyBYOz8jvfutVrg-tqdWbwlYRohefeUwTmI",
    authDomain: "crwn-db-41da1.firebaseapp.com",
    projectId: "crwn-db-41da1",
    storageBucket: "crwn-db-41da1.appspot.com",
    messagingSenderId: "669940116435",
    appId: "1:669940116435:web:715cf9aaa19d5cd274dd26"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup (auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log (userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log("error creating user", error.message);
        }
    }
    return userDocRef;
  };