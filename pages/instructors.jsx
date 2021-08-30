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
import InstructorCard from "../components/Instructros/InstructorCard";
import Navbar from "../components/navbar";
import { BiSearch } from "react-icons/bi";
import styles from "../styles/evaluation-page/instructors-list.module.scss";
import { GoSettings } from "react-icons/go";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState, useReducer } from "react";
import CustomPagination from "../components/Pagination";
import { Fade } from "react-awesome-reveal";
import ClientOnly from "../components/ClientOnly";
import { useQuery } from "@apollo/client";
import { instructorsQuery, getDepartments } from "../api/queries";

function instructorsReducer(state, action) {
  console.log("instructorsReducer");
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
const ITEMS = 6; // Number of InstructorCards per page
const initialInstructorsState = {
  limit: ITEMS,
  offset: 0,
  department: null,
  name: null,
};

function instructorsList() {
  const [stackIndex, setStackIndex] = useState(0);
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
    refetch(instructorsState);
  };

  const search = (e) => {
    var value = name;
    instructorsDispatch({ changeIn: "name", name: value });
    refetch(instructorsState);
  };

  const enterSearch = (event) => {
    if (event.key === "Enter") search();
  };

  // ? detect page-number switching
  const switchPage = (pageNum) => {
    console.log("switchPage", pageNum);
    instructorsDispatch({ changeIn: "offset", offset: (pageNum - 1) * ITEMS });
    refetch(instructorsState);
  };
  const switchStack = (index) => {
    setStackIndex(index);
  };

  useEffect(() => {
    console.log("New index", stackIndex);
  }, [stackIndex]);

  // ? Mappers
  const deptMapper = () =>
    dataDept.departmentList.map((dept) => (
      <Dropdown.Item
        id={dept}
        active={dept === instructorsState.department}
        eventKey={dept}
        onClick={selectDept}
        className={styles["depts"]}
        as={"div"}
        eventKey="1"
      >
        {dept}
      </Dropdown.Item>
    ));

  const instructorMapper = () =>
    data.instructors.data.map((instructor) => {
      return (
        <InstructorCard
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

  console.log("Status", networkStatus);

  // Loading status
  if (loading || loadingDept) {
    return (
      <>
        <Head>
          <title>Petroly | Rating</title>
        </Head>
        <Navbar page="rating" />
        <Container className={"mt-4 " + styles.list_container}>
          <Row style={{ justifyContent: "center" }}>
            <Col
              l={8}
              xs={11}
              md={9}
              xl={7}
              style={{ width: "100% !important" }}
            >
              <Form>
                <InputGroup className={styles["search-container"]}>
                  <Form.Control
                    style={{ direction: "rtl" }}
                    type="text"
                    placeholder="أدخِل اسم المحاضِر"
                  ></Form.Control>
                  <InputGroup.Append style={{ height: 38 }}>
                    <Button className={styles["search_btn"]}>
                      <BiSearch size="1.5rem" />
                    </Button>
                    <DropdownButton
                      className={styles["dept-dropdown"]}
                      align="start"
                      id="dropdown-menu-align-right"
                      title={<GoSettings size="1.5rem" />}
                    >
                      <Dropdown.Item className={styles["dropdown-h"]} disabled>
                        القسم الجامعي
                      </Dropdown.Item>
                      <Dropdown.Divider style={{ height: "1" }} />
                      <Dropdown.Item
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                        active={true}
                      >
                        None
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
          </Row>
         
            {" "}
            <Button className={styles["loading-container"]} disabled>
              <Spinner
                className={styles["loading-spinner"]}
                as="div"
                animation="grow"
                size="xl"
                role="status"
                aria-hidden="true"
              />
              <div className={styles["loading-text"]}>جاري التحميل </div>
            </Button>
          
        </Container>
      </>
    );
  }

  // ! Error status
  if (error || errorDept) {
    console.log("ERROR IN QUERY");
    return (
      <div>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
        <p>{error.networkError.result.errors[0].message}</p>
      </div>
    );
  }

  // ? Data loaded
  var currentList = instructorMapper();
  var deptList = deptMapper();
  console.log("instructorsState", instructorsState);
  console.log("query vars", variables);

  // ! No data
  if (data.instructors.data.length == 0) {
    return (
      <ClientOnly>
        <>
          <Head>
            <title>Petroly | Rating</title>
          </Head>
          <Navbar page="rating" />
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
                    style={{ direction: "rtl" }}
                    type="text"
                    placeholder="أدخِل اسم المحاضِر"
                    value={name}
                    onKeyDown={enterSearch}
                    onChange={changeName}
                  ></Form.Control>
                  <InputGroup.Append style={{ height: 38 }}>
                    <Button
                      type="submit"
                      onClick={search}
                      className={styles["search_btn"]}
                    >
                      <BiSearch size="1.5rem" />
                    </Button>
                  </InputGroup.Append>

                  <InputGroup.Append>
                    {/*popover for filters and order*/}
                    <DropdownButton
                      className={styles["dept-dropdown"]}
                      align="start"
                      id="dropdown-menu-align-right"
                      title={<GoSettings size="1.5rem" />}
                    >
                      <Dropdown.Item className={styles["dropdown-h"]} disabled>
                        القسم الجامعي
                      </Dropdown.Item>
                      <Dropdown.Divider style={{ height: "1" }} />
                      <Dropdown.Item
                        id="null"
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                        onClick={selectDept}
                        active={instructorsState.department === null}
                      >
                        All departments
                      </Dropdown.Item>
                      {deptList}
                    </DropdownButton>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>

            <center>
              <h1>No result :(</h1>
            </center>
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
        <Navbar page="rating" />
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
                  style={{ direction: "rtl" }}
                  type="text"
                  placeholder="أدخِل اسم المحاضِر"
                  value={name}
                  onChange={changeName}
                  onKeyDown={enterSearch}
                ></Form.Control>
                <InputGroup.Append style={{ height: 38 }}>
                  <Button
                    type="submit"
                    onClick={search}
                    className={styles["search_btn"]}
                  >
                    <BiSearch size="1.5rem" />
                  </Button>
                </InputGroup.Append>

                <InputGroup.Append>
                  {/*popover for filters and order*/}
                  <DropdownButton
                    className={styles["dept-dropdown"]}
                    align="start"
                    id="dropdown-menu-align-right"
                    title={<GoSettings size="1.5rem" />}
                  >
                    <Dropdown.Item className={styles["dropdown-h"]} disabled>
                      القسم الجامعي
                    </Dropdown.Item>
                    <Dropdown.Divider style={{ height: "1" }} />
                    <Dropdown.Item
                      id="null"
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                      onClick={selectDept}
                      active={instructorsState.department === null}
                    >
                      All departments
                    </Dropdown.Item>
                    {deptList}
                  </DropdownButton>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row className={styles.instructor_list}>
            {" "}
            <Fade
              className={
                "col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4 my-2 w-100"
              }
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
      </>
    </ClientOnly>
  );
}

export default instructorsList;
