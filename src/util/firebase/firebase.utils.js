// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2edbh-Vax3vYQTnkv1wCipR3KpIaRWvA',
  authDomain: 'e-commerce-db-c758a.firebaseapp.com',
  projectId: 'e-commerce-db-c758a',
  storageBucket: 'e-commerce-db-c758a.appspot.com',
  messagingSenderId: '367335093541',
  appId: '1:367335093541:web:f1578cfadd5300834d96cc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const createUserDocFromAuth = async (userAuth) => {
  // Get document reference inside users collection
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnap = await getDoc(userDocRef);
  console.log(userSnap);
  // .exists() checks if that reference for that data in the collection exists
  console.log(userSnap.exists());

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error('Error creating the user', error.message);
    }
  }

  return userDocRef;
};
