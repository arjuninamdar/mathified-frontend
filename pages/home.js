import Head from 'next/head';
import Authentication from '../components/Authentication';
import styles from '../styles/Home.module.css'
import QuestionComponent from '../components/QuestionComponent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Authentication>
            <div id={styles.homemaincontainer}>
              <h1 id={styles.title}>Mathified</h1>
              <h2 id={styles.subtitle}>Your Questions and Answers</h2>

              <QuestionComponent />

            <a id={styles.addbutton} href="/add"><h1>+</h1></a>
            </div>
        </Authentication>
    </div>
  )
}
