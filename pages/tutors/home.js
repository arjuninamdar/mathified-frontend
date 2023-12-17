import TutorAnswerComponent from "../../components/TutorAnswerComponent";
import TutorAuthentication from "../../components/TutorAuthentication";

import styles from '../../styles/Home.module.css'

export default function TutorHome() {
   

    return (
        <TutorAuthentication>
            <div>
                <h1 id={styles.title}>Mathified</h1>
                <TutorAnswerComponent />
            </div>
        </TutorAuthentication>
    )
}