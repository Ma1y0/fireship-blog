import Head from 'next/head'
import Image from 'next/image'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'
import { toast } from "react-hot-toast"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <Loader show />
      <button onClick={() => toast.success("You have been toasted")}>Click Me</button>
    </div>
  )
}
