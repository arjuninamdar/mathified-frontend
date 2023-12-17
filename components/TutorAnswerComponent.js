import {useState, useEffect} from 'react'; 
import TutorAnswerContainer from '../containers/TutorAnswerContainer';
import styles from '../styles/TutorAnswer.module.css'; 

export default function TutorAnswerComponent() {
    const[loaded, setLoaded] = useState(false); 
    const[questions, setQuestions] = useState([]); 

    const[loading, setLoading] = useState(false); 

    useEffect(async () => {
        const token = localStorage.getItem("token");

        await fetch('/question/allunanswered', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          .then((res) => res.json())
          .then(res => {
            setQuestions(res);
            setLoaded(true); 
          }); 
    }, []); 

    async function handleSubmit(e, id, answerText) {
        e.preventDefault(); 
        const token = localStorage.getItem("token");

        setLoading(true); 
        
        let response = await fetch("/answer/add", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: "POST",
            credentials: "include", 
            body: JSON.stringify({
              questionId: id,
              answer: answerText
            })
        });

        setLoading(false); 

        if(response.status == 200){
            let newArr = [];

            for(let i = 0; i < questions.length; ++i) 
              if(questions[i].questionId != id)
                newArr.push(questions[i])
            
            setQuestions(newArr); 
        }
    }

    if(!loaded)
        return <h1 className={styles.importantbigtext}>Loading...</h1>

    if(questions.length == 0)
        return <h1 className={styles.importantbigtext}>There are no unanswered questions</h1>


    return (
        <div id={styles.mainmainmaincontainer}>
             { questions.map((questions) => <TutorAnswerContainer q={questions} handleSubmit={handleSubmit} /> ) }
             { loading ? <h1 className={styles.importantbigtext}>Loading...</h1>: null}
        </div>
    )

}