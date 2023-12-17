import { useState } from 'react';
import styles from '../styles/TutorAnswer.module.css'; 

export default function TutorAnswerContainer(props) {
    const[answer, setAnswer] = useState(""); 

    return (
        <div id={styles.maincontainer}>
            <h1>Question</h1>
            <h2>{props.q.question}</h2>
            <h3>Date Posted: {props.q.dateTimePosted}</h3>
            <img src={props.q.imagePath} />

            <form onSubmit={(e) => props.handleSubmit(e, props.q.questionId, answer)}>
                <h2 id={styles.answertitle}>Add an Answer</h2>
                    <textarea type="text" id={styles.questioninput} placeholder="Question" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                    <br />
                    <input type="submit" className={styles.coolbutton} />

            </form>
        </div>
    )
}