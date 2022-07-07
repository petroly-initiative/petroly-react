import { useContext, useState } from "react";
import { Offcanvas, CloseButton, Button } from "react-bootstrap";
import { M } from "../../constants";
import translator from "../../dictionary/components/notifier/course-canvas";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-canvas.module.scss";
import SectionDisplay from "./SectionDisplay";


/**
 * TODO
 * @param {*} props
 * ? state
 * @courses a list of course objects to populate the off-canvas
 * each object includes the course code and the type and list section
 * @mode [select, view] to toggle batch-deletion of tracked courses
 * @show a visibility state passed for parent control
 * @save a function to update tracked list upon any deletion
 * @close a function to switch off the canvas visibiltiy
 * ! handle themes and languages
 *
 * @returns an off-canvas element that containes all tracked elements' status. ability to refresh, deleting tracking records, and so on
 */
function TrackingCanvas(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  // ? utility functions

  const populateCourses = () => {
    // returns a course block for each course object
  }

    // a function to return all deleted courses to delete from the notifier page
  const deleteSections = () => {

  }

  return (
    <>
      <Offcanvas show={props.show} onHide={props.close}>
        <Offcanvas.Header>
          <div>
            <Offcanvas.Title>
              <h3 className={styles["header-title"]}>{langState.header}</h3>
            </Offcanvas.Title>
            <div>{langState.instructions}</div>
          </div>
          <CloseButton
            onClick={() => {
              props.close();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Offcanvas.Header>
        <Offcanvas.Body className={styles["body-container"]}>
          {/* populate with section display */}
          <SectionDisplay
            course="ACCT210"
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
            toggleCheck={() => {}}
            hybrid
          />
          <SectionDisplay
            course="ACCT310"
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
              }
            ]}
            section_num={25}
            toggleCheck={() => {}}
            
          />
          <SectionDisplay
            course="ACCT310"
            details={[
              
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
            section_num={13}
            toggleCheck={() => {}}
            
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TrackingCanvas;
