import Authentication from "../components/Authentication";
import { useState } from 'react'; 
import Head from 'next/head';

import styles from '../styles/AddQuestion.module.css'; 
import Router from "next/router";

export default function Add() {
    const[question, setQuestion] = useState("");
    const[file, setFile] = useState(null);
    const[error, setError] = useState(false);
    const[loading, setLoading] = useState(false); 

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('question', question);

        setLoading(true); 
        
        let response = await fetch("/question/add", {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: "POST",
            credentials: "include", 
            body: formData
        });

        setLoading(false); 

        if(response.status != 200){
            setError(true);
            return;
        }

        if(response.status == 200)
            Router.push("/home"); 


    }

    return (
        <div>
            <Head>
                <title>Add Question</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Authentication>
                <div id={styles.maincontainer}>
                    <h1>Add Question</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea type="text" id={styles.questioninput} placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                        <br />
                        <br />
                        <input type="file" id={styles.filedisplaynone} onClick={(e) => {e.target.value=null; setFile(null)}} onChange={(e) => setFile(e.target.files[0])}/>
                        <label id={styles.labelstyle} htmlFor={styles.filedisplaynone}>Attach image</label>
                        <br />
                        <p style={error ? {display: "inline-block"} : {display: "none"}}>There was an error. File may have not been supported, or may have been too large</p>
                        <br />
                        <input type="submit" className={styles.coolbutton} />
                    </form>

                    {loading ? <h2>Loading...</h2> : null}
                </div>
            </Authentication>
        </div>
    )
}