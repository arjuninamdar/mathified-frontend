import Head from 'next/head';
import styles from '../styles/Login.module.css';

import {useState} from 'react'; 

import Router from 'next/router'

import generateAuth from '../components/GenerateAuth';

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const[errorMessage, setErrorMessage] = useState(""); 

  async function handleFormSubmit(e) {
    e.preventDefault(); 

    let isValid = await generateAuth(username, password); 

    if(isValid)
      Router.push("/home"); 
    else
      setErrorMessage("There was an error with your login, please try again")

  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div id={styles.signinmaincontainer}>
            <a href="/" id={styles.signinlogo}>Mathified</a>
            <form onSubmit={async (e) => await handleFormSubmit(e)} id={styles.signinformcontainer}>
                <h2 id={styles.signinformmainbanner}>Sign in</h2>
                <h2 className={styles.signininputbanner}>Username</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="signinemailform" className={styles.signininputform} />
                <h2 className={styles.signininputbanner}>Password</h2>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id={styles.signinpasswordform} className={styles.signininputform} />

                <h3 id={styles.errormessage}>{errorMessage}</h3>
                <input type="submit" id={styles.signinsubmitbutton} value="Continue" />
            </form>

            <h3 id={styles.signindonthaveaccount}>Don't have an account? <a href="/signup">Sign up here</a></h3>
        </div>
    </div>
  )
}
