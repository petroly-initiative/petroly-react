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
import mockData from "../dummy-data/instructors-data.json";
import { useEffect, useState, useReducer } from "react";
import CustomPagination from "../components/Pagination";
import { Fade } from "react-awesome-reveal";
import { instructorsReducer } from "../state-management/instructors-state/instructorsReducer";
/**
 * TODO:
 *
 * - Create a reducer for switching the pages and apply the change
 * - Plug in the API instead of using mock data setup
 * - Create a getStaticProps to serve the first batch of instructors
 */

// To supply the initial batch of data
export const getStaticProps = async (context) => {
  // !WARNING: This line should be replaced by an API Query
  const data = mockData[0];
  return {
    props: {
      instructorsData: data,
    },
  };
};

function instructorsList({ instructorsData }) {
  /*
  ? New State managemnt implementation
  - The reducer in state-managment file will handle the switching of pageContent
  - Every change in the page number will trigger a dispatch for the reducer
  */

  const [pageData, dispatch] = useReducer(instructorsReducer, instructorsData);
  // ------------
  const [page, setPage] = useState(1);
  const switchPage = (pageNum) => {
    setPage(pageNum, console.log("Updated list Page num:", pageNum));
  };

  const instructorMapper = (ind) =>
    pageData.map((info) => {
      return (
        <InstructorCard
          image={
            <Image
              className={styles.picDiv}
              src={info["src"]}
              width="70"
              height="70"
            />
          }
          instructorName={info["name"]}
          instructorDept={info["dept"]}
          starValue={Math.round(info["rating"])}
          evalCount={info["evalCount"]}
        />
      );
    });
  var currentList = instructorMapper(page - 1);

  useEffect(() => {
    //!WARNING: We need to use async functions with the API Calls
    dispatch({ index: page - 1 });
    currentList = instructorMapper(page - 1);
  }, [page]);

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
          
          <CustomPagination pageNum={mockData.length} switchView={switchPage} />
        </div>
      </Container>
    </>
  );
}

export default instructorsList;
