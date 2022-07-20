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
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";
import styles from "../styles/notifier-page/courses-list.module.scss";
import { useRef } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import Head from "next/head";
import { M, L } from "../constants";
import translator from "../dictionary/pages/notifier-dict";
import { BiSearch } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { Fade } from "react-awesome-reveal";
import CourseCard from "../components/notifier/CourseCard";
import CourseModal from "../components/notifier/CourseModal";
import { MdRadar } from "react-icons/md";
import TrackingCanvas from "../components/notifier/TrackingCanvas";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { getDepartments } from "../api/queries";
import { searchQuery, trackedCoursesQuery } from "../api/notifierQueries";

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

  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  // ? instance state
  const [currentCourse, setCurrentCourse] = useState({
    // state for the displayed course on the modal
    course: "ACCT110",
    title: "Introduction to Financial Accounting",
    type: ["Lecture"],
  });
  const [showModal, setShowModal] = useState(false);
  const [showCanvas, setshowCanvas] = useState(false);
  //  ! this state should be delegated to the canvas which fetched tracked sections by itself
  const [trackedCourses, setTracked] = useState({});
  const courseInput = useRef(""); // to sync searchbar textInput information
  const [department, setDepartment] = useState("ICS");
  const [term, setTerm] = useState(202210); //! will be replaced by current term
  // ? fetched state
  const {
    data: dataDept,
    error: errorDept,
    loading: loadingDept,
  } = useQuery(getDepartments, {
    variables: { short: true },
  });

  const [search, { data: searchData, loading: searchLoading }] =
    useLazyQuery(searchQuery);
  const { data: trackedCoursesData, loading: trackedCoursesLoading } =
    useQuery(trackedCoursesQuery);

  //? utility functions
  // event listener for the "Enter" key
  const enterSearch = (event) => {
    if (event.key === "Enter") searchCallback();
  };

  const selectDept = (e) => {
    var value = e.target.id;
    if (value == "null") {
      // A department must be selected always
      return;
    }
    setDepartment(value);
    search({
      variables: {
        title: courseInput.current.value,
        term: term,
        department: value,
      },
    });
    // refetching courses with provided search input and department
  };

  const selectTerm = (e) => {
    var value = e.target.id;
    if (value == "null") {
      // A term must be selected always
      return;
    }
    setTerm(value);
    search({
      variables: {
        title: courseInput.current.value,
        term: value,
        department: department,
      },
    });
    // refetching courses with provided search input and department
  };

  const searchCallback = () => {
    search({
      variables: {
        title: courseInput.current.value,
        term: term,
        department: department,
      },
    });
    return "searched!";
  };

  const toggleModal = (course_code, title, type) => {
    if (course_code != null)
      setCurrentCourse({
        ...{
          course: course_code,
          title: title,
          type: type,
        },
      });

    setShowModal((state) => !state);
  };

  const toggleCanvas = () => {
    setshowCanvas((state) => !state);
  };
  /**
   *
   * @param  obj an object in the format: {course: str, sections: [int..]} to update the offcanvas state
   * @param isDeleted if the resulting sections are non-existent delete the object key
   */
  const updateTracked = (obj, isDeleted) => {
    if (!isDeleted) setTracked({ ...Object.assign(trackedCourses, obj) });
    else {
      const deletedKey = Object.keys(obj)[0];
      setTracked({ ...delete trackedCourses[deletedKey] });
    }
  };

  useEffect(() => {
    console.log("Notifier: ", trackedCourses);
  }, [trackedCourses]);

  // ? Mappers
  const deptMapper = () => {
    if (dataDept != null)
      return dataDept.departmentList.map((dept) => (
        <Dropdown.Item
          id={dept}
          active={dept === department}
          eventKey={dept}
          // disabled={dept === instructorsState.department}
          onClick={selectDept}
          className={
            styles["depts"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""} ${
              dept === department ? styles["active-term"] : ""
            }`
          }
        >
          {dept}
        </Dropdown.Item>
      ));
  };

  const termMapper = () => {
    return ["213", "221"].map((termStr) => (
      <Dropdown.Item
        id={termStr}
        active={termStr === term}
        eventKey={termStr}
        // disabled={dept === instructorsState.department}
        onClick={selectTerm}
        className={
          styles["depts"] +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        {termStr}
      </Dropdown.Item>
    ));
  };

  // useEffect(() => {
  //   courseMapper()
  // })
  // ! needs to be replaced by a fetching hook, this is a static demo
  const courseMapper = () => {
    var uniqueCourses = new Set();
    // getting unique courses
    for (let section of searchData.search) {
      uniqueCourses.add(section["course_number"]);
    }
    //for each unique course accumulate info
    uniqueCourses = Array.from(uniqueCourses);
    var courseObjects = [];
    for (let courseCode of uniqueCourses) {
      var courseSections = searchData.search.filter(
        (course) => course["course_number"] == courseCode
      );
      var sectionType = new Set();
      for (let section of courseSections) {
        sectionType.add(section["class_type"]);
      }

      sectionType = Array.from(sectionType);

      if (sectionType.length !== 1) {
        if (
          courseSections.filter(
            (e) => e["section_number"] === courseSections[0]["section_number"]
          ).length == 2
        ) {
          sectionType = ["hybrid"];
        } else {
          sectionType = ["Lecture", "Lab"];
        }
      } else {
        sectionType = sectionType[0] == "LEC" ? ["Lecture"] : sectionType;
      }

      courseObjects.push({
        code: courseCode,
        title: courseSections[0]["course_title"],
        available_seats: courseSections.reduce(
          (prev, curr) => prev + curr["available_seats"],
          0
        ),
        sections: courseSections.length,
        type: sectionType,
      });
    }
    return courseObjects.map((course) => (
      <CourseCard
        openModal={toggleModal}
        course={course["code"]}
        title={course["title"]}
        type={course["type"]}
        available_seats={course["available_seats"]}
        section_count={course["sections"]}
      />
    ));
  };

  // returns course cards

  // ? side effects
  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  useEffect(() => {
    navDispatch("notifier");
  }, []);

  if (trackedCoursesLoading || loadingDept) {
    // wait for loading cruical queries
    return null;
  }
  console.log(trackedCoursesData.trackedCourses);
  if (!searchData) {
    // show landing page to start searching
    // meaning at the initial load for the page
    // no result will be fetch until the user schoose a dept & term
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
                  onClick={searchCallback}
                  className={
                    styles["search_btn"] +
                    ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                  }
                >
                  <BiSearch size="1.5rem" />
                </Button>
                <DropdownButton
                  drop={"start"}
                  className={styles["dept-dropdown"]}
                  variant={`${user.theme === M.DARK ? "dark" : ""}`}
                  menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
                  bsPrefix={
                    styles["dept-dropdown"] +
                    ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                  }
                  align="start"
                  id="dropdown-menu-align-right"
                  title={
                    <FaRegCalendarAlt
                      style={{ display: "flex", alignItems: "center" }}
                      size="1.1rem"
                    />
                  }
                >
                  <Dropdown.Item
                    className={
                      user.theme === M.DARK
                        ? styles["dark-mode"]
                        : styles["dropdown-h"]
                    }
                    disabled
                  >
                    {langState.termfilter}
                  </Dropdown.Item>
                  {termMapper()}
                </DropdownButton>

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
                >
                  <Dropdown.Item
                    className={
                      user.theme === M.DARK
                        ? styles["dark-mode"]
                        : styles["dropdown-h"]
                    }
                    disabled
                  >
                    {langState.searchbarFilter}
                  </Dropdown.Item>
                  <Dropdown.Divider style={{ height: "1" }} />
                  <Dropdown.Item
                    id="null"
                    className={
                      styles["depts"] +
                      ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                    }
                    as={"div"}
                    eventKey="1"
                    onClick={selectDept}
                    active={department === null}
                  >
                    {langState.allDepts}
                  </Dropdown.Item>
                  {deptMapper()}
                </DropdownButton>
              </InputGroup>
            </Col>
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
        <TrackingCanvas
          trackedCourses={trackedCoursesData.trackedCourses}
          close={toggleCanvas}
          show={showCanvas}
          save={updateTracked}
        />
        {/* login checking is needed */}
      </>
    );
  }

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
                onClick={searchCallback}
                className={
                  styles["search_btn"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
              >
                <BiSearch size="1.5rem" />
              </Button>
              <DropdownButton
                drop={"start"}
                className={styles["dept-dropdown"]}
                variant={`${user.theme === M.DARK ? "dark" : ""}`}
                menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
                bsPrefix={
                  styles["dept-dropdown"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
                align="start"
                id="dropdown-menu-align-right"
                title={
                  <FaRegCalendarAlt
                    style={{ display: "flex", alignItems: "center" }}
                    size="1.1rem"
                  />
                }
              >
                <Dropdown.Item
                  className={
                    user.theme === M.DARK
                      ? styles["dark-mode"]
                      : styles["dropdown-h"]
                  }
                  disabled
                >
                  {langState.termfilter}
                </Dropdown.Item>
                {termMapper()}
              </DropdownButton>

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
              >
                <Dropdown.Item
                  className={
                    user.theme === M.DARK
                      ? styles["dark-mode"]
                      : styles["dropdown-h"]
                  }
                  disabled
                >
                  {langState.searchbarFilter}
                </Dropdown.Item>
                <Dropdown.Divider style={{ height: "1" }} />
                <Dropdown.Item
                  id="null"
                  className={
                    styles["depts"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                  }
                  as={"div"}
                  eventKey="1"
                  onClick={selectDept}
                  active={department === null}
                >
                  {langState.allDepts}
                </Dropdown.Item>
                {deptMapper()}
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        <Row style={{ marginBottom: 16 }}>
          <Fade className={"col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4"}>
            {courseMapper()}
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
        searchData={searchData.search}
        trackedCourses={trackedCoursesData.trackedCourses}
        save={updateTracked}
        close={toggleModal}
        show={showModal}
        course={currentCourse.course}
        title={currentCourse.title}
        type={currentCourse.type}
      />
      <TrackingCanvas
        trackedCourses={trackedCoursesData.trackedCourses}
        close={toggleCanvas}
        show={showCanvas}
        save={updateTracked}
      />
      {/* login checking is needed */}
    </>
  );
}

export default Notifier;
