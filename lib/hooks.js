import { useAuthState } from 'react-firebase-hooks/auth'
import { useState, useEffect, use } from "react"
import { auth, firestore } from "./firebase"
import { doc, onSnapshot, getFirestore } from 'firebase/firestore'

export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)
  
    useEffect(() => {
      let unsubscribe
  
      if (user) {
        const ref = doc(getFirestore(), "users", user.uid)
        unsubscribe = onSnapshot(ref, (doc) => {
         setUsername(doc.data()?.username)
        })
      } else {
        setUsername(null)
      }
  
      return unsubscribe
  
    }, [user])

    return { user, username }

}