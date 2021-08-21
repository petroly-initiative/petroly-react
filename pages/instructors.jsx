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
import { useContext, useEffect, useState } from "react";
import CustomPagination from "../components/Pagination";
import { Fade } from "react-awesome-reveal";
import ClientOnly from "../components/ClientOnly";
import { useQuery } from "@apollo/client";
import { instructorsQuery } from "../api/queries";

function instructorsList() {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [stackIndex, setStackIndex] = useState(0);

  const switchPage = (pageNum) => {
    setPage(pageNum);
    console.log(Math.ceil(data.instructors.count / 18));
    console.log(data.instructors.count / 18);
  };

  // Searchbar input management
  const [name, setName] = useState("");
  const [dept, setDept] = useState("None");

  const switchStack = (index) => {
    setStackIndex(index);
  };

  const findInstructor = () => {
    // some query to fetch instructors
  };

  // ! Error page
  const { data, loading, error, refetch } = useQuery(instructorsQuery, {
    variables: { offset: offset },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    // ? detect the change in page number

    setOffset((page - 1) * 18, refetch());
  }, [page]);

  useEffect(() => {
    console.log("New index", stackIndex);
  }, [stackIndex]);

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

  const deptMapper = (dept) => {
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
      <Dropdown.Item className={styles["depts"]} as={"div"} eventKey="1" active>
        None
      </Dropdown.Item>
      {[].map(dept => {
        <Dropdown.Item className={styles["depts"]} as={"div"} eventKey="1">
          {dept}
        </Dropdown.Item>;
      })}
    </DropdownButton>;
  };

  if (loading) {
    console.log("LOADING");
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
              <Form onSubmit={findInstructor}>
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
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                        active
                      >
                        None
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                      >
                        Software Engineering
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                      >
                        Civil Engineering
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                      >
                        Chemical Engineering{" "}
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                      >
                        Computer Science
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles["depts"]}
                        as={"div"}
                        eventKey="1"
                      >
                        Mechanical Engineering
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <center>
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
          </center>
        </Container>
      </>
    );
  }

  var currentList = instructorMapper(page - 1);

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
                  style={{ direction: "rtl" }}
                  type="text"
                  placeholder="أدخِل اسم المحاضِر"
                ></Form.Control>
                <InputGroup.Append style={{ height: 38 }}>
                  <Button className={styles["search_btn"]}>
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
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                      active
                    >
                      None
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                    >
                      Software Engineering
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                    >
                      Civil Engineering
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                    >
                      Chemical Engineering{" "}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                    >
                      Computer Science
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles["depts"]}
                      as={"div"}
                      eventKey="1"
                    >
                      Mechanical Engineering
                    </Dropdown.Item>
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
          </Row>
          {/**!Number of pages should be provided by the api*/}
          <div className={styles["pagination-container"]}>
            <CustomPagination
              pageNum={Math.ceil(data.instructors.count / 18)}
              switchView={switchPage}
              switchIndex={switchStack}
              currentPage={page}
              currentIndex={stackIndex}
            />
          </div>
        </Container>
      </>
    </ClientOnly>
  );
}

export default instructorsList;
