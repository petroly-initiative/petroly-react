import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
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
import { instructorsReducer } from "../state-management/instructors-state/instructorsReducer";
import ClientOnly from "../components/ClientOnly";

import { useQuery } from "@apollo/client";
import client from "../api/apollo-client";
import { instructorsQuery } from "../api/queries";


/**
 * TODO:
 *
 * - Create a reducer for switching the pages and apply the change
 * - Plug in the API instead of using mock data setup
 * - Create a getStaticProps to serve the first batch of instructors
 */


function instructorsList() {
  /*
  ? New State managemnt implementation
  - The reducer in state-managment file will handle the switching of pageContent
  - Every change in the page number will trigger a dispatch for the reducer
  */

  // ------------
  const [page, setPage] = useState(1);
  const switchPage = (pageNum) => {
    setPage(pageNum, console.log("Updated list Page num:", pageNum));
  };

  useEffect(() => {
    // ? detect the change in page number
    console.log('Inside useEffect');

    // currentList = instructorMapper(page - 1);

  }, [page]);

  const instructorMapper = (ind) =>
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
          starValue={Math.round(instructor.overallFloat)}
          evalCount={instructor.evaluationSet.count}
        />
      );
    });

  const { data, loading, error } = useQuery(instructorsQuery);
  if (loading){
    console.log('LOADING');
    return (
      <>
        <Head>
          <title>Petroly | Rating</title>
        </Head>
        <Navbar page="rating" />
        <Container className={"mt-4 " + styles.list_container}>
          <Row style={{ justifyContent: "center" }}>
            <Col l={8} xs={11} md={9} xl={7} style={{ width: "100% !important" }}>
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
          <center><h1>Loading Data...</h1></center>
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
          <Col l={8} xs={11} md={9} xl={7} style={{ width: "100% !important" }}>
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
            className={"col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4 my-2 w-100"}
            cascade
            damping={0.05}
            triggerOnce
            direction="up"
          >
            {currentList}
          </Fade>
        </Row>
        {/**!Number of pages should be provided by the api*/}
        <div className={styles["pagination-container"]}>
          <CustomPagination pageNum={3} switchView={switchPage} />
        </div>
      </Container>
    </>
    </ClientOnly>
  );
}

export default instructorsList;
