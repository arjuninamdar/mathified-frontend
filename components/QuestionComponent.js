import { useEffect, useState } from "react";
import QuestionContainer from "../containers/QuestionContainer";
import styles from "../styles/Home.module.css"; 

export default function QuestionComponent() {
    const[questions, setQuestions] = useState([]); 
    const[loaded, setLoaded] = useState(false); 

    async function handleDelete(index) {
        const deleteQuestionId = questions[index].questionId; 
        const token = localStorage.getItem("token");

        await fetch('/question/delete?questionId=' + deleteQuestionId, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        .then((res) => {
            if(res.status == 200) {
                let newArr = []; 
                
                for(let i = 0; i < questions.length; ++i){
                    if(i != index)
                        newArr.push(questions[i]); 
                }

                setQuestions(newArr); 


            }
        }); 
        
    }

    useEffect(async () => {
        const token = localStorage.getItem("token");

        await fetch('/question/userquestions', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          .then((res) => res.json())
          .then(res => {
            setQuestions(res.reverse());
            setLoaded(true); 
          }); 
    }, []); 

    if(!loaded){
        return (<h1>Loading...</h1>)
    }

    if(questions.length == 0){
        return (<h1>You have no questions posted</h1>)
    }

    return (
        <div id={styles.questioncontainer}>
            { questions.map((ques, index) => <QuestionContainer ques={ques} key={index} index={index}handleDelete={handleDelete}s/> ) }
        </div>
    );
}