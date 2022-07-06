import { useContext, useEffect, useState } from "react";
import { NavContext } from "../state-management/navbar-state/NavbarContext";
import {
  Container,
  DropdownButton,
  Row,
  Col,
  InputGroup,
  Form,
  Button, 
  OverlayTrigger, Tooltip
} from "react-bootstrap";
import styles from "../styles/notifier-page/courses-list.module.scss";
import { useRef } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import  Head  from "next/head";
import { M, L } from "../constants";
import translator from "../dictionary/pages/notifier-dict";
import { BiSearch } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { Fade } from "react-awesome-reveal";
import CourseCard from "../components/notifier/CourseCard";
import CourseModal from "../components/notifier/CourseModal";
import { MdRadar } from "react-icons/md";
import TrackingMenu from "../components/notifier/TrackingMenu";


// TODO: create the responsive layout for the cards, and the off-canvas
/**
 *
 * ? state management details
 * @courseInput searchbar input state
 * @department department selection state
 * @courses course objects retrieved from API fetching, and with correct sections grouped within
 * @trackerVisible controlling the visibility of the off-canvas course tracker
 * @modalVisible controlling the visibility of the course modal
 * ! handle translations and themes
 * ! handle props delegation from all course cards to modal component
 * ! broadcast tracking changes to the off-canvas
 * 
 */
function Notifier(props) {
    // ? base state
  const { navDispatch } = useContext(NavContext);
  const courseInput = useRef(null); // to sync searchbar textInput information
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  // ? instance state
  const [currentCourse, setCurrentCourse] = useState({
    course: "ACCT110",
    title: "Introduction to Financial Accounting",
    type: ["Lecture"]
  });
  const [showModal, setShowModal] = useState(false);
  const [showCanvas, setshowCanvas] = useState(false);
  const [trackedSections, setTracked] = useState("");

    //? utility functions

    const search =  () => {
        return "searched!";
    } 

    const toggleModal = (course_code, title, type) => {
      if(course_code != null)
        setCurrentCourse({...{
          course: course_code,
          title: title,
          type: type
        }})
      
      setShowModal(state => !state)
    }

    const toggleCanvas = () => {
      setshowCanvas(state => !state)
    }
    /**
     * 
     * @param  obj an object in the format: {course: str, sections: [int..]} to update the offcanvas state 
     */
    const updateTracked = (obj) => {

    }

  // ? re-rendering state
  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  useEffect(() => {
    navDispatch("notifier");
  
  }, []);

  return (
    <>
      <Head>
        <title>Petroly | Radar</title>
      </Head>{" "}
      <Container
        style={{ minHeight: "100vh" }}
        className={styles["list_container"]}
      >
        <Row style={{ justifyContent: "center" }}>
          <Col
            l={12}
            xs={11}
            md={9}
            xl={7}
            // style={{ width: "100% !important" }}
          >
            <InputGroup className={styles["search-container"]}>
              <Form.Control
                id="name"
                className={` ${
                  user.theme === M.DARK ? styles["dark-mode-input"] : ""
                }`}
                type="text"
                placeholder={langState.searchbar}
                ref={courseInput}
                // onChange={changeName}
                dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                // onKeyDown={enterSearch}
              ></Form.Control>

              <Button
                type="submit"
                onClick={search}
                className={
                  styles["search_btn"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
              >
                <BiSearch size="1.5rem" />
              </Button>

              {/*popover for filters and order*/}
              <DropdownButton
                variant={`${user.theme === M.DARK ? "dark" : ""}`}
                menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
                bsPrefix={
                  styles["dept-dropdown"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
                align="start"
                id="dropdown-menu-align-right"
                title={<GoSettings size="1.5rem" />}
              ></DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Fade className={"col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4"}>
            <CourseCard
              type={["Lecture"]}
              title="Introduction to Financial Accounting"
              available_seats={25}
              course="ACCT110"
              section_count={3}
              openModal={toggleModal}
            />
            <CourseCard
              type={["Hybrid"]}
              title="Introduction to Managerial Accounting"
              available_seats={37}
              course="ACCT210"
              section_count={3}
              openModal={toggleModal}
            />
            <CourseCard
              type={["Lecture", "Lab"]}
              title="Intermediate Accounting I"
              available_seats={5}
              course="ACCT301"
              section_count={3}
              openModal={toggleModal}
            />
          </Fade>
        </Row>
        <OverlayTrigger
          placement="top"
          delay={{ show: 350, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip-2">{langState.trackBtn}</Tooltip>
          }
        >
          <Button
            id="evaluate"
            className={styles.trackBtn}
            onClick={toggleCanvas}
            // style={{
            //   backgroundColor:
            //     user.status !== USER.LOGGED_IN || dataHasEvaluated.hasEvaluated
            //       ? "gray"
            //       : "#00ead3",
            // }}
          >
            <MdRadar size={32} />
          </Button>
        </OverlayTrigger>
      </Container>
      {/* external component embedded within the page */}
      <CourseModal
        saveTracked={updateTracked}
        close={toggleModal}
        show={showModal}
        course={currentCourse.course}
        title={currentCourse.title}
        type={currentCourse.type}
      />
      <TrackingMenu close ={toggleCanvas} 
      show={showCanvas}
      save={updateTracked}
      />
      {/* login checking is needed */}
    </>
  );
}

export default Notifier;
