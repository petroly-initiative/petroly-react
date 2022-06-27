import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import InstructorCard from "../components/instructors/InstructorCard";

import { BiSearch } from "react-icons/bi";
import styles from "../styles/evaluation-page/instructors-list.module.scss";
import { GoSettings } from "react-icons/go";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState, useReducer, useContext } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import CustomPagination from "../components/utilities/Pagination";
import { Fade } from "react-awesome-reveal";
import ClientOnly from "../components/ClientOnly";
import { useQuery } from "@apollo/client";
import { instructorsQuery, getDepartments } from "../api/queries";
import translator from "../dictionary/pages/instructors-dict";
import { L, langDirection, M } from "../constants";
import { NavContext } from "../state-management/navbar-state/NavbarContext";

function instructorsReducer(state, action) {
  switch (action.changeIn) {
    case "name":
      state.name = action.name;
      state.offset = 0;
      return state;
    case "department":
      state.department = action.department;
      state.offset = 0;
      return state;
    case "offset":
      state.offset = action.offset;
      return state;
    case "limit":
      state.limit = action.limit;
      return state;

    default:
      throw new Error("instructorsReducer didn't find what to do");
  }
}
const ITEMS = 18; // Number of InstructorCards per page
const initialInstructorsState = {
  limit: ITEMS,
  offset: 0,
  department: null,
  name: null,
};

