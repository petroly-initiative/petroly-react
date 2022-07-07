import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
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
import translator from "../../dictionary/components/eval-tab-dict";
import { M } from "../../constants";
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

export default function EvaluationsTab({
  dataEval,
  loadingEval,
  errorEval,
  refetchEval,
  handleMsg,
}) {
  const [mode, setMode] = useState("view-all");
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const switchMode = () => {
    setMode(mode === "view-all" ? "search" : "view-all");
  };

  // const {
  //   data: dataEval,
  //   loading: loadingEval,
  //   error: errorEval,
  //   refetch: refetchEval,
  // } = useQuery(meEvaluationSetQuery, {
  //   notifyOnNetworkStatusChange: true,
  //   skip: user.status !== USER.LOGGED_IN,
  // });

  if (loadingEval) {
    return (
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>{langState.header}</span>
                {/* <Button on onClick={switchMode} className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button> */}
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <Form className={styles["header-search"]}>
                  <InputGroup>
                    <Form.Control
                      className={` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`}
                      placeholder={langState.searchbar}
                    />
                  </InputGroup>
                </Form>
                <div className={styles["search-set"]}>
                  {/* <Button onClick={switchMode} className={styles["btns"]}>
                    <FiSearch size="1.6rem" />
                  </Button> */}
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
            className={
              styles["loading-spinner"] +
              " shadow" +
              ` ${user.theme === M.DARK ? styles["dark-spinner"] : ""}`
            }
            animation="border"
            role="status"
          />
        </Card.Body>
      </Card>
    );
  }
  if (errorEval) {
    return (
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>{langState.header}</span>
                {/* <Button on onClick={switchMode} className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button> */}
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <Form className={styles["header-search"]}>
                  <InputGroup>
                    <Form.Control
                      className={` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`}
                      placeholder={langState.searchbar}
                    />
                  </InputGroup>
                </Form>
                <div className={styles["search-set"]}>
                  {/* <Button onClick={switchMode} className={styles["btns"]}>
                    <FiSearch size="1.6rem" />
                  </Button> */}
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
            <div style={{ color: "#4c5055c0" }}>{langState.err}</div>
          </div>
        </Card.Body>
      </Card>
    );
  }
  if (!dataEval) {
    return null;
  }

  // ? The mapped componentes will be stores in either according to mode
  const fullList = dataEval.me.evaluationSet.map((evaluation) => {
    return (
      <EvaluationPreview
        instructor={evaluation.instructor}
        evaluation={evaluation}
        refetch={refetchEval}
        handleMsg={handleMsg}
      />
    );
  });

  return (
    <>
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div
                className={
                  styles["card-headers"] +
                  ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                }
              >
                <span className={styles["card-title"]}>{langState.header}</span>
                {/* <Button
                  on
                  onClick={switchMode}
                  className={
                    styles["btns"] +
                    ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                  }
                >
                  <FiSearch size="1.6rem" />
                </Button> */}
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce>
              <div className={styles["card-headers"]}>
                <Form className={styles["header-search"]}>
                  <InputGroup>
                    <Form.Control
                      className={` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`}
                      placeholder={langState.searchbar}
                    />
                  </InputGroup>
                </Form>
                <div className={styles["search-set"]}>
                  {/* <Button onClick={switchMode} className={styles["btns"]}>
                    <FiSearch size="1.6rem" />
                  </Button> */}
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
