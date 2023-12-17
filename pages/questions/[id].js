import { useRouter } from 'next/router'; 
import { useEffect, useState } from 'react';
import AnswerComponent from '../../components/AnswerComponent';

import styles from '../../styles/Answer.module.css'

export default function FindQuestion() {
    const router = useRouter(); 
    const { id } = router.query; 
    
    const[question, setQuestion] = useState(null); 
    const[loaded, setLoaded] = useState(false);
    
    useEffect(async () => {
        if(id == undefined)
            return; 
        
        const token = localStorage.getItem("token");

        await fetch('/question/getuser/' + id, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          .then((res) => res.json())
          .then(res => {
            console.log(res); 
                setQuestion(res); 
          }).catch((e) => {
            setLoaded(true); 
            }); 

          setLoaded(true); 
    }
    
    , [id]); 


    if(!loaded)
        return <h1>Loading...</h1>

    if(question == null)
        return <h1>Question not found</h1>


    return (
        <div id={styles.maincontainer}>
            <a href="/home" id={styles.logo}>Mathified</a>
            <h1>Question</h1>
            <h2>{question.question}</h2>
            <h3>Date Posted: {question.dateTimePosted}</h3>
            <img src={question.imagePath} />

            <div >
                <h2 id={styles.answertitle}>Answers Posted</h2>
                <AnswerComponent id={question.questionId}/>
            </div>
        </div>
    );

    
}