function instructorsList() {
  const [stackIndex, setStackIndex] = useState(0);

  // language state
  const { user } = useContext(UserContext);
  const { navDispatch } = useContext(NavContext);
  const [clicked, setClicked] = useState(false);

  const [langState, setLang] = useState(() => translator(user.lang));
  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  //Searchbar input management ----------
  const [instructorsState, instructorsDispatch] = useReducer(
    instructorsReducer,
    initialInstructorsState
  );
  const [name, setName] = useState("");

  const changeName = (e) => {
    instructorsDispatch({ changeIn: "name", name: e.target.value });
    setName(e.target.value);
  };
  //
  // ? API hooks
  const {
    data: dataDept,
    error: errorDept,
    loading: loadingDept,
  } = useQuery(getDepartments, {
    variables: { short: true },
  });

  const { data, loading, error, refetch, networkStatus, variables } = useQuery(
    instructorsQuery,
    {
      variables: instructorsState,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    }
  );

  //  ? To handle the search event
  const selectDept = (e) => {
    var value = e.target.id;
    if (value == "null") value = null;
    instructorsDispatch({ changeIn: "department", department: value });
    refetch({
      limit: ITEMS,
      offset: 0,
      department: value,
      name: instructorsState.name,
    });
  };

  const search = (e) => {
    var value = name;
    instructorsDispatch({ changeIn: "name", name: value });
    refetch({
      limit: ITEMS,
      offset: 0,
      department: null,
      name: instructorsState.name,
    });
  };

  const enterSearch = (event) => {
    if (event.key === "Enter") search();
  };

  // ? detect page-number switching
  const switchPage = (pageNum) => {
    instructorsDispatch({ changeIn: "offset", offset: (pageNum - 1) * ITEMS });
    refetch({
      limit: ITEMS,
      offset: (pageNum - 1) * ITEMS,
      department: value,
      name: instructorsState.name,
    });
  };
  const switchStack = (index) => {
    setStackIndex(index);
  };

  useEffect(() => {}, [stackIndex]);

  useEffect(() => {
    navDispatch("rating");
  }, []);

  // ? Mappers
  const deptMapper = () =>
    dataDept.departmentList.map((dept) => (
      <Dropdown.Item
        id={dept}
        active={dept === instructorsState.department}
        eventKey={dept}
        // disabled={dept === instructorsState.department}
        onClick={selectDept}
        className={
          styles["depts"] +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
        as={"div"}
      >
        {dept}
      </Dropdown.Item>
    ));

  const instructorMapper = () =>
    data.instructors.data.map((instructor) => {
      return (
        <InstructorCard
          setLoading={setClicked}
          image={
            <Image
              className={styles.picDiv}
              src={instructor.profilePic}
              width="70"
              height="70"
            />
          }
          instructorName={instructor.name}
          instructorDept={instructor.department}
          instructorID={instructor.id}
          starValue={Math.round(instructor.overallFloat)}
          evalCount={instructor.evaluationSet.count}
        />
      );
    });

  // Loading status
  if (loading || loadingDept) {
    return (
      <>
        <Head>
          <title>Petroly | Rating</title>
        </Head>
        {/* <Navbar page="rating" /> */}
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
              style={{ width: "100% !important" }}
            >
              <InputGroup className={styles["search-container"]}>
                <Form.Control
                  className={` ${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`}
                  type="text"
                  placeholder={langState.searchbar}
                  disabled
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                ></Form.Control>

                <Button
                  type="submit"
                  onClick={search}
                  className={
                    styles["search_btn"] +
                    ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                  }
                  disabled
                >
                  <BiSearch size="1.5rem" />
                </Button>

                {/*popover for filters and order*/}
                <DropdownButton
                  disabled
                  variant={`${user.theme === M.DARK ? "dark" : ""}`}
                  menuVariant={`${user.theme === M.DARK ? "dark" : ""}`}
                  bsPrefix={
                    styles["dept-dropdown"] +
                    ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                  }
                  align="start"
                  // id="dropdown-menu-align-right"
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
                    active={instructorsState.department === null}
                  >
                    All departments
                  </Dropdown.Item>
                  {deptList}
                  {/* {data} */}
                </DropdownButton>
              </InputGroup>
            </Col>
          </Row>{" "}
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
      </>
    );
  }

  // ! Error status
  if (error || errorDept) {
    return (
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: user.theme == M.DARK ? "white" : "",
        }}
        className={styles.list_container}
      >
        <h1>{error.name}</h1>
        <p>{error.message}</p>
        {/* <p>{error.networkError.result.errors[0].message}</p> */}
      </Container>
    );
  }

  // ? Data loaded
  var currentList = instructorMapper();
  var deptList = deptMapper();

  // ! No data
  if (data.instructors.data.length == 0) {
    return (
      <ClientOnly>
        <>
          <Head>
            <title>Petroly | Rating</title>
          </Head>
          {/* <Navbar page="rating" /> */}
          <Container className={"mt-4 " + styles.list_container}>
            <Row style={{ justifyContent: "center" }}>
              <Col
                l={8}
                xs={11}
                md={9}
                xl={7}
                style={{ width: "100% !important" }}
              >
                <InputGroup className={styles["search-container"]}>
                  <Form.Control
                    id="name"
                    className={` ${
                      user.theme === M.DARK ? styles["dark-mode-input"] : ""
                    }`}
                    type="text"
                    placeholder={langState.searchbar}
                    value={name}
                    onKeyDown={enterSearch}
                    onChange={changeName}
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
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
                  >
                    <Dropdown.Item
                      className={
                        styles["dropdown-h"] +
                        ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
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
                      active={instructorsState.department === null}
                    >
                      All departments
                    </Dropdown.Item>
                    {deptList}
                  </DropdownButton>
                </InputGroup>
              </Col>
            </Row>
            <div className={styles["error-container"]}>
              <div className={styles["error-img"]}>
                <Image
                  src="/images/errors/NotFoundE2.svg"
                  width="400"
                  height="351"
                />
              </div>
              <div
                style={{
                  color: (user.theme = M.DARK ? "white" : ""),
                }}
                className={styles["error-txt"]}
              >
                {langState.errMsg}
              </div>
              <a
                href="https://forms.gle/s3PWGxWmck2fpPJo8"
                target="_blank"
                className={styles["form-link"] + " shadow"}
              >
                {langState.errBtn}
              </a>
            </div>
          </Container>
        </>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <>
        <Head>
          <title>Petroly | Rating</title>
        </Head>
        {/* <Navbar page="rating" /> */}
        <Container className={"mt-4 " + styles.list_container}>
          <Row style={{ justifyContent: "center" }}>
            <Col
              l={12}
              xs={11}
              md={9}
              xl={7}
              style={{ width: "100% !important" }}
            >
              <InputGroup className={styles["search-container"]}>
                <Form.Control
                  id="name"
                  className={` ${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`}
                  type="text"
                  placeholder={langState.searchbar}
                  value={name}
                  onChange={changeName}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  onKeyDown={enterSearch}
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
                >
                  <Dropdown.Item
                    className={
                      styles["dropdown-h"] +
                      ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
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
                    active={instructorsState.department === null}
                  >
                    All departments
                  </Dropdown.Item>
                  {deptList}
                </DropdownButton>
              </InputGroup>
            </Col>
          </Row>

          <Row className={styles.instructor_list}>
            {" "}
            <Fade
              className={"col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4"}
              cascade
              damping={0.02}
              triggerOnce
              direction="up"
            >
              {currentList}
            </Fade>
            {/**!Number of pages should be provided by the api*/}
            {Math.ceil(data.instructors.count / ITEMS) !== 1 && (
              <div className={styles["pagination-container"]}>
                <Fade triggerOnce>
                  <CustomPagination
                    pageNum={Math.ceil(data.instructors.count / ITEMS)}
                    switchView={switchPage}
                    switchIndex={switchStack}
                    currentPage={instructorsState.offset / ITEMS + 1}
                    currentIndex={stackIndex}
                  />
                </Fade>
              </div>
            )}
          </Row>
        </Container>
        {clicked && (
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
        )}
      </>
    </ClientOnly>
  );
}

export default instructorsList;
