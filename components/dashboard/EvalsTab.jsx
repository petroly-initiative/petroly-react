import { Col, Card, Row, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import EvaluationPreview from "./EvaluationPrev";
import styles from "../../styles/dashboard-page/dashboard-tabs.module.scss";
import { MdCancel } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { FiSearch } from "react-icons/fi";
/**
 * 
 * ? Evaluation Tab setup
 * - data will be recieved via props from Dashboard.jsx query
 * - The component will have two states
 * *view-all: header is visible and all evals are showing
 * *search: a searchbar is visible with a cancel btn, only matching names will be showing
 * ! The seaching function will be handled locally in reactJS for this process
 * 
 * - Instructor data will be mapped via a custom component
 */

export default function EvaluationsTab(props){

  const [mode ,setMode]  = useState("view-all")
  const switchMode = () => {
    setMode(mode === "view-all" ? "search" : "view-all");
  };
  const fullList = "all of it";
  const matchingList = "matching only";

    return (
      <>
        <Card className={styles["card-containers"] + " shadow"}>
          <Card.Header className={styles["header-containers"]}>
            {mode === "view-all" && (
              <Fade>
                <div className={styles["card-headers"]}>
                  <span className={styles["card-title"]}>تقييماتي</span>
                  <Button on onClick={switchMode} className={styles["btns"]}>
                    <FiSearch size="1.6rem" />
                  </Button>
                </div>
              </Fade>
            )}
            {mode === "search" && (
              <Fade>
                <div className={styles["card-headers"]}>
                  <Form className={styles["header-search"]}>
                    <InputGroup>
                      <FormControl />
                    </InputGroup>
                  </Form>
                  <div className={styles["search-set"]}>
                    <Button onClick={switchMode} className={styles["btns"]}>
                      <FiSearch size="1.6rem" />
                    </Button>
                  </div>
                </div>
              </Fade>
            )}
          </Card.Header>
          <Card.Body className={styles["card-body"]}>
            <Row>
              {/* conditoinal mapping between all available and only search match*/}
              {mode === "view-all" && fullList}
              {mode === "search" && matchingList}
            </Row>
          </Card.Body>
        </Card>
      </>
    );
}