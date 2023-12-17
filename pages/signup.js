import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import generateAuth from '../components/GenerateAuth';
import Router from 'next/router'



export default function SignUp() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const[errorMessage, setErrorMessage] = useState(""); 


    async function handleFormSubmit(e) {
        e.preventDefault(); 

        if(username == "" || password == ""){
            setErrorMessage("You're missing one or more forms, please try again"); 
            return; 
        }


        await fetch('/createuser', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({username:username, password:password})
          })
          .then(async (res) => {
            if(res.status == 200){
                await generateAuth(username, password);
                Router.push("/home"); 
            }else {
                setErrorMessage("There was an error creating your account, please try again later"); 
            }
          })
          .catch (function (error) {
            setErrorMessage("There was an error creating your account, please try again later"); 
          });
  


        

        
    }

    return (
        <div>
            <Head>
                <title>Sign Up</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
      
            <div id={styles.signupmaincontainer}>
                <div id={styles.signupformcontainer}>
                    <a href="/" id={styles.signupformlogo}>Mathified</a>
                    <h1 id={styles.signupformtitle}>Create account</h1>

                    <form  onSubmit={async (e) => await handleFormSubmit(e)}>
                        <h3 className={styles.signupformmainbanner}>Username</h3>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id={styles.submitformusername} className={styles.submitforminput} />

                        <h3 className={styles.signupformmainbanner}>Password</h3>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id={styles.submitformpassword} className={styles.submitforminput} />

                        <h3 id={styles.errormessage}>{errorMessage}</h3>
                        <input type="submit" className={styles.signupformsubmitbutton} value="Create Account" />
                        <h3 id={styles.alreadyhaveanaccount}>Already have an account? <a href="/signup">Login here</a></h3>
                    </form>
                </div>
            </div>
        </div>
  );
    
}
