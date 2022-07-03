import { useContext } from "react";
import { Card } from "react-bootstrap";
import { M } from "../../constants";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-card.module.scss";

/**
 * TODO
 * @props
 *  - openModal: a function to fire the model for selected course
 *  - course: course code in format ABCDXXX
 *  - title: course short description
 *  - available seats: unoccupied seats on the course
 *  - section_count: number of offered sections
 * ? state
 * 
 * ! restrict access to signed in users only
 * ! handle translation and themes
 *
 * @returns a card that displays course information, and available seats, and total seats
 *
 */
function CourseCard({ course, title, section_count, available_seats, openModal }) {

    // ? base state
    const { user } = useContext(UserContext);
   
    // ? utility functions 
    const colorCount = () => {
        // color coding according to a pred-defined range
        if(available_seats < 15) {
            return { color: "rgb(255, 75, 75)" }
        }
        else if (available_seats < 30){
            return { color: "rgb(255, 129, 50)" };
        } else {
            return { color: "#00ead3" };
        }
    }

  return (
    <>
      <Card
        onClick={openModal}
        style={{ borderRadius: 8 }}
        className={
          "shadow border-0 " +
          styles.Cardholder +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["course-header"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {/* course code and title vertically */}
          <div className={styles["course-code"]}>{course}</div>
          <div className={styles["course-title"]}>{title}</div>
        </Card.Header>
        <Card.Body className={styles["course-body"]}>
          {/* number of sections, and the number of available seats */}
          <div className={styles["section-num"]}>
            <span className={styles["text"]}>Sections</span>

            <span className={styles["numeric"]}>{section_count}</span>
          </div>
          <div className={styles["divider"]}></div>
          <div className={styles["seats-num"]}>
            <span className={styles["text"]}>Available Seats</span>
            <span style={colorCount()} className={styles["numeric"]}>{available_seats}</span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CourseCard;
