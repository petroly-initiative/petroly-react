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
import { useEffect, useState } from "react";
import CustomPagination from "../components/Pagination";


function instructorsList() {
  /**
   * TODO:
   * - Create a variable that maps the instructors data in its respective card API
   * - Create a dummy database and retreive instructors in fixed stacks
   *
   */
  const [page, setPage] = useState(1);
  const switchPage = (pageNum) => {
    setPage(pageNum, console.log("Updated list Page num:", pageNum));
  };

  const instructorMapper = (ind) =>
    mockData[ind].map((info) => {
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
        <Row className={styles.instructor_list}>{currentList}</Row>
        <div className={styles["pagination-container"]}>
          <CustomPagination pageNum={mockData.length} switchView={switchPage} />
        </div>
      </Container>
    </>
  );
}

export default instructorsList;
