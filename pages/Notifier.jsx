import { useContext, useEffect, useState } from "react";
import { NavContext } from "../state-management/navbar-state/NavbarContext";
import {
  Container,
  DropdownButton,
  Row,
  Col,
  InputGroup,
  Form,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Dropdown,
  ToggleButton,
} from "react-bootstrap";
import styles from "../styles/notifier-page/courses-list.module.scss";
import { UserContext } from "../state-management/user-state/UserContext";
import Head from "next/head";
import { M, L, USER } from "../constants";
import translator from "../dictionary/pages/notifier-dict";

import { BiSearch, BiTimeFive, BiMessageAltError } from "react-icons/bi";
import { MdOutlineHighlightAlt } from "react-icons/md";
import {
  FaInfoCircle,
  FaRegCalendarAlt,
  FaBuilding,
  FaGraduationCap,
} from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import CourseCard from "../components/notifier/CourseCard";
import CourseModal from "../components/notifier/CourseModal";
import { HiViewList } from "react-icons/hi";
import TrackingCanvas from "../components/notifier/TrackingCanvas";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { getSubjects } from "../api/notifierQueries";
import {
  searchQuery,
  trackedCoursesQuery,
  termsQuery,
} from "../api/notifierQueries";
import { updateTrackingListMutation } from "../api/notifierMutations";
import PopMsg from "../components/utilities/PopMsg";
import NotificationsModal from "../components/notifier/NotificationsModal";
import RadarAlert from "../components/utilities/alert";

