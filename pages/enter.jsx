import Image from "next/image"
import { auth, googleAuthProvider } from "../lib/firebase"
import { signInWithPopup, signInAnonymously, signOut } from 'firebase/auth'
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { getDoc, getFirestore, doc, writeBatch } from "firebase/firestore"
import debounce from "lodash.debounce"

export default function Enter(props) {
    const { user, username } = useContext(UserContext)
  
    // 1. user signed out <SignInButton />
    // 2. user signed in, but missing username <UsernameForm />
    // 3. user signed in, has usern ame <SignOutButton />
    return (
      <main>
        {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
      </main>
    )
  }

function SignInButton() {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider)
    }
  
    return (
      <>
        <button className="btn-google" onClick={signInWithGoogle}>
          <Image src={'/google.png'} width={30} height={30} alt="Google logo auth" /> Sign in with Google
        </button>
      </>
    )
  }

function SignOutButton() {
    return <button onClick={() => signOut(auth)}>Sign out</button>
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setIsLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username);
        const snap = await getDoc(ref);
        console.log('Firestore read executed!', snap.exists());
        setIsValid(!snap.exists());
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const userDoc = doc(getFirestore(), "users", user.uid)
      const usernameDoc = doc(getFirestore(), "username", formValue)
  
      const batch = writeBatch(getFirestore())
      batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName})
      batch.set(usernameDoc, {uid: user.uid})
  
      await batch.commit()
    } catch (error) {
      console.log(error)
    }
  }
    
    return (
      !username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input name="username" placeholder="username" value={formValue} onChange={onChange} />
            <UsernameMassage username={formValue} isValid={isValid} isloading={isLoading} />
            <button type="submit" className="btn-green" disabled={!isValid}>
              Choose
            </button>

            <h3>Debug Stats</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {isLoading}
              <br />
              Valid: {isValid}
            </div>
          </form>
        </section>
      )
    )
}

function UsernameMassage({ username, isValid, isLoading }) {
  if (isLoading) {
    return <p>Checking ...</p>
  } else if (isValid) {
    return <p className="text-succes">{username} is avilible!</p>
  } else if (username && !isValid) {
    return <p className="text-danger">This user name is taken!</p>
  } else {
    return <p></p>
  }
}