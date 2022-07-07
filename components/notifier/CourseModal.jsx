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
 * @selectedSections to store the checked sections and broadcast the result to the off-canvas
 * @sections to store all sections under the selected course
 * ? props
 * @show a visibility state passed via props
 * @course the course code
 * @title the course title
 * @type the type of course sections
 * @close a function to sync the state with the notifier page
 * @saveTracked a function to broadcast the information to the notifier page
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
  

  useEffect(() => {
    if (props.show) {
      setSections([]);
      fetchData();
    }
  }, [props.show]);

  //FIXME a mock function to replicate an API fetching behavior

  const fetchData = () => {};

  // ? utility functions

  // function to toggle section tracking
  const toggleSection = (section_num) => {
    if(sections.includes(section_num)){
      setSections([...sections.filter(sec => sec != section_num)])
    } else {
      setSections(state => [...state, section_num]);
    }
  };

  // a function to broadcast confirmed sections to the off canvas
  const trackSections = () => {
    props.updateTracked({
      course: props.course,
      sections: sections
    });
  }

  // returns a list of section card elements
  const populateSections = (course) => {
    // console.log(sections.map(e => {
    //   return <SectionCard />
    // }));
    return [
      <SectionCheckbox
        details={[
          {
            instructor: "Dr. Muhab Abubaker booga bogga",
            type: "Lecture",
            days: "UTR",
            startTime: "1150",
            endTime: "1245",
            seats: 35,
            waitlist: 4,
            building: "76",
            room: "2233",
          },
          {
            instructor: "",
            type: "Lab",
            days: "W",
            startTime: "0950",
            endTime: "1145",
            seats: 0,
            waitlist: 5,
            building: "76",
            room: "1145",
          },
        ]}
        section_num={43}
        toggleCheck={toggleSection}
        hybrid
      />,
      <SectionCheckbox
        details={[
          {
            instructor: "Dr. Muhab Abubaker booga bogga",
            type: "Lecture",
            days: "MW",
            startTime: "1150",
            endTime: "1245",
            seats: 20,
            waitlist: 4,
            building: "76",
            room: "2233",
          }
        ]}
        section_num={20}
        toggleCheck={toggleSection}
        
      />,
    ];
  };

  // storing all selected sections, by firing a mutation
  const saveTracked = () => {};
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
    } else {
      return (
        <div
          style={{ backgroundColor: "rgb(241, 10, 118)" }}
          className={styles["sections-type"]}
        >
          {langState.hybridLabel}
        </div>
      );
    }
  };

  // when the selected course changes, update the modal contents
  useEffect(() => {
    fetchData();
    populateSections();
  }, [props.course]);

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
            <div className={styles["instructions"]}>
              {langState.instruction}
            </div>
            <div className={styles["sections-container"]}>
              {populateSections()}
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
                props.saveTracked();
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