// TODO: create the responsive layout for the cards, and the off-canvas
/**
 *
 * ? state management details
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
    course: "",
    title: "",
    type: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [showCanvas, setshowCanvas] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [msg, setMsg] = useState("");
  const [department, setDepartment] = useState("ICS");
  const [term, setTerm] = useState({ long: "202420", short: "242" });
  const [HasTrackingList, setHasTrackingList] = useState(false);
  const [courseCards, setCourseCards] = useState(null);
  const [gradCourses, setGradCourses] = useState(false);

  // ? fetched state
  const {
    data: dataDept,
    error: errorDept,
    loading: loadingDept,
  } = useQuery(getSubjects, {
    variables: { short: true },
  });
  const {
    data: termsData,
    loading: termsLoading,
    error: termsError,
  } = useQuery(termsQuery);

  const [
    search,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(searchQuery);
  const {
    data: trackedCoursesData,
    loading: trackedCoursesLoading,
    error: trackedCoursesError,
    startPolling,
    stopPolling,
  } = useQuery(trackedCoursesQuery, {
    skip: user.status === USER.LOGGED_OUT,
    pollInterval: 10_000,
  });

  useEffect(() => {
    if (user.status === USER.LOGGED_OUT) {
      stopPolling();
    } else if (user.status === USER.LOGGED_IN) {
      startPolling();
    }
  }, [user.status]);

  const [updateTrackingList] = useMutation(updateTrackingListMutation, {
    refetchQueries: [trackedCoursesQuery],
  });

  //? utility functions
  // event listener for the "Enter" key
  const enterSearch = (event) => {
    if (event.key === "Enter") {
      searchCallback({});
    }
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
    setTerm(newTerm);
    searchCallback({ term: { long: newTerm.long, short: newTerm.short } });
    // refetching courses with provided search input and department
  };

  const searchCallback = (inputObj) => {
    sessionStorage.setItem("radar_dept", inputObj["dept"] || department);
    sessionStorage.setItem(
      "radar_term",
      JSON.stringify(inputObj["term"] || term)
    );

    search({
      variables: {
        title: "",
        department: inputObj["dept"] || department,
        term: inputObj["term"] ? inputObj["term"].long : term.long,
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
  const updateTracked = async (courses, isDeletion) => {
    // if (!isDeleted) setTracked({ ...Object.assign(trackedCourses, obj) });
    // else {
    //   const deletedKey = Object.keys(obj)[0];
    //   setTracked({ ...delete trackedCourses[deletedKey] });
    // }
    await updateTrackingList({ variables: { courses } });

    if (!isDeletion) toggleMessage(true, langState.added);
  };

  // ? Mappers
  const deptMapper = (department) => {
    if (dataDept != null) {
      const localData = dataDept.subjectList.filter((term) => term !== "AF");
      return localData.map((dept) => (
        <Dropdown.Item
          id={dept}
          active={dept === department}
          eventKey={dept}
          disabled={dept === department}
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
    }
  };

  const termMapper = () => {
    return termsData.terms.map(({ short, long }) => (
      <Dropdown.Item
        id={long}
        active={long === term.long}
        eventKey={long}
        disabled={long === term.long}
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

  // ! needs to be replaced by a fetching hook, this is a static demo
  function courseMapper(search) {
    search = search || "";
    var uniqueCourses = new Set();
    // getting unique courses
    for (let section of searchData.search) {
      if (gradCourses) {
        if (
          section["subjectCourse"]
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          section["courseNumber"] >= 500
        )
          uniqueCourses.add(section["subjectCourse"]);
      } else {
        if (
          section["subjectCourse"]
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          section["courseNumber"] < 500
        )
          uniqueCourses.add(section["subjectCourse"]);
      }
    }
    //for each unique course accumulate info
    uniqueCourses = Array.from(uniqueCourses);
    var courseObjects = [];
    for (let courseCode of uniqueCourses) {
      var courseSections = searchData.search.filter(
        (course) => course["subjectCourse"] == courseCode
      );
      var sectionType = new Set();
      for (let section of courseSections) {
        sectionType.add(
          section["meetingsFaculty"][0]["meetingTime"]["meetingScheduleType"]
        );
      }

      sectionType = Array.from(sectionType);

      if (sectionType.length !== 1) {
        if (
          courseSections.filter(
            (e) => e["sequenceNumber"] === courseSections[0]["sequenceNumber"]
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
        title: courseSections[0]["courseTitle"],
        seatsAvailable: courseSections.reduce((prev, curr) => {
          if (curr["seatsAvailable"] < 0) return prev;
          else return prev + curr["seatsAvailable"];
        }, 0),
        sections: courseSections.length,
        type: sectionType,
        is_cx: courseSections[0].linkIdentifier === "CX",
      });
    }
    // TODO: fix the single card output
    return courseObjects.map((course) => (
      <CourseCard
        openModal={toggleModal}
        course={course["code"]}
        title={course["title"]}
        type={course["type"]}
        // to avoid double counting hybrid sections
        seatsAvailable={
          course["type"][0] === "hybrid"
            ? course["seatsAvailable"] / 2
            : course["seatsAvailable"]
        }
        section_count={course["sections"]}
        is_cx={course.is_cx}
      />
    ));
  }

  // returns course cards

  // ? side effects
  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  useEffect(() => {
    if (trackedCoursesData) {
      if (!trackedCoursesData.trackedCourses) {
        // Here user has no TrackingList
        // HasTrackingList is already `false`
        setShowSettings(true);
      } else {
        // Here user does have TrackingList
        setHasTrackingList(true);
      }
    }
  }, [trackedCoursesData]);

  useEffect(() => {
    if (searchData && searchData.search) {
      setCourseCards(courseMapper());
    }
  }, [searchData, gradCourses]);

  useEffect(() => {
    navDispatch("notifier");
    // setAlerts(AlertDismissibleExample());

    const termsObj = JSON.parse(sessionStorage.getItem("radar_term"));
    if (
      sessionStorage.getItem("radar_dept") &&
      termsObj.long &&
      termsObj.short
    ) {
      setTerm(JSON.parse(sessionStorage.getItem("radar_term")));
      setDepartment(sessionStorage.getItem("radar_dept"));
      searchCallback({
        term: JSON.parse(sessionStorage.getItem("radar_term")),
        dept: sessionStorage.getItem("radar_dept"),
      });
    }
  }, []);

  function handleSearch(event) {
    setCourseCards(courseMapper(event.target.value));
  }

  if (termsError || errorDept || searchError || trackedCoursesError) {
    stopPolling();

    return (
      <Container
        style={{ minHeight: "100vh" }}
        className={
          styles["list_container"] + " " + user.theme === M.DARK
            ? styles["dark-txt"]
            : ""
        }
      >
        <div className={styles["error-container"] + " shadow"}>
          {" "}
          <BiMessageAltError className={styles["error-icon"]} />
          <div
            className={
              styles["error-txt"] +
              ` ${user.theme === M.DARK ? styles["dark-mini-txt"] : ""}`
            }
          >
            {langState.error}
          </div>
        </div>
      </Container>
    );
  }
  if (trackedCoursesLoading || loadingDept || termsLoading || searchLoading) {
    // wait for loading cruical queries
    return (
      <Container
        style={{ minHeight: "100vh" }}
        className={styles["list_container"]}
      >
        {" "}
        <div
          className={
            styles["loading-container"] +
            " shadow" +
            ` ${user.theme === M.DARK ? styles["dark-loading"] : ""}`
          }
        >
          <Spinner
            className={styles["loading-spinner"]}
            as="div"
            animation="grow"
            size="xl"
            role="status"
            aria-hidden="true"
          />
        </div>
      </Container>
    );
  }

  if (!searchData || searchData.search.length === 0) {
    // show landig page to start searching
    // meaning at the initial load for the page
    // no result will be fetch until the user schoose a dept & term

    // handling empty lists

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
              sm={12}
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
                dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
              ></Form.Control>

              <button
                id="search-btn"
                type="submit"
                onClick={searchCallback}
                className={
                  styles["search_btn"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
              >
                <BiSearch size="1.5rem" />
              </button>
            </Col>

            <Col
              xl={3}
              lg={4}
              md={6}
              sm={12}
              xs={12}
              className={[styles["search-btns"], styles["search-cols"]]}
            >
              <DropdownButton
                drop={"start"}
                variant={`${user.theme === M.DARK ? "dark" : ""}`}
                menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
                bsPrefix={
                  styles["term-dropdown"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
                align="start"
                id="dropdown-menu-align-right"
                title={
                  <OverlayTrigger
                    trigger={"hover"}
                    placement="bottom"
                    delay={{ show: 0, hide: 0 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {langState.termfilter}
                      </Tooltip>
                    }
                  >
                    <div>
                      {" "}
                      <span className={styles["dropdown-icon-container"]}>
                        {" "}
                        <FaRegCalendarAlt className={styles["dropdown-icon"]} />
                      </span>
                      {term.short}
                    </div>
                  </OverlayTrigger>
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
                  styles["dropdowns"] +
                  ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                }
                align="start"
                id="dropdown-menu-align-right"
                title={
                  <OverlayTrigger
                    trigger={"hover"}
                    placement="bottom"
                    delay={{ show: 0, hide: 0 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {langState.searchbarFilter}
                      </Tooltip>
                    }
                  >
                    <div>
                      <span className={styles["dropdown-icon-container"]}>
                        <FaBuilding className={styles["dropdown-icon"]} />
                      </span>
                      {department}
                    </div>
                  </OverlayTrigger>
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
                  {langState.searchbarFilter}
                </Dropdown.Item>
                <Dropdown.Divider style={{ height: "1" }} />

                {deptMapper(department)}
              </DropdownButton>
            </Col>
          </InputGroup>

          <OverlayTrigger
            placement="top"
            trigger={"hover"}
            delay={{ show: 350, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-2">
                {user.status === USER.LOGGED_OUT
                  ? langState.unauth_msg
                  : langState.trackBtn}
              </Tooltip>
            }
          >
            <span className={styles.trackBtn}>
              <button
                id="canvas-btn"
                className={styles.trackBtn}
                onClick={toggleCanvas}
                disabled={user.status === USER.LOGGED_OUT}
              >
                <HiViewList size={32} />
              </button>
            </span>
          </OverlayTrigger>
          {searchData ? (
            <div className={styles["error-container"] + " shadow"}>
              {" "}
              <BiMessageAltError className={styles["error-icon"]} />
              <div
                className={
                  styles["error-txt"] +
                  ` ${user.theme === M.DARK ? styles["dark-mini-txt"] : ""}`
                }
              >
                {langState.empty}
              </div>
            </div>
          ) : (
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
                  onClick={() => {
                    document.querySelector("#name").focus();
                  }}
                  className={
                    styles["tutorial-step"] +
                    ` shadow-sm ${
                      user.theme === M.DARK ? styles["dark-btn"] : ""
                    }`
                  }
                >
                  {/*  place the icon here */}
                  <BiSearch className={styles["step-icon"]} />
                  <div
                    className={
                      styles["step-content"] +
                      ` ${user.theme === M.DARK ? styles["dark-mini-txt"] : ""}`
                    }
                  >
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
                      user.theme === M.DARK ? styles["dark-mode-step"] : ""
                    }`
                  }
                >
                  {/*  place the icon here */}
                  <MdOutlineHighlightAlt className={styles["step-icon"]} />
                  <div
                    className={
                      styles["step-content"] +
                      ` ${user.theme === M.DARK ? styles["dark-mini-txt"] : ""}`
                    }
                  >
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
                      user.theme === M.DARK ? styles["dark-mode-step"] : ""
                    }`
                  }
                >
                  {/*  place the icon here */}
                  <BiTimeFive color="#00ead3" className={styles["step-icon"]} />
                  <div
                    className={
                      styles["step-content"] +
                      ` ${user.theme === M.DARK ? styles["dark-mini-txt"] : ""}`
                    }
                  >
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
          )}
        </Container>
        {/* external component embedded within the page */}
        {user.status === USER.LOGGED_IN && HasTrackingList && (
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
            firstSetup={!HasTrackingList}
          />
        )}
        {/* login checking is needed */}
      </>
    );
  }

  //////////////// Data is available and ready to render //////////////
  return (
    <>
      <Head>
        <title>Petroly | Radar</title>
      </Head>{" "}
      <Container
        style={{ minHeight: "100vh" }}
        className={styles["list_container"]}
      >
        <RadarAlert />

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
              onChange={handleSearch}
              dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            ></Form.Control>

            <ToggleButton
              variant=""
              onClick={() => setGradCourses(!gradCourses)}
              className={`${styles["search_btn"]} ${
                gradCourses ? styles["search_btn_checked"] : ""
              } ${user.theme === M.DARK ? styles["dark-toggle-btn"] : ""}`}
              type="checkbox"
              checked={gradCourses}
              id="grad-toggle-btn"
            >
              <FaGraduationCap size={20} />
            </ToggleButton>
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
              variant={`${user.theme === M.DARK ? "dark" : ""}`}
              menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
              bsPrefix={
                styles["term-dropdown"] +
                ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
              }
              align="start"
              id="dropdown-menu-align-right"
              title={
                <OverlayTrigger
                  trigger={"hover"}
                  placement="bottom"
                  delay={{ show: 0, hide: 0 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      {langState.termfilter}
                    </Tooltip>
                  }
                >
                  <div>
                    {" "}
                    <span className={styles["dropdown-icon-container"]}>
                      {" "}
                      <FaRegCalendarAlt className={styles["dropdown-icon"]} />
                    </span>
                    {term.short}
                  </div>
                </OverlayTrigger>
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
                styles["dropdowns"] +
                ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
              }
              align="start"
              id="dropdown-menu-align-right"
              title={
                <OverlayTrigger
                  trigger={"hover"}
                  placement="bottom"
                  delay={{ show: 0, hide: 0 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      {langState.searchbarFilter}
                    </Tooltip>
                  }
                >
                  <div>
                    <span className={styles["dropdown-icon-container"]}>
                      <FaBuilding className={styles["dropdown-icon"]} />
                    </span>
                    {department}
                  </div>
                </OverlayTrigger>
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
                {langState.searchbarFilter}
              </Dropdown.Item>
              {deptMapper(department)}
            </DropdownButton>
          </Col>
        </InputGroup>

        <Row style={{ marginBottom: 16, width: "100%" }}>
          <Fade
            triggerOnce
            className={"col-sm-12 col-xs-12 col-md-6 col-lg-4 col-xl-4"}
          >
            {courseCards}
          </Fade>
        </Row>
        <OverlayTrigger
          trigger={"hover"}
          placement="top"
          delay={{ show: 0, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip-2">
              {user.status === USER.LOGGED_OUT
                ? langState.unauth_msg
                : langState.trackBtn}
            </Tooltip>
          }
        >
          <span className={styles.trackBtn}>
            <button
              id="canvas-btn"
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
              <HiViewList size={32} />
            </button>
          </span>
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
      {user.status === USER.LOGGED_IN && HasTrackingList && (
        <TrackingCanvas
          allTerms={termsData.terms}
          trackedCourses={trackedCoursesData.trackedCourses}
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
          firstSetup={!HasTrackingList}
        />
      )}
      {/* login checking is needed */}
    </>
  );
}

export default Notifier;
