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
    return <Spinner animation="border" role="status" />;
  }
  if (errorEval) {
    return <p>Error whilst getting your evaluations</p>;
  }
  if (!dataEval) {
    return null;
  }

  const evalMapper = () =>
    dataEval.me.evaluationSet.data.map((evaluation) => {
      return (
        <EvaluationPreview
          pic={evaluation.instructor.profilePic}
          name={evaluation.instructor.name}
          dept={evaluation.instructor.department}
          overall={5}
        />
      );
    });

  // ? The mapped componentes will be stores in either according to mode
  const fullList = dataEval.me.evaluationSet.data.map((evaluation) => {
    return <EvaluationPreview data={evaluation.instructor} />;
  });
  const matchingList = "matching only";
  console.log(fullList);

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
              <EvaluationPreview
                pic="/images/spongy.png"
                name="Muhab"
                dept="ICS"
                overall={5}
                gradingRating={5}
                gradingCom={"An easyily achieavable A+"}
                teachingRating={3}
                teachingCom={"Not that good  in delivering"}
                personRating={5}
                personCom={"Really helpful"}
                term={"211"}
                course={"ICS108"}
              />
              <EvaluationPreview
                pic="/images/muhabpower.png"
                name="Naruto"
                dept="Shinobi"
                overall={3}
                gradingRating={5}
                gradingCom={"An easyily achieavable A+"}
                teachingRating={3}
                teachingCom={"Not that good  in delivering"}
                personRating={2}
                personCom={"Really helpful"}
                term={"211"}
                course={"ICS104"}
              />
              <EvaluationPreview
                pic="/images/muhabpower.png"
                name="Naruto"
                dept="Shinobi"
                overall={3}
                gradingRating={5}
                gradingCom={"An easyily achieavable A+"}
                teachingRating={3}
                teachingCom={"Not that good  in delivering"}
                personRating={2}
                personCom={"Really helpful"}
                term={"211"}
                course={"ICS104"}
              />
              <EvaluationPreview
                pic="/images/muhabpower.png"
                name="Naruto"
                dept="Shinobi"
                overall={3}
                gradingRating={5}
                gradingCom={"An easyily achieavable A+"}
                teachingRating={3}
                teachingCom={"Not that good  in delivering"}
                personRating={2}
                personCom={"Really helpful"}
                term={"211"}
                course={"ICS104"}
              />
              <EvaluationPreview
                pic="/images/muhabpower.png"
                name="Naruto"
                dept="Shinobi"
                overall={3}
                gradingRating={5}
                gradingCom={"An easyily achieavable A+"}
                teachingRating={3}
                teachingCom={"Not that good  in delivering"}
                personRating={2}
                personCom={"Really helpful"}
                term={"211"}
                course={"ICS104"}
              />
              <EvaluationPreview
                pic="/images/muhabpower.png"
                name="Naruto"
                dept="Shinobi"
                overall={3}
                gradingRating={5}
                gradingCom={"An easyily achieavable A+"}
                teachingRating={3}
                teachingCom={"Not that good  in delivering"}
                personRating={2}
                personCom={"Really helpful"}
                term={"211"}
                course={"ICS104"}
              />
            </Fade>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
