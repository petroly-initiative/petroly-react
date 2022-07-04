import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { M } from "../../constants";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-modal.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import translator from "../../dictionary/components/notifier/course-modal";
import sectionsData from "../../mocks/mockData.json"
import SectionCard from "./SectionCard";
/**
 * TODO: create the modal layout and populate it with relevant sections
 * ? state management details
 * 
 * @selectedSections to store the checked sections and broadcast the result to the off-canvas
 * @sections to store all sections under the selected course
 * ? props
 * @show a visibility state passed via props
 * @course the course code
 * @title the course title
 * @type the type of course sections
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

  // ? instance base
  const [selectedSections, setSelectedSections] = useState([]);
  const [sections, setSections] = useState([]);

  // ? utility functions
  const toggleSection = (e) => {
    if (selectedSections.contains(e.target.id)) {
      // delete
      selectedSections.filter((section) => section !== e.target.id);
    } else {
      selectedSections.push(e.target.value);
    }
  };

  // returns a list of section card elements
  const populateSections = () => {
    setSections = sectionsData.map(section => 
        <SectionCard />)
  };

  // when the selected course changes, update the modal contents
  useEffect(() => {
    populateSections();
  }, [props.course]);

  return (
    <>
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
            {langState.title}
          </Modal.Title>
          <CloseButton
            onClick={() => {
              props.close();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Modal.Header>
        <Modal.Body>
            <section id="meta-container">
                <div id="course-code">{props.course}</div>
                <div id="course-title">{props.title}</div>
            </section>
          <section id ="reminder_section">
            <Alert
              dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
              style={{
                textAlign: `${user.lang === L.AR_SA ? "right" : "left"}`,
              }}
              className={styles["rules"]}
              key={0}
              variant= "primary"
            >
              <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
              <div>{langState.reminder}</div>
            </Alert>
          </section>
          <section id ="sections-container">
            <div>
                {langState.instruction}
            </div>
            {/* populating the list of sections for the course */}
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CourseModal;
