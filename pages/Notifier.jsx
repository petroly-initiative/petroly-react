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
  Spinner,
  Dropdown,
} from "react-bootstrap";
import styles from "../styles/notifier-page/courses-list.module.scss";
import { useRef } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import Head from "next/head";
import { M, L, USER } from "../constants";
import translator from "../dictionary/pages/notifier-dict";

import { BiSearch, BiTimeFive } from "react-icons/bi";
import { MdOutlineHighlightAlt } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import CourseCard from "../components/notifier/CourseCard";
import CourseModal from "../components/notifier/CourseModal";
import { MdRadar } from "react-icons/md";
import TrackingCanvas from "../components/notifier/TrackingCanvas";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { getDepartments } from "../api/queries";
import {
  searchQuery,
  trackedCoursesQuery,
  termsQuery,
} from "../api/notifierQueries";
import { updateTrackingListMutation } from "../api/notifierMutations";
import PopMsg from "../components/utilities/PopMsg";
import NotificationsModal from "../components/notifier/NotificationsModal";

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
  const [showMsg, setShowMsg] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [msg, setMsg] = useState("");
  const courseInput = useRef(""); // to sync searchbar textInput information
  const [department, setDepartment] = useState("ICS");
  const [term, setTerm] = useState({ long: "202210", short: "221" }); //! will be replaced by current term
  const [HasNoTrackingList, setHasNoTrackingList] = useState(true);
  // ? fetched state
  const {
    data: dataDept,
    error: errorDept,
    loading: loadingDept,
  } = useQuery(getDepartments, {
    variables: { short: true },
  });
  const { data: termsData, loading: termsLoading } = useQuery(termsQuery);

  const [search, { data: searchData, loading: searchLoading }] =
    useLazyQuery(searchQuery);
  const {
    data: trackedCoursesData,
    loading: trackedCoursesLoading,
    startPolling,
    stopPolling,
  } = useQuery(trackedCoursesQuery, {
    skip: user.status === USER.LOGGED_OUT,
    pollInterval: 10_000,
  });

  useEffect(() => {
    console.log(user.status);
    if (user.status === USER.LOGGED_OUT) {
      stopPolling();
    } else if (user.status === USER.LOGGED_IN) {
      startPolling();
    }
  }, [user.status]);

  const [updateTrackingList] = useMutation(updateTrackingListMutation, {
    refetchQueries: [{ query: trackedCoursesQuery }],
  });

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
    searchCallback({ dept: value });
    // refetching courses with provided search input and department
  };

  const selectTerm = (e) => {
    var value = e.target.id;
    if (value == "null") {
      // A term must be selected always
      return;
    }
    const newTerm = termsData.terms.find((term) => value === term.long);
    // console.log("Term: ", newTerm);
    setTerm(newTerm);
    searchCallback({ term: newTerm.long });
    // refetching courses with provided search input and department
  };

  const searchCallback = (inputObj) => {
    search({
      variables: {
        title: courseInput.current.value,
        term: inputObj["term"] || term.long,
        department: inputObj["dept"] || department,
      },
    });
    return "searched!";
  };

  const toggleModal = (course_code, title, type) => {
    if (course_code != null) {
      document.querySelector(".container").style.overflow = "hidden !important";
      // document.querySelector(".container").style.position = "absolute";
      setCurrentCourse({
        ...{
          course: course_code,
          title: title,
          type: type,
        },
      });
    } else {
      document.querySelector(".container").style.overflow = "auto";
      document.querySelector(".container").style.position = "relative";
    }

    setShowModal((state) => !state);
  };

  const toggleCanvas = () => {
    document.querySelector("body").style.overflow = showCanvas
      ? "hidden"
      : "auto";
    setshowCanvas((state) => !state);
  };

  const toggleMessage = (status, message) => {
    if (status) {
      setMsg(message);
    }
    setShowMsg(status);
  };
  /**
   *
   * @param  obj an object in the format: {course: str, sections: [int..]} to update the offcanvas state
   * @param isDeleted if the resulting sections are non-existent delete the object key
   */
  const updateTracked = async (courses) => {
    // if (!isDeleted) setTracked({ ...Object.assign(trackedCourses, obj) });
    // else {
    //   const deletedKey = Object.keys(obj)[0];
    //   setTracked({ ...delete trackedCourses[deletedKey] });
    // }
    console.log("Updated courses in notifier", courses);
    await updateTrackingList({ variables: { courses } });
    // console.log(trackedCoursesData);
  };

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
    return termsData.terms.map(({ short, long }) => (
      <Dropdown.Item
        id={long}
        active={long === term}
        eventKey={long}
        // disabled={dept === instructorsState.department}
        onClick={selectTerm}
        className={
          styles["depts"] +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        {short}
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
    // TODO: fix the single card output
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
    // console.log("trackedCoursesData", trackedCoursesData);
    if (trackedCoursesData) {
      if (!trackedCoursesData.trackedCourses) {
        setShowSettings(true);
      } else {
        setHasNoTrackingList(false);
      }
    }
  }, [trackedCoursesData]);

  useEffect(() => {
    navDispatch("notifier");
  }, []);

  if (trackedCoursesLoading || loadingDept || termsLoading || searchLoading) {
    // wait for loading cruical queries
    return (
      <Container
        style={{ minHeight: "100vh" }}
        className={styles["list_container"]}
      >
        {" "}
        <Button className={styles["loading-container"] + " shadow"} disabled>
          <Spinner
            className={styles["loading-spinner"]}
            as="div"
            animation="grow"
            size="xl"
            role="status"
            aria-hidden="true"
          />
        </Button>
      </Container>
    );
  }
  // ? a 3 Step guide on how to track a course search, select, wait)
  // ? we need to fire the settings modal for an intitial setup of the user and when changing settings

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
          <InputGroup as={Row} className={styles["search-container"]}>
            <Col
              xl={7}
              lg={8}
              md={6}
              sm={8}
              xs={12}
              className={styles["search-field"] + " " + styles["search-cols"]}
            >
              <Form.Control
                id="name"
                className={`${styles["search-input"]} ${
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
            </Col>
            <Col
              xl={3}
              lg={4}
              md={6}
              sm={4}
              xs={12}
              className={[styles["search-btns"], styles["search-cols"]]}
            >
              <DropdownButton
                drop={"start"}
                className={styles["dept-dropdown"]}
                variant={`${user.theme === M.DARK ? "dark" : ""}`}
                menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
                bsPrefix={
                  styles["term-dropdown"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
                align="start"
                id="dropdown-menu-align-right"
                title={term.short}
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
                title={department}
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
            </Col>
          </InputGroup>

          <OverlayTrigger
            placement="top"
            delay={{ show: 350, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-2">
                {user.status === USER.LOGGED_OUT
                  ? langState.unquth_msg
                  : langState.trackBtn}
              </Tooltip>
            }
          >
            <Button
              id="evaluate"
              className={styles.trackBtn}
              onClick={toggleCanvas}
              disabled={user.status === USER.LOGGED_OUT}
            >
              <MdRadar size={32} />
            </Button>
          </OverlayTrigger>
          <div
            dir={user.lang === L.AR_SA ? "rtl" : "ltr"}
            className={styles["tutorial-canvas"]}
          >
            <div
              dir={user.lang === L.AR_SA ? "ltr" : "rtl"}
              className={`${styles["tut-header"]} ${
                user.theme === M.DARK ? styles["dark-txt"] : ""
              }`}
            >
              <span>{langState.tutorialHeader}</span>{" "}
              <span>
                {" "}
                <FaInfoCircle className={styles["tut-icon"]} />{" "}
              </span>
            </div>
            <div className={styles["tutorial-map"]}>
              <div
                className={
                  styles["tutorial-step"] +
                  ` shadow-sm ${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`
                }
              >
                {/*  place the icon here */}
                <BiSearch className={styles["step-icon"]} />
                <div className={styles["step-content"]}>
                  <h3 className={styles["step-header"]}>
                    {langState.searchHeader}
                  </h3>

                  <div className={styles["step-body"]}>
                    {langState.searchContent}
                  </div>
                </div>
              </div>
              <div
                className={
                  styles["tutorial-step"] +
                  ` shadow-sm ${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`
                }
              >
                {/*  place the icon here */}
                <MdOutlineHighlightAlt className={styles["step-icon"]} />
                <div className={styles["step-content"]}>
                  <h3 className={styles["step-header"]}>
                    {langState.selectHeader}
                  </h3>

                  <div className={styles["step-body"]}>
                    {langState.selectContent}
                  </div>
                </div>
              </div>
              <div
                className={
                  styles["tutorial-step"] +
                  ` shadow-sm ${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`
                }
              >
                {/*  place the icon here */}
                <BiTimeFive color="#00ead3" className={styles["step-icon"]} />
                <div className={styles["step-content"]}>
                  <h3 className={styles["step-header"]}>
                    {langState.waitHeader}
                  </h3>

                  <div className={styles["step-body"]}>
                    {langState.waitContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* external component embedded within the page */}
        {user.status === USER.LOGGED_IN && !HasNoTrackingList && (
          <TrackingCanvas
            trackedCourses={trackedCoursesData.trackedCourses}
            close={toggleCanvas}
            show={showCanvas}
            save={updateTracked}
            msgHandler={toggleMessage}
            settingsHandler={setShowSettings}
            allTerms={termsData.terms}
          />
        )}
        <PopMsg
          msg={msg}
          handleClose={toggleMessage}
          visible={showMsg}
          success
        />
        {user.status === USER.LOGGED_IN && (
          <NotificationsModal
            visible={showSettings}
            handleClose={setShowSettings}
            handleMsg={toggleMessage}
            firstSetup={HasNoTrackingList}
          />
        )}
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
        <InputGroup as={Row} className={styles["search-container"]}>
          <Col
            xl={4}
            lg={8}
            md={6}
            sm={8}
            xs={12}
            className={styles["search-field"] + " " + styles["search-cols"]}
          >
            <Form.Control
              id="name"
              className={`${styles["search-input"]} ${
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
          </Col>
          <Col
            xl={3}
            lg={4}
            md={6}
            sm={4}
            xs={12}
            className={[styles["search-btns"], styles["search-cols"]]}
          >
            <DropdownButton
              drop={"start"}
              className={styles["dept-dropdown"]}
              variant={`${user.theme === M.DARK ? "dark" : ""}`}
              menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
              bsPrefix={
                styles["term-dropdown"] +
                ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
              }
              align="start"
              id="dropdown-menu-align-right"
              title={term.short}
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
              title={department}
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
          </Col>
        </InputGroup>

        <Row style={{ marginBottom: 16, width: "100%" }}>
          <Fade className={"col-sm-12 col-xs-12 col-md-6 col-lg-4 col-xl-4"}>
            {courseMapper()}
          </Fade>
        </Row>
        <OverlayTrigger
          placement="top"
          delay={{ show: 350, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip-2">
              {user.status === USER.LOGGED_OUT
                ? langState.unquth_msg
                : langState.trackBtn}
            </Tooltip>
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
            disabled={user.status === USER.LOGGED_OUT}
          >
            <MdRadar size={32} />
          </Button>
        </OverlayTrigger>
      </Container>
      {/* external component embedded within the page */}
      <CourseModal
        searchData={searchData.search}
        trackedCourses={
          user.status === USER.LOGGED_OUT
            ? []
            : trackedCoursesData.trackedCourses
        }
        save={updateTracked}
        close={toggleModal}
        show={showModal}
        course={currentCourse.course}
        title={currentCourse.title}
        type={currentCourse.type}
        term={term}
        department={department}
        msgHandler={toggleMessage}
      />
      {user.status === USER.LOGGED_IN && (
        <TrackingCanvas
          allTerms={termsData.terms}
          trackedCourses={
            user.status === USER.LOGGED_OUT
              ? []
              : trackedCoursesData.trackedCourses
          }
          close={toggleCanvas}
          show={showCanvas}
          save={updateTracked}
          msgHandler={toggleMessage}
          settingsHandler={setShowSettings}
        />
      )}
      <PopMsg msg={msg} handleClose={toggleMessage} visible={showMsg} success />
      {user.status === USER.LOGGED_IN && (
        <NotificationsModal
          visible={showSettings}
          handleClose={setShowSettings}
          handleMsg={toggleMessage}
        />
      )}
      {/* login checking is needed */}
    </>
  );
}

export default Notifier;
