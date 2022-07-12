import { Modal, CloseButton, Alert, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { useContext } from "react";
import { M, L } from "../../constants";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-modal.module.scss";
import { BiInfoCircle } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import translator from "../../dictionary/components/notifier/course-modal";
import mockData from "../../mocks/mockData.json";
import SectionCheckbox from "./SectionCheckbox";
import { MdRadar, MdCancel } from "react-icons/md";
 
// import data from "../../mocks/mockData.json";
/**
 * TODO: create the modal layout and populate it with relevant sections
 * ? state management details
 *
 * @sections to store and broadcast all selected sections under the displayed course
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
function CourseModal(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  // ? instance state
  // to store all selected sections before confirming trackign
  const [sections, setSections] = useState([]);
  

  

  

  // ? utility functions

  // function to toggle section tracking
  const toggleSection = (section_num) => {
    if(sections.includes(section_num)){
      setSections([...sections.filter(sec => sec != section_num)])
    } else {
      const newArr = [...sections, section_num]
      setSections(state => [...newArr]);
    }
  };



  // a function to broadcast confirmed sections to the off canvas
  // ! submitting this modal shall mutate all sections related to this course from the user list
  const trackSections = () => {
    props.save({
      [`${props.course}`]: sections
    }, sections.length === 0);
  }

  // returns a list of section card elements
  // ! (1) data filtering should be replaced be a ready-to-go fetch on course change
  // ! (2) some fields are not needed in a checkbox such as the title, course-code, and department
  // ! as they are already presented on the modal header
  // ! (3) section number is preferrably provided outside the detail objects to avoid redundancy
  const populateSections = (courseName) => {
    // getting all sections related to this course
    const courseObjects = mockData.data.filter(obj => obj["course_number"] == courseName);


    // getting all unique section numbers
    var sectionsSet = new Set();
    courseObjects.forEach(course => sectionsSet.add(course["section_number"]))
    sectionsSet = Array.from(sectionsSet);
    // grouping similar section numbers

    var filteredObjects = [];

    for(let sectionNum of sectionsSet){
      filteredObjects.push(courseObjects.filter(obj => obj["section_number"] == sectionNum))
    }
    // getting all sections that are already tracked
    var trackedSectionSet = new Set();
    if(props.trackedCourses[courseName] != null){
      for (let section of props.trackedCourses[courseName]) {
        trackedSectionSet.add(section);
      }
    }
    trackedSectionSet = Array.from(trackedSectionSet);

    // map to section checkbox components
    
    return filteredObjects.map((course) => {
      return (
      <SectionCheckbox details={course} toggleCheck={toggleSection} 
      hybrid = {course.length == 2} tracked = {trackedSectionSet.includes(course[0]["section_number"])}/>
    )});
  };

  // storing all selected sections, by firing a mutation
  // dynamic section type labelling
  const typeMapper = (type) => {
    if (type.includes("Lecture")) {
      if (type.includes("Lab")) {
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
    } else   if (type.includes("hybrid")) {
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
        </div>);
    }
  };

  // ? side effects
  // savign already tracked sections to the sections' state
  useEffect(() => {
    if (props.show) {
      var trackedSectionSet = new Set();
      console.log("Modal side effect: ", props.trackedCourses);
      if (props.trackedCourses[props.course] != null) {
        console.log(props.trackedCourses[props.course]);
        for (let course of props.trackedCourses[props.course]) {
          trackedSectionSet.add(course);
        }
        trackedSectionSet = Array.from(trackedSectionSet);
        setSections(trackedSectionSet);
      }else{
        setSections([])
      }
    }
  }, [props.show]);

    useEffect(() => {
      console.log("tracked sections:", sections);
    }, [sections]);


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
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        className={styles["modal-container"] + " border-0"}
        scrollable
      >
        <Modal.Header
          className={
            styles.modalHeader +
            " border-0" +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Modal.Title
            className={styles.modalTitle}
            id="example-custom-modal-styling-title"
          >
            <MdRadar className={styles.title_img} size="1.3em" />
            {langState.title}
          </Modal.Title>
          <CloseButton
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
              <h2 className={styles["course-code"]}>{props.course}</h2>{" "}
              <span className={styles["divider"]}></span>
              <div className={styles["header-info"]}>
                {typeMapper(props.type)}
              </div>
            </div>
            <h6 className={styles["course-title"]}>{props.title}</h6>
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
              {populateSections(props.course)}
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
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2"> {langState.confirmHover}</Tooltip>
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
            <Button
              onClick={() => {
                trackSections();
                props.close();
              }}
              className={[styles["btns"], styles["submit-btn"]]}
            >
              <FaSave size="1.2rem" /> {langState.confirm}
            </Button>
            {/* )} */}
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseModal;
