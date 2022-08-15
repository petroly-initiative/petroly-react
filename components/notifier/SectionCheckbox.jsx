import { useContext, useState, useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { M } from "../../constants";
import translator from "../../dictionary/components/notifier/section-checkbox";
import { IoIosTime } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import { ImLab } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { BsCheckCircleFill } from "react-icons/bs";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/section-checkbox.module.scss";
import { MdContentCopy } from "react-icons/md";
import InstructorPopover from "./InstructorPopover";

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
 * start_time: a string for the starting time
 * end_time: a string for the ending time
 * seats: number of available seats in the section
 * waitlist: number of students in a waitlist (out of five)
 * room_number: an integer representing the room number
 *
 * }
 * @tracked for sections already tracked by the user
 * ? state
 * @checked boolean state
 * @hybrid to indicate that the card variant will include double the information for
 * courses with aingle lab-lecture sections
 * ! handle missing instructor name
 * ! create a link on the instructor name to his potential profile on our platform
 * ! handle language and themes
 * ! two variants for lecture/lab only, and hybrid sections' variant
 * ! unchecking already checked sections shall untrack that section from the user list
 * @returns a card that dispaly section number, building number, status, days, instructor name, time
 */
function SectionCheckbox(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));
  const [isChecked, setChecked] = useState(props.tracked);

  // ? utility functions

  const toggleTrack = () => {
    props.toggleCheck(props.details[0].crn);
    setChecked((state) => !state);
  };

  const generateTimeTable = (days) => {
    var DaysList = days.split("");
    var allDays = {
      U: "Sunday",
      M: "Monday",
      T: "Tuesday",
      W: "Wedensday",
      R: "Thursday",
    };
    return Object.keys(allDays).map((day) => {
      return DaysList.includes(day) ? (
        <OverlayTrigger
          placement="top"
          delay={{ show: 0, hide: 10 }}
          overlay={<Tooltip id="button-tooltip-2">{allDays[day]}</Tooltip>}
        >
          <div className={styles["active-day"]}>{day}</div>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          placement="top"
          delay={{ show: 0, hide: 10 }}
          overlay={<Tooltip id="button-tooltip-2">{allDays[day]}</Tooltip>}
        >
          <div
            className={
              styles["inactive-day"] +
              ` ${user.theme === M.DARK ? styles["dark-day"] : ""}`
            }
          >
            {day}
          </div>
        </OverlayTrigger>
      );
    });
  };

  const copyCrn = (e) => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state == "prompt") {
        // use popMsg utility to signal successful copy
        navigator.clipboard
          .writeText(props.details[0].crn)
          .then(() => {
            props.msgHandler(true, langState.copied);
          })
          .catch(() => {
            props.msgHandler(true, langState.notCopied);
          });
      }
    });
  };

  // ? mappers
  const typeMapper = (obj) => {
    if (obj.class_type === "LEC") {
      return (
        <div className={styles["sections-type"]}>
          {" "}
          <FaBook className={styles["lecture-icon"]} />
          {langState.lectureLabel}
        </div>
      );
    } else if (obj.class_type === "LAB") {
      return (
        <div className={styles["sections-type"]}>
          <ImLab style={{ marginLeft: 4 }} className={styles["lab-icon"]} />
          {langState.labLabel}
        </div>
      );
    } else {
      return (
        <div className={styles["sections-type"]}>
          <ImLab style={{ marginLeft: 4 }} className={styles["lab-icon"]} />
          {obj.class_type}
        </div>
      );
    }
  };

  // to map a color according to a pre-defined number for waitlists and all available seats
  const colorCount = (value) => {
    // color coding according to a pre-defined range
    if (value < 8) {
      return {
        color: "rgb(255, 75, 75)",
      };
    } else if (value < 15) {
      return {
        color: "rgb(255, 129, 50)",
      };
    } else {
      return { color: "#00ead3" };
    }
  };

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  useEffect(() => {
    console.log(props.details[0].id);
  }, []);

  return (
    <>
      {/* ! needs trasnlation */}
      <div
        className={`${
          isChecked ? styles["checked-input"] : styles["unchecked-input"]
        } ${user.theme === M.DARK ? styles["dark-txt"] : ""}`}
      >
        {" "}
        <span className={styles["section-num"]}>
          {" "}
          Section # {props.details[0].section_number}{" "}
          {isChecked && (
            <BsCheckCircleFill className={styles["checked-icon"]} />
          )}
        </span>
        <OverlayTrigger
          placement="top"
          delay={{ show: 0, hide: 50 }}
          overlay={<Tooltip id="button-tooltip-2">{langState.crn}</Tooltip>}
        >
          <button id={`${props.id}-crn`} onClick={copyCrn} className={styles["crn-copy"]}>
            <MdContentCopy />
            <span className={styles["crn-num"]}>{props.details[0].crn}</span>
          </button>
        </OverlayTrigger>
      </div>
      <Card
      id={props.id}
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
          <span
            className={
              styles["instructor-name"] +
              ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
            }
          >
            {props.details[0].instructor_name.trim().length != 0 ? (
              props.details[0].instructor_name
            ) : (
              <>
                {/* translation needed */}
                <CgUnavailable className={styles["unavailable-icon"]} />
                <span className={styles["unavailable-name"]}>
                  {langState.unavailableName}
                </span>
              </>
            )}
            {props.details[0].id && (
              <span>
                <InstructorPopover
                  msg={langState.ratingHeader}
                  img={props.details[0].profilePic}
                  rating={props.details[0].rating}
                  id={props.details[0].id}
                  name={props.details[0].instructor_name}
                  user={user}
                />
              </span>
            )}
          </span>
          <div className={styles["meta-info"]}>
            {" "}
            {typeMapper(props.details[0])}
          </div>
        </Card.Header>
        <Card.Body className={styles["details-block"]}>
          <div className={styles["section-details"]}>
            {props.details[0].class_days !== null && (
              <span className={styles["weekdays"]}>
                {generateTimeTable(props.details[0].class_days)}
              </span>
            )}
            {props.details[0].start_time !== null &&
              props.details[0].building !== null && (
                <div className={styles["loc-time"]}>
                  {props.details[0].start_time !== null && (
                    <span
                      className={
                        styles["time"] +
                        ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                      }
                    >
                      <IoIosTime
                        color="#aaaaaa"
                        className={styles["time-icon"]}
                      />{" "}
                      {props.details[0].start_time.substring(0, 2)}:
                      {props.details[0].start_time.substring(2)}-
                      {props.details[0].end_time.substring(0, 2)}:
                      {props.details[0].end_time.substring(2)}
                    </span>
                  )}
                  {props.details[0].building !== null && (
                    <span
                      className={
                        styles["location"] +
                        ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                      }
                    >
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
                  )}
                </div>
              )}
            {!props.hybrid && (
              <div className={styles["availability-details"]}>
                <span className={styles["seats-left"]}>
                  {langState.seats}
                  <span
                    style={colorCount(props.details[0].available_seats)}
                    className={styles["num-slot"]}
                  >
                    {props.details[0].available_seats >= 0
                      ? props.details[0].available_seats
                      : 0}
                  </span>{" "}
                </span>
                {/* <span className={styles["divider"]}></span> */}
                {/*  replace with a boolean for open waitlist */}
                <span
                  className={
                    styles["waitlist-container"] +
                    ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                  }
                >
                  {langState.waitlist}
                  {props.details[0].waiting_list_count === 5 ? (
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 1000, hide: 300 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          {langState.closed}
                        </Tooltip>
                      }
                    >
                      <span className={styles["waitlist-close"]}></span>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 1000, hide: 300 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          {langState.open}
                        </Tooltip>
                      }
                    >
                      <span className={styles["waitlist-open"]}></span>
                    </OverlayTrigger>
                  )}
                </span>
              </div>
            )}
          </div>
        </Card.Body>
        {props.hybrid && (
          <Card.Footer
            className={
              styles.footerContainer +
              ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
            }
          >
            <div
              className={
                styles["card-header"] +
                ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
              }
            >
              <span className={styles["instructor-name"]}>
                {props.details[1].instructor_name.trim().length != 0 ? (
                  props.details[1].instructor_name
                ) : (
                  <>
                    {/* translation needed */}
                    <CgUnavailable className={styles["unavailable-icon"]} />
                    <span className={styles["unavailable-name"]}>
                      {langState.unavailableName}
                    </span>
                  </>
                )}
                {props.details[0].id && (
                  <span>
                    <InstructorPopover
                      msg={langState.ratingHeader}
                      img={props.details[0].profilePic}
                      rating={props.details[0].rating}
                      id={props.details[0].id}
                      name={props.details[0].instructor_name}
                      user={user}
                    />
                  </span>
                )}
              </span>
              <div className={styles["meta-info"]}>
                {" "}
                {typeMapper(props.details[1])}
              </div>
            </div>
            <div className={styles["section-details"]}>
              {props.details[1].class_days !== null && (
                <span className={styles["weekdays"]}>
                  {generateTimeTable(props.details[1].class_days)}
                </span>
              )}
              {/*  delete the whole container if both features are missing */}
              {props.details[1].start_time !== null &&
                props.details[1].building !== null && (
                  <div className={styles["loc-time"]}>
                    {props.details[1].start_time !== null && (
                      <span
                        className={
                          styles["time"] +
                          ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                        }
                      >
                        <IoIosTime
                          color="#aaaaaa"
                          className={styles["time-icon"]}
                        />{" "}
                        {props.details[1].start_time.substring(0, 2)}:
                        {props.details[1].start_time.substring(2)}-
                        {props.details[1].end_time.substring(0, 2)}:
                        {props.details[1].end_time.substring(2)}
                      </span>
                    )}
                    {props.details[1].building !== null && (
                      <span
                        className={
                          styles["location"] +
                          ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                        }
                      >
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
                    )}
                  </div>
                )}
            </div>
            <div
              className={
                styles["availability-details"] +
                ` ${user.theme === M.DARK ? styles["dark-footer"] : ""}`
              }
            >
              <span className={styles["seats-left"]}>
                {langState.seats}
                <span
                  style={colorCount(props.details[1].available_seats)}
                  className={styles["num-slot"]}
                >
                  {props.details[1].available_seats >= 0
                    ? props.details[1].available_seats
                    : 0}
                </span>{" "}
              </span>
              {/* <span className={styles["divider"]}></span> */}
              {/*  replace with a boolean for open waitlist */}
              <span
                className={
                  styles["waitlist-container"] +
                  ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                }
              >
                {langState.waitlist}
                {props.details[1].waiting_list_count == 5 ? (
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 1000, hide: 300 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {langState.closed}
                      </Tooltip>
                    }
                  >
                    <span className={styles["waitlist-close"]}></span>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 1000, hide: 300 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">{langState.open}</Tooltip>
                    }
                  >
                    <span
                      className={
                        styles["waitlist-open"] +
                        ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                      }
                    ></span>
                  </OverlayTrigger>
                )}
              </span>
            </div>
          </Card.Footer>
        )}

        {/* add a case for hybrid sections */}
      </Card>
    </>
  );
}

export default SectionCheckbox;
