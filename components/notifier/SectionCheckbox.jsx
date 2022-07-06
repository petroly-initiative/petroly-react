import { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { M } from "../../constants";
import translator from "../../dictionary/components/notifier/section-checkbox";
import { IoIosTime } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import { ImLab } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/section-checkbox.module.scss";

/**
 * TODO
 * ? props
 * @toggleCheck a function that bubbles up the checked selection number to update state
 * @section_num
 * @details a list of one or two (in case of hybrid sections) objects in the following format
 * {
 * building_number: an integer representing the building number
 * instructor: a string of the course instructor full name
 * type: [LAB / LECTURE]
 * days: a string of weekdays' initials
 * startTime: a string for the starting time
 * endTime: a string for the ending time
 * seats: number of available seats in the section
 * waitlist: number of students in a waitlist (out of five)
 * room_number: an integer representing the room number
 *
 * }
 * ? state
 * @checked boolean state
 * @hybrid to indicate that the card variant will include double the information for
 * courses with aingle lab-lecture sections
 * ! handle missing instructor name
 * ! create a link on the instructor name to his potential profile on our platform
 * ! handle language and themes
 * ! two variants for lecture/lab only, and hybrid sections' variant
 * @returns a card that dispaly section number, building number, status, days, instructor name, time
 */
function SectionCheckbox(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));
  const [isChecked, setChecked] = useState(false);

  // ? utility functions

  const toggleTrack = () => {
    props.toggleCheck(props.section_num);
    setChecked((state) => !state);
  };

  const generateTimeTable = (days) => {
    var DaysList = days.split("");
    var allDays = ["U", "M", "T", "W", "R"];
    return allDays.map((day) => {
      return DaysList.includes(day) ? (
        <div className={styles["active-day"]}>{day}</div>
      ) : (
        <div className={styles["inactive-day"]}>{day}</div>
      );
    });
  };

  const typeMapper = (obj) => {
    if (obj.type == "Lecture") {
      return (
        <div
         
          className={styles["sections-type"]}
        > <FaBook className={styles["lecture-icon"]}/>
          {langState.lectureLabel}
        </div>
      );
    } else {
      return (
        <div className={styles["sections-type"]}>
          <ImLab className={styles["lab-icon"]} />
          {langState.labLabel}
        </div>
      );
    }
  };

  // to map a color according to a pre-defined number for waitlists and all available seats
  const colorCount = (value) => {
    // color coding according to a pre-defined range
    if (value < 15) {
      return {
        color: "rgb(255, 75, 75)",
              };
    } else if (value < 30) {
      return {
        color: "rgb(255, 129, 50)",
        
      };
    } else {
      return { color: "#00ead3",  };
    }
  };

  

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  return (
    <>
    {/* ! needs trasnlation */}
      <div
        className={
          isChecked ? styles["checked-input"] : styles["unchecked-input"]
        }
      > Section
        # {props.section_num}
      </div>
      <Card
        onClick={toggleTrack}
        className={
          "shadow border-0 " +
          styles.Cardholder +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}` +
          ` ${
            isChecked
              ? styles["checked-container"]
              : styles["unchecked-container"]
          }`
        }
      >
        <Card.Header
          className={
            styles["card-header"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {/* handle unavailable names */}
          <span className={styles["instructor-name"]}>
            {props.details[0].instructor.trim().length != 0 ? (
              props.details[0].instructor
            ) : (
              <>
                {/* translation needed */}
                <CgUnavailable className={styles["unavailable-icon"]} />
                <span className={styles["unavailable-name"]}>
                  Instructor Name Unavailable
                </span>
              </>
            )}
          </span>
          <div className={styles["meta-info"]}>
            {" "}
            {typeMapper(props.details[0])}
          </div>
        </Card.Header>
        <Card.Body className={styles["details-block"]}>
          <div className={styles["section-details"]}>
            <span className={styles["weekdays"]}>
              {generateTimeTable(props.details[0].days)}
            </span>
            <div className={styles["loc-time"]}>
              <span className={styles["time"]}>
                <IoIosTime color="#aaaaaa" className={styles["time-icon"]} />{" "}
                {props.details[0].startTime.substring(0, 2)}:
                {props.details[0].startTime.substring(2)}-
                {props.details[0].endTime.substring(0, 2)}:
                {props.details[0].endTime.substring(2)}
              </span>

              <span className={styles["location"]}>
                <span>
                  {" "}
                  <HiLocationMarker
                    color="#0091e7"
                    className={styles["location-icon"]}
                  />{" "}
                </span>
                <span>
                  {" "}
                  {props.details[0].building}-{props.details[0].room}
                </span>
              </span>
            </div>
            <div className={styles["availability-details"]}>
              <span className={styles["seats-left"]}>
                <span
                  style={colorCount(props.details[0].seats)}
                  className={styles["num-slot"]}
                >
                  {props.details[0].seats}
                </span>{" "}
                Available seats
              </span>
              <span className={styles["divider"]}></span>
              {/*  replace with a boolean for open waitlist */}
              <span
                className={
                  props.details[0].waitlist == 5
                    ? styles["waitlist-close"]
                    : styles["waitlist-open"]
                }
              >
                {props.details[0].waitlist == 5
                  ? "Waitlist Full"
                  : "Waitlist Open"}
              </span>{" "}
            </div>
          </div>
        </Card.Body>
        {props.hybrid && (
          <Card.Footer className={styles.footerContainer}>
            <div
              className={
                styles["card-header"] +
                ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
              }
            >
              <span className={styles["instructor-name"]}>
                {props.details[1].instructor.trim().length != 0 ? (
                  props.details[1].instructor
                ) : (
                  <>
                    {/* translation needed */}
                    <CgUnavailable className={styles["unavailable-icon"]} />
                    <span className={styles["unavailable-name"]}>
                      Instructor Name Unavailable
                    </span>
                  </>
                )}
              </span>
              <div className={styles["meta-info"]}>
                {" "}
                {typeMapper(props.details[1])}
              </div>
            </div>
            <div className={styles["section-details"]}>
              <span className={styles["weekdays"]}>
                {generateTimeTable(props.details[1].days)}
              </span>
              <div className={styles["loc-time"]}>
                <span className={styles["time"]}>
                  <IoIosTime color="#aaaaaa" className={styles["time-icon"]} />{" "}
                  {props.details[1].startTime.substring(0, 2)}:
                  {props.details[1].startTime.substring(2)}-
                  {props.details[1].endTime.substring(0, 2)}:
                  {props.details[1].endTime.substring(2)}
                </span>

                <span className={styles["location"]}>
                  <span>
                    {" "}
                    <HiLocationMarker
                      color="#0091e7"
                      className={styles["location-icon"]}
                    />{" "}
                  </span>
                  <span>
                    {" "}
                    {props.details[1].building}-{props.details[1].room}
                  </span>
                </span>
              </div>
              <div className={styles["availability-details"]}>
                <span className={styles["seats-left"]}>
                  <span
                    style={colorCount(props.details[1].seats)}
                    className={styles["num-slot"]}
                  >
                    {props.details[1].seats}
                  </span>{" "}
                  Available seats
                </span>
                <span className={styles["divider"]}></span>
                {/*  replace with a boolean for open waitlist */}
                <span
                  className={
                    props.details[1].waitlist == 5
                      ? styles["waitlist-close"]
                      : styles["waitlist-open"]
                  }
                >
                  {props.details[1].waitlist == 5
                    ? "Waitlist Full"
                    : "Waitlist Open"}
                </span>{" "}
              </div>
            </div>
          </Card.Footer>
        )}

        {/* add a case for hybrid sections */}
      </Card>
    </>
  );
}

export default SectionCheckbox;
