import {
  Modal,
  CloseButton,
  Alert,
  OverlayTrigger,
  Tooltip,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useContext } from "react";
import { M, L, langDirection, USER } from "../../constants";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-modal.module.scss";
import { BiInfoCircle } from "react-icons/bi";
import { FaSave, FaFemale, FaMale } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import translator from "../../dictionary/components/notifier/course-modal";
import SectionCheckbox from "./SectionCheckbox";
import { MdRadar, MdCancel } from "react-icons/md";
import { TbMoodEmpty } from "react-icons/tb";

// import data from "../../mocks/mockData.json";
/**
 * TODO: create the modal layout and populate it with relevant sections
 * ? state management details
 *
 * @sections to store and broadcast all selected sections' CRN under the displayed course
 * ? props
 * @trackedSections all currently tracked sections to allow untracking from the modal itself
 * @show a visibility state passed via props
 * @course the course code
 * @title the course title
 * @type the type of course sections
 * @close a function to sync the state with the notifier page
 * @save a function to broadcast the information to the notifier page
 * ! handle translations and variable themes
 * ! the modal shall be accessed only by logged-in users
 */

const sectionFilters = {
  MALE: 1,
  FEMALE: 0,
  NONE: -1,
};

function CourseModal(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));
  const [filters, setFilters] = useState(sectionFilters.NONE);
  const [is_cx, setCx] = useState(true);

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  // ? instance state
  // to store all selected sections before confirming trackign
  const [sections, setSections] = useState([]);

  // ? utility functions

  // function to toggle section tracking
  const toggleSection = (crn) => {
    if (sections.includes(crn)) {
      setSections([...sections.filter((sec) => sec != crn)]);
    } else {
      const newArr = [...sections, crn];
      setSections((state) => [...newArr]);
    }
  };

  // a function to broadcast confirmed sections to the off canvas
  // ! submitting this modal shall mutate all sections related to this course from the user list
  const trackSections = () => {
    // getting already tracked courses while filtering out sections that existed in the current course
    const otherSections = props.trackedCourses
      .filter(
        (course) =>
          course["subjectCourse"] !== props.course ||
          course["term"] !== props.term.long
      )
      .map((course) => ({
        crn: course["courseReferenceNumber"],
        term: course["term"],
        department: course["subject"],
      }));
    // merging newly tracked courses with already tracked courses
    var newSections = [...sections].map((crn) => ({
      crn: crn,
      term: props.term.long,
      department: props.department,
    }));
    newSections.push(...otherSections);

    props.save(newSections);
  };

  const switchFilter = (e) => {
    setFilters(e.target.value);
  };

  useEffect(() => {
    const courseObjects = props.searchData.filter(
      (obj) => obj["subjectCourse"] === props.course
    );

    if (courseObjects.length !== 0) {
      setCx(courseObjects[0].linkIdentifier === "CX");
    }
  }, [props.course]);

  // returns a list of section card elements
  // ! (1) data filtering should be replaced be a ready-to-go fetch on course change
  // ! (2) some fields are not needed in a checkbox such as the title, course-code, and department
  // ! as they are already presented on the modal header
  // ! (3) section number is preferrably provided outside the detail objects to avoid redundancy
  const populateSections = (courseName, filter) => {
    // getting all sections related to this course
    const courseObjects = props.searchData.filter(
      (obj) => obj["subjectCourse"] === courseName
    );

    // getting all unique section numbers
    var sectionsSet = new Set();
    courseObjects.forEach((course) =>
      sectionsSet.add(course["sequenceNumber"])
    );
    sectionsSet = Array.from(sectionsSet);

    //using filters

    if (filter == sectionFilters.MALE)
      sectionsSet = sectionsSet.filter((section) => section.charAt(0) !== "F");
    else if (filter == sectionFilters.FEMALE)
      sectionsSet = sectionsSet.filter((section) => section.charAt(0) === "F");

    // grouping similar section numbers

    if (sectionsSet.length === 0) {
      return (
        <div className={styles["empty-container"]}>
          <TbMoodEmpty className={styles["empty-icon"]} size="2rem" />
          <span className={styles["empty-msg"]}>{langState.empty}</span>
        </div>
      );
    }

    var filteredObjects = [];

    for (let sectionNum of sectionsSet) {
      filteredObjects.push(
        courseObjects.filter((obj) => obj["sequenceNumber"] == sectionNum)
      );
    }
    // getting all sections that are already tracked
    var trackedSectionSet = new Set();

    if (courseObjects != null) {
      for (let section of props.trackedCourses) {
        trackedSectionSet.add(section["courseReferenceNumber"]);
      }
    }
    trackedSectionSet = Array.from(trackedSectionSet);

    // map to section checkbox components

    return filteredObjects.map((course) => {
      return (
        <SectionCheckbox
          id={`${course[0]["courseReferenceNumber"]}-checkbox`}
          details={course}
          toggleCheck={toggleSection}
          hybrid={course.length == 2}
          tracked={trackedSectionSet.includes(
            course[0]["courseReferenceNumber"]
          )}
          msgHandler={props.msgHandler}
        />
      );
    });
  };

  // storing all selected sections, by firing a mutation
  // dynamic section type labelling
  const typeMapper = (type) => {
    type = type.map((e) => e.toUpperCase());
    if (type.includes("LECTURE")) {
      if (type.includes("LAB")) {
        return [
          <div
            style={{ backgroundColor: "#00a0ea" }}
            className={styles["sections-type"]}
          >
            {langState.lectureLabel}
          </div>,
          <div
            style={{ backgroundColor: "rgb(29, 190, 101)" }}
            className={styles["sections-type"]}
          >
            {langState.labLabel}
          </div>,
        ];
      } else {
        return (
          <div
            style={{ backgroundColor: "#00a0ea" }}
            className={styles["sections-type"]}
          >
            {langState.lectureLabel}
          </div>
        );
      }
    } else if (type.includes("HYBRID")) {
      return (
        <div
          style={{ backgroundColor: "rgb(241, 10, 118)" }}
          className={styles["sections-type"]}
        >
          {langState.hybridLabel}
        </div>
      );
    } else {
      return (
        <div
          style={{ backgroundColor: "rgb(241, 10, 118)" }}
          className={styles["sections-type"]}
        >
          {type[0]}
        </div>
      );
    }
  };

  // ? side effects
  // savign already tracked sections to the sections' state
  useEffect(() => {
    if (props.show) {
      const targetCourse = props.trackedCourses.filter(
        (course) =>
          course["subjectCourse"] === props.course &&
          course["term"] === props.term.long
      );
      setSections(
        targetCourse.map((course) => course["courseReferenceNumber"])
      );
    }
  }, [props.show]);

  return (
    <>
      <style jsx global>{`
        .modal-content {
          border: none !important;
        }
      `}</style>
      <Modal
        show={props.show}
        onHide={() => {
          props.close();
        }}
        size="lg"
        className={styles["modal-container"] + " border-0"}
        scrollable
      >
        <Modal.Header
          style={langDirection(user.lang)}
          className={
            styles.modalHeader +
            " border-0" +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
        >
          <Modal.Title
            className={styles.modalTitle}
            id="example-custom-modal-styling-title"
          >
            <MdRadar className={styles.title_img} size="1.3em" />
            {langState.title}
          </Modal.Title>
          <CloseButton
            style={{ marginLeft: user.lang === L.AR_SA ? "0" : "auto" }}
            onClick={() => {
              props.close();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Modal.Header>
        <Modal.Body
          className={[
            "d-flex flex-column ",
            styles["body-container"],
            `${user.theme === M.DARK ? styles["dark-mode"] : ""}`,
          ]}
        >
          <section className={styles["meta-info"]}>
            <div className={styles["header-info"]}>
              <h2 className={styles["course-code"]}>{props.course}</h2>
              {"  "}
              <h3
                style={{
                  margin: 0,
                  marginLeft: 2,
                  color: "#ff00eb",
                  fontWeight: "bold",
                }}
              >
                {is_cx ? " CX" : ""}
              </h3>
              <span className={styles["divider"]}></span>
              <div className={styles["header-info"]}>
                {typeMapper(props.type)}
              </div>
            </div>
            <h6 className={styles["course-title"]}>
              {props.title.replace(/&amp;/g, "&")}
            </h6>
          </section>
          <section className={styles["reminder-section"]}>
            <Alert
              dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
              style={{
                textAlign: `${user.lang === L.AR_SA ? "right" : "left"}`,
              }}
              className={styles["rules"]}
              key={0}
              variant="primary"
            >
              <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
              <div>{langState.reminder}</div>
            </Alert>
          </section>
          <section className={styles["filters"]}>
            <ButtonGroup className={styles["filters"]}>
              <Button
                className={
                  styles["filter-btns"] +
                  ` ${filters == 1 ? styles["active-filter"] : ""}`
                }
                id={sectionFilters.MALE}
                onClick={(e) => {
                  setFilters(e.target.id);
                }}
              >
                <FaMale /> {langState.male}
              </Button>
              <Button
                className={
                  styles["filter-btns"] +
                  ` ${filters == 0 ? styles["active-filter"] : ""}`
                }
                id={sectionFilters.FEMALE}
                onClick={(e) => {
                  setFilters(e.target.id);
                }}
              >
                <FaFemale /> {langState.female}
              </Button>
            </ButtonGroup>
          </section>
          <section>
            <div
              className={
                styles["instructions"] +
                ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
              }
            >
              {langState.instruction}
            </div>
            <div className={styles["sections-container"]}>
              {populateSections(props.course, filters)}
            </div>
            {/* populating the list of sections for the course */}
          </section>
        </Modal.Body>
        <Modal.Footer
          className={
            styles["modal-footer"] +
            ` ${user.theme === M.DARK ? styles["dark-footer"] : ""}`
          }
        >
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2">{langState.cancelHover}</Tooltip>
            }
          >
            <Button
              onClick={() => {
                props.close();
              }}
              id="create-group-btn"
              // onClick={props.close}
              className={[styles["btns"], styles["cancel-btn"]]}
            >
              <MdCancel size="1.2rem" /> {langState.cancel}
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            trigger={"hover"}
            placement="top"
            delay={{ show: 0, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2">
                {" "}
                {user.status === USER.LOGGED_OUT
                  ? langState.unauth_msg
                  : langState.confirmHover}
              </Tooltip>
            }
          >
            {/* {waiting ? (
              <Button
                onClick={fireEval}
                className={[styles["btns"], styles["submit-btn"]]}
              >
                <Spinner animation="border" role="status" />
              </Button>
            ) : ( */}
            <span style={{ padding: 0 }} className={styles["btns"]}>
              <Button
                disabled={user.status === USER.LOGGED_OUT}
                onClick={() => {
                  trackSections();
                  props.close();
                }}
                className={[styles["btns"], styles["submit-btn"]]}
              >
                <FaSave size="1.2rem" /> {langState.confirm}
              </Button>
            </span>
            {/* )} */}
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseModal;
