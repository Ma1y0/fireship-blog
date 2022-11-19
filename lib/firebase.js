import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, where, getDocs, query, limit } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBXh03wBzjJFAUHWm_RnuOOUGnjSQMpDPc",
    authDomain: "fireblog-18f85.firebaseapp.com",
    projectId: "fireblog-18f85",
    storageBucket: "fireblog-18f85.appspot.com",
    messagingSenderId: "577457230579",
    appId: "1:577457230579:web:4f322cc9d8854d23ebdd86",
    measurementId: "G-BRL6NQSGMW"
}

function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
  }

const firebaseApp = createFirebaseApp(firebaseConfig)

// Auth exports
export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

// Firestore
export const firestore = getFirestore(firebaseApp)

// Storage
export const storage = getStorage(firebaseApp)
export const STATE_CHANGED = 'state_changed'