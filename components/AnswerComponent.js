import { useEffect, useState } from "react";
import AnswerContainer from '../containers/AnswerContainer';
import styles from '../styles/Answer.module.css' 

export default function AnswerComponent(props) {
    const[loaded, setLoaded] = useState(false); 
    const[answer, setAnswer] = useState([]); 

    useEffect(async () => {
        const token = localStorage.getItem("token");

        await fetch('/answer/getall/?questionId=' + props.id, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          .then((res) => res.json())
          .then(res => {
            console.log(res); 
            setAnswer(res); 
          }).catch((e) => {
              setLoaded(true); 
          }); 

          setLoaded(true); 

    }, []); 

    if(!loaded) {
        return <h1>Loading...</h1>
    }

    if(answer.length == 0)
        return <h1>There are no answers to this question yet</h1>

    return (
        <div>
            { answer.map((ans) => <AnswerContainer ans={ans} /> ) }
        </div>
    ); 
    
}