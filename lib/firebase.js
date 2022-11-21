import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, where, getDocs, query, limit } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    ****** API KEY ******
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
