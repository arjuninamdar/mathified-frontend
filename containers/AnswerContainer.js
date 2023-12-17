import styles from '../styles/Answer.module.css'; 

export default function AnswerContainer(props) {
    return (
        <div className={styles.answercontainer }>
            <h1 className={styles.answertext}>{props.ans.answer}</h1>
            <h2 className={styles.dateposted}>Date Posted: {props.ans.dateTimeAnswered}</h2>
        </div>
    ); 
}