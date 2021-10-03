import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import EvaluationPreview from "./EvaluationPrev";
import styles from "../../styles/dashboard-page/dashboard-tabs.module.scss";
import { Fade } from "react-awesome-reveal";
import { FiSearch } from "react-icons/fi";
import { RiErrorWarningFill } from "react-icons/ri";
import { UserContext } from "../../state-management/user-state/UserContext";
import { useQuery } from "@apollo/client";
import { meEvaluationSetQuery } from "../../api/queries";
import { USER } from "../../constants";

/**
 *
 * ? Evaluation Tab setup
 * - data will be recieved via props from Dashboard.jsx query
 * - The component will have two states
 * *view-all: header is visible and all evals are showing
 * *search: a searchbar is visible with a cancel btn, only matching names will be showing
 *
 * - Instructor data will be mapped via a custom component
 */

export default function EvaluationsTab(props) {
  const [mode, setMode] = useState("view-all");
  const userContext = useContext(UserContext);

  const switchMode = () => {
    setMode(mode === "view-all" ? "search" : "view-all");
  };

  const {
    data: dataEval,
    loading: loadingEval,
    error: errorEval,
  } = useQuery(meEvaluationSetQuery, {
    notifyOnNetworkStatusChange: true,
    skip: userContext.user.status !== USER.LOGGED_IN,
  });

  if (loadingEval) {
    console.log("loading");
    return (
      <Card className={styles["card-containers"] + " shadow"}>
        <Card.Header className={styles["header-containers"]}>
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>تقييماتي</span>
                <Button on onClick={switchMode} className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button>
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce>
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
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={styles["card-body"] + " " + styles["eval-cards"]}
        >
          <Spinner
            className={styles["loading-spinner"] + " shadow"}
            animation="border"
            role="status"
          />
        </Card.Body>
      </Card>
    );
  }
  if (errorEval) {
    return (
      <Card className={styles["card-containers"] + " shadow"}>
        <Card.Header className={styles["header-containers"]}>
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>تقييماتي</span>
                <Button on onClick={switchMode} className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button>
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce>
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
        <Card.Body
          style={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 16,
          }}
          className={styles["card-body"] + " " + styles["eval-cards"]}
        >
          <div
            style={{
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="shadow text-center"
          >
            <RiErrorWarningFill
              style={{ margin: 12, width: "100%" }}
              color="#FF0075"
              size="5rem"
            />
            <div style={{ color: "#4c5055c0" }}>خطأ في استعادة البيانات</div>
          </div>
        </Card.Body>
      </Card>
    );
  }
  if (!dataEval) {
    return null;
  }

  // ? The mapped componentes will be stores in either according to mode
  const fullList = dataEval.me.evaluationSet.data.map((evaluation) => {
    return (
      <EvaluationPreview
        instructor={evaluation.instructor}
        evaluation={evaluation}
      />
    );
  });
  const matchingList = "matching only";

  return (
    <>
      <Card className={styles["card-containers"] + " shadow"}>
        <Card.Header className={styles["header-containers"]}>
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>تقييماتي</span>
                <Button on onClick={switchMode} className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button>
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce>
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
        <Card.Body
          style={{
            padding: 0,
            paddingTop: 8,
          }}
          className={styles["card-body"] + " " + styles["eval-cards"]}
        >
          <Row className={styles["evals-row"]}>
            {/* conditoinal mapping between all available and only search match*/}
            <Fade
              triggerOnce
              damping={0.05}
              className={"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6"}
            >
              {fullList}
            </Fade>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
