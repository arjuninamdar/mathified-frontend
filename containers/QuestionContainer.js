import styles from '../styles/Home.module.css'
import Router from 'next/router'; 

export default function QuestionContainer(props) {
    return (
        <div className={styles.questioncontainermain}>
            <h1 className={styles.questiontitle}>
                {props.ques.question}
            </h1>

            <h2 className={styles.dateposted}>
                Posted: {props.ques.dateTimePosted}
            </h2>

            <button className={styles.questionbutton} onClick={() => Router.push("/questions/" + props.ques.questionId)}>
                <h2>View Answers</h2>
            </button>

            <button className={styles.deleteButton} onClick={() => props.handleDelete(props.index)}>
                <h2>Delete</h2>
            </button>
        </div>
    ); 
}