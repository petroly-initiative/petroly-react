import { useContext, useEffect, useState } from "react";
import { NavContext } from "../state-management/navbar-state/NavbarContext";
import {
  Container,
  DropdownButton,
  Row,
  Col,
  InputGroup,
  Form,
  Button
} from "react-bootstrap";
import styles from "../styles/notifier-page/courses-list.module.scss";
import { useRef } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import  Head  from "next/head";
import { M, L } from "../constants";
import translator from "../dictionary/pages/instructors-dict";
import { BiSearch } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { Fade } from "react-awesome-reveal";
import CourseCard from "../components/notifier/CourseCard";


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

    //? utility functions

    const search =  () => {
        return "searched!";
    }

    const mapCourses = () => {
      // TODO: in production, the backend needs to provide cleaned data for exposed info only
      //1. finding all sections under one course,
      //2. grouping all courses under their respective groups
      // ! some courses have lab-lecture under one section, while others don't
      //3. spit out a course for each course
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
        <Fade  className={"col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4"}>
        <CourseCard title="Introduction to to to to Discrete Mathematics amazing qorld" available_seats={7} course="ICS253" section_count={3} openModal={() => {}}  />
        </Fade>
         </Row>
      </Container>
    </>
  );
}

export default Notifier;
