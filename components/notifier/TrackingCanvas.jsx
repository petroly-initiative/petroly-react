import { useEffect } from "react";
import { useContext, useState } from "react";
import { Offcanvas, CloseButton, Button } from "react-bootstrap";
import { M } from "../../constants";
import translator from "../../dictionary/components/notifier/course-canvas";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-canvas.module.scss";
import SectionDisplay from "./SectionDisplay";
import mockData from "../../mocks/mockData.json";

/**
 * TODO
 * @param {*} props
 * ? state
 * @trackedCourses a list of course objects to populate the off-canvas
 * each object includes the course code and the type and list section
 * @mode [select, view] to toggle batch-deletion of tracked courses
 * @show a visibility state passed for parent control
 * @save a function to update tracked list upon any deletion
 * @close a function to switch off the canvas visibiltiy
 * ! handle themes and languages
 * ! handling signing off
 * @returns an off-canvas element that containes all tracked elements' status. ability to refresh, deleting tracking records, and so on
 */
function TrackingCanvas(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  // ? utility functions
  // returns a course block for each course object
  // ! this chould be repalced by a fetch call instead
  const populateCourses = () => {
    const uniqueCrn = new Set();
    props.trackedCourses.forEach((course) => {
      uniqueCrn.add(course["crn"]);
    });
    uniqueCrn = Array.from(uniqueCrn);
    const uniqueSections = [];
    uniqueCrn.forEach((crn) => {
      uniqueSections.push(
        props.trackedCourses.filter((course) => course["crn"] == crn)
      );
    });

    // console.log(uniqueSections, uniqueCrn, props.trackedCourses);

    // <SectionDisplay
    //   course={course}
    //   details={sectionObjs}
    //   hybrid={sectionObjs.length === 2}
    //   delete={deleteSections}
    // />
    return uniqueSections.map((sectionObj) => {
      console.log(sectionObj);

      return (
        <SectionDisplay
          details={sectionObj}
          hybrid={sectionObj.length === 2}
          delete={deleteSections}
        />
      );
    });
  };

  // a function to return all deleted courses to delete from the notifier page
  const deleteSections = (crn) => {
    // props.save([...sections.filter((sec) => sec != section_num)]);

    // get all sections from the certain course, and filter
    var courseSections = props.trackedCourses;

    courseSections = courseSections.filter((section) => section["crn"] !== crn);
    courseSections = courseSections.map((section) => ({
      crn: section["crn"],
      term: section["term_code"],
      department: section["department_code"],
    }));

    props.save(courseSections);
  };

  return (
    <>
      <Offcanvas show={props.show} onHide={props.close}>
        <Offcanvas.Header
          className={` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`}
        >
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
        <Offcanvas.Body
          className={
            styles["body-container"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {/* populate with section display */}
          {populateCourses()}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TrackingCanvas;
