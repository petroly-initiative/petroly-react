import { useContext, useState, useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ImLab } from "react-icons/im";
import { FaBook } from "react-icons/fa";

import { M } from "../../constants";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-card.module.scss";
import translator from "../../dictionary/components/notifier/course-card";

/**
 * TODO
 * ? props
 *  @openModal a function to fire the model for selected course
 *  @course course code in format ABCDXXX
 *  @title course short description
 *  @type the type of sections: lecture,lecture & lab, hybrid (lab & lecture under one section number)
 *  @available_seats unoccupied seats on the course
 *  @section_count number of offered sections
 * ? state
 *
 * ! restrict access to signed in users only
 * ! handle translation and themes
 *
 * @returns a card that displays course information, and available seats, and total seats
 *
 */
function CourseCard({
  course,
  title,
  section_count,
  seatsAvailable,
  openModal,
  type,
  is_cx,
}) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  // ? utility functions
  const colorCount = () => {
    // color coding according to a pre-defined range
    if (seatsAvailable < 15) {
      return { color: "rgb(255, 75, 75)" };
    } else if (seatsAvailable < 30) {
      return { color: "rgb(255, 129, 50)" };
    } else {
      return { color: "#00ead3" };
    }
  };

  const fireModal = () => {
    openModal(course, title, type);
  };

  const typeMapper = () => {
    const uniformTypes = type.map((e) => e.toUpperCase());
    if (uniformTypes.includes("LECTURE") && uniformTypes.includes("LAB")) {
      return [
        <div className={styles["sections-type"]}>
          <FaBook className={styles["lecture-icon"]} />
          {langState.lectureLabel}
        </div>,
        <div className={styles["divider"]}></div>,
        <div className={styles["sections-type"]}>
          <ImLab className={styles["lab-icon"]} />
          {langState.labLabel}
        </div>,
      ];
    } else if (uniformTypes.includes("LECTURE")) {
      return (
        <div className={styles["sections-type"]}>
          <FaBook className={styles["lecture-icon"]} />
          {langState.lectureLabel}
        </div>
      );
    } else if (uniformTypes.includes("LAB")) {
      return (
        <div className={styles["sections-type"]}>
          <ImLab className={styles["lab-icon"]} />
          {langState.labLabel}
        </div>
      );
    } else if (uniformTypes.includes("HYBRID")) {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 350, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip-2">{langState.hybridTooltip}</Tooltip>
          }
        >
          <div className={styles["sections-type"]}>{langState.hybridLabel}</div>
        </OverlayTrigger>
      );
    } else {
      return <div className={styles["sections-type"]}>{type[0]}</div>;
    }
  };

  return (
    <>
      <Card
        onClick={fireModal}
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
          <div className={styles["header-info"]}>
            {" "}
            <div className={styles["course-code"]}>{course}</div>
            <span
              style={{
                margin: 0,
                color: "#ff00eb",
                fontWeight: "bold",
              }}
            >
              {is_cx ? "CX" : ""}
            </span>
            {typeMapper()}
          </div>
          <div className={styles["course-title"]}>
            {title.replace("&amp;", "&")}
          </div>
        </Card.Header>
        <Card.Body className={styles["course-body"]}>
          {/* number of sections, and the number of available seats */}
          <div className={styles["section-num"]}>
            <span className={styles["text"]}>{langState.sections}</span>

            <span className={styles["numeric"]}>{section_count}</span>
          </div>
          <div className={styles["divider"]}></div>
          <div className={styles["seats-num"]}>
            <span className={styles["text"]}>{langState.seats}</span>
            <span
              style={{
                ...colorCount(),
                fontSize: seatsAvailable > 99 ? "10px" : "",
              }}
              className={styles["numeric"]}
            >
              {seatsAvailable < 0 ? 0 : seatsAvailable}
            </span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CourseCard;
