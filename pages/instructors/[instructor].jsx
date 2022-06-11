import {
  Col,
  Row,
  Container,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";

import styles from "../../styles/evaluation-page/instructors-details.module.scss";
import cardStyles from "../../styles/evaluation-page/instructors-card.module.scss";
import { UserContext } from "../../state-management/user-state/UserContext";
import { langDirection, USER } from "../../constants";
import { AiFillEdit } from "react-icons/ai";
import { FaBatteryEmpty } from "react-icons/fa";
import Evaluation from "../../components/evaluation/Evaluation";
import InstructorRates from "../../components/instructors/InstructorRates";
import EvaluationModal from "../../components/evaluation/EvaluationModal";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Head from "next/head";
import { MdFolderSpecial } from "react-icons/md";
import client from "../../api/apollo-client";
import { useQuery } from "@apollo/client";
import { getInstructorDetail, hasEvaluatedQuery } from "../../api/queries";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
import translator from "../../dictionary/pages/instructor-details-dict";
import { M, L } from "../../constants";
import { useCallback } from "react";
import PopMsg from "../../components/utilities/PopMsg";
import { NavContext } from "../../state-management/navbar-state/NavbarContext";

// export const getStaticPaths = async () => {
//   const { data } = await client.query({
//     query: getEvaluatedInstructors,
//     variables: {},
//   });

//   const ids = data.evaluatedInstructors.map((id) => {
//     return {
//       params: {
//         instructor: id,
//       },
//     };
//   });

//   /**
//    * we need to return an array of objects each with  param property
//    * which include information needed for our path
//    * that includes the tokenzied dynamic path
//    */
//   return {
//     paths: ids,
//     fallback: "blocking",
//   };
// };
// This function will run for each path we provided
export const getServerSideProps = async (context) => {
  const id = context.params.instructor;

  const { data } = await client.query({
    query: getInstructorDetail,
    variables: { id },
    fetchPolicy: "network-only",
  });

  return {
    props: { data: data },
  };
};

export default function instructorDetails({ data }) {
  const router = useRouter();
  const [modalVisible, setVisible] = useState(false);
  const [msg, setEvalMsg] = useState("");
  const [msgVisible, setMsg] = useState(false);
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));
  const { navDispatch } = useContext(NavContext);

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const { data: dataHasEvaluated, loading: loadingHasEvaluated } = useQuery(
    hasEvaluatedQuery,
    {
      skip: user.status !== USER.LOGGED_IN,
      variables: { instructorId: data.instructor.id },
    }
  );

  useEffect(() => {
    navDispatch("");
  }, []);

  useEffect(() => {
    if (user.status === USER.LOGGED_IN) {
      if (dataHasEvaluated) {
        if (dataHasEvaluated.hasEvaluated) {
          setEvalMsg(`${langState.evaluated}`);
          setVisible(false);
          // we can redirect the user to the eavaluation edit page
        } else setEvalMsg(`${langState.evalAllow}`);
      }
    } else setEvalMsg(`${langState.evalBlock}`);
  }, [loadingHasEvaluated, user.status]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const closeModal = () => {
    setVisible(false);
  };

  const launchModal = () => {
    if (user.status === USER.LOGGED_IN && !dataHasEvaluated.hasEvaluated)
      setVisible(true);
  };

  const evalMapper = () =>
    data.instructor.evaluationSet.data.map((evaluation) => (
      <Evaluation
        date={evaluation.date.split("T")[0]}
        grading={evaluation.gradingComment}
        teaching={evaluation.teachingComment}
        personality={evaluation.personalityComment}
        rating={[
          evaluation.grading,
          evaluation.teaching,
          evaluation.personality,
        ]}
        comment={evaluation.comment}
        term={evaluation.term}
        course={evaluation.course.toUpperCase()}
      />
    ));

  const evalList = evalMapper();

  const gradientColor = useCallback(() => {
    switch (Math.round(data.instructor.overallFloat)) {
      case 5:
      case 4:
        return `rgb(0, 183, 255),
              rgb(0, 255, 191)`;
      case 3:
        return `yellow,
              rgb(255, 120, 120)`;
        break;
      case 2:
      case 1:
        return `orange,
              rgb(255, 90, 90)`;
      default:
        return `rgb(189, 189, 189), rgb(189, 189, 189)`;
    }
  }, [data.instructor.overallFloat]);

  return (
    <>
      <style jsx>
        {`
          .cardColor::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 4px;
            right: 0;
            background-image: linear-gradient(to right, ${gradientColor()});
          }
        `}
      </style>
      <Head>
        <title>Petroly | {data.instructor.name}</title>
      </Head>
      {/* <Navbar page="rating" /> */}
      <Container className={styles.container}>
        <Row className={styles["col-container"]}>
          <Col xl={4} lg={6} className={styles.statsCol}>
            <Card
              style={{ borderRadius: 8 }}
              className={
                "shadow border-0" +
                ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
              }
            >
              <Card.Body
                style={{ width: "100%" }}
                className={cardStyles.container}
              >
                <div className={cardStyles.cardColor + " cardColor"}>
                  <div
                    className={
                      cardStyles.insuctor_pic +
                      " shadow" +
                      ` ${user.theme === M.DARK ? styles["dark-border"] : ""}`
                    }
                  >
                    <Image
                      className={cardStyles.picDiv}
                      src={data.instructor.profilePic}
                      width="70"
                      height="70"
                    />
                  </div>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 150, hide: 200 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {langState.evalCount}
                      </Tooltip>
                    }
                  >
                    <div
                      className={
                        cardStyles.eval_counter +
                        ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                      }
                    >
                      <MdFolderSpecial />
                      {/**! WARNING Needs to be fetched */}
                      <span>{data.instructor.evaluationSet.count}</span>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className={cardStyles.instructor_name}>
                  {data.instructor.name}
                </div>

                <div className={cardStyles.instructor_dept}>
                  {data.instructor.department}
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{ borderRadius: 8 }}
              className={
                styles.statContainer +
                " shadow" +
                ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
              }
            >
              <Card.Body
                className={
                  styles.statsCard +
                  " shadow" +
                  ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                }
              >
                <div className={styles.containerHeaders}>
                  {langState.ratingHeader}
                </div>
                <InstructorRates
                  overall={data.instructor.overallFloat}
                  //!WARNING: All category scores should be fetched from data
                  grading={(data.instructor.gradingAvg / 20).toPrecision(2)}
                  teaching={(data.instructor.teachingAvg / 20).toPrecision(2)}
                  personality={(
                    data.instructor.personalityAvg / 20
                  ).toPrecision(2)}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={8} lg={6} sm={12} className={styles.feedbackCol}>
            <Card
              className={
                styles.feedbackContainer +
                " shadow" +
                ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
              }
            >
              <div className={styles.containerHeaders}>
                {langState.recentEvals}
              </div>
              <Card.Body
                className={styles["evals-card"]}
                style={{ width: "100%" }}
              >
                <Row
                  style={{ paddingTop: "0px !important" }}
                  className={styles.prev_list}
                >
                  {/**
                   * The evaluations will also be a past of the response object in fetching
                   */}
                  {evalList.length !== 0 ? (
                    <>
                      <Col sm={12} xs={12} md={12} lg={12} xl={6}>
                        <Fade
                          duration={1200}
                          cascade
                          damping={0.02}
                          triggerOnce
                          direction="up"
                        >
                          {evalList.filter((e, i) => i % 2 == 0)}
                        </Fade>
                      </Col>
                      <Col sm={12} xs={12} md={12} lg={12} xl={6}>
                        <Fade
                          duration={1200}
                          cascade
                          damping={0.02}
                          triggerOnce
                          direction="up"
                        >
                          {evalList.filter((e, i) => i % 2 == 1)}
                        </Fade>
                      </Col>
                    </>
                  ) : (
                    <>
                      <div className={styles["empty-container"]}>
                        <FaBatteryEmpty size="15vmax" />
                        <span
                          className={` ${
                            user.theme === M.DARK ? styles["dark-header"] : ""
                          }`}
                        >
                          {langState.emptyMsg}
                        </span>
                      </div>
                    </>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {loadingHasEvaluated ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 350, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-2">{langState.checkingData}</Tooltip>
            }
          >
            <Button
              id="evaluate"
              className={styles.evalBtn}
              style={{ backgroundColor: "gray" }}
            >
              <Spinner animation="border" role="status" />
            </Button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="top"
            delay={{ show: 350, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-2">{msg}</Tooltip>}
          >
            <Button
              id="evaluate"
              className={styles.evalBtn}
              onClick={launchModal}
              style={{
                backgroundColor:
                  user.status !== USER.LOGGED_IN ||
                  dataHasEvaluated.hasEvaluated
                    ? "gray"
                    : "#00ead3",
              }}
            >
              <AiFillEdit size={32} />
            </Button>
          </OverlayTrigger>
        )}
        <EvaluationModal
          name={data.instructor.name}
          id={data.instructor.id}
          image={
            <Image
              style={{ borderRadius: "30px !important" }}
              className={cardStyles.picDiv}
              src={data.instructor.profilePic}
              width="70"
              height="70"
            />
          }
          dept={data.instructor.department}
          close={closeModal}
          visible={modalVisible}
          gradingRating={0}
          gradingCom={""}
          teachingRating={0}
          teachingCom={""}
          personRating={0}
          personCom={""}
          comment={""}
          term={""}
          course={""}
          handleMsg={setMsg}
        />
        <PopMsg
          visible={msgVisible}
          msg={
            user.lang === L.AR_SA
              ? "تم تقييم المحاضر بنجاح الرجاء الانتظار قليلا لظهور التقييم"
              : "Instructor Evaluated successfully. Please wait for your evaluation to show up"
          }
          handleClose={setMsg}
          success
          // you can use failure or none for different message types
        />
      </Container>
    </>
  );
}
