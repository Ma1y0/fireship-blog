import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { UserContext } from "../lib/context"
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { Router, useRouter } from "next/router"

export default function NavBAr() {
    
    const { user, username } = useContext(UserContext)

    const router = useRouter()

    const signOutNow = () => {
        signOut(auth)
        router.reload()
    }

    return (
        <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">NXT</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOutNow}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                {/* TODO use <Image /> instead */}
                <img src={user?.photoURL} alt="User Picture" />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
    )
}