import { useContext, useState } from "react";
import { Offcanvas, CloseButton } from "react-bootstrap";
import { M } from "../../constants";
import translator from "../../dictionary/components/notifier/course-canvas";
import { UserContext } from "../../state-management/user-state/UserContext";
import styles from "../../styles/notifier-page/course-canvas.module.scss";


/**
 * TODO
 * @param {*} props
 * ? state
 * @courses a list of course objects to populate the off-canvas
 * @mode [select, view] to toggle batch-deletion of tracked courses
 * @show a visibility state passed for parent control
 * @save a function to update tracked list upon any deletion
 * @close a function to switch off the canvas visibiltiy
 * ! handle themes and languages
 *
 * @returns an off-canvas element that containes all tracked elements' status. ability to refresh, deleting tracking records, and so on
 */
function TrackingMenu(props) {
  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  return (
    <>
      <Offcanvas show={props.show} onHide={props.close}>
        <Offcanvas.Header>
          <div>
            <Offcanvas.Title>{langState.header}</Offcanvas.Title>
            <div>{langState.instructions}</div>
          </div>
          <CloseButton
            onClick={() => {
              props.close();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Offcanvas.Header>
        <Offcanvas.Body>{/* populate with section display */}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TrackingMenu;
