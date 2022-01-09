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
import Navbar from "../../components/navbar";
import styles from "../../styles/evaluation-page/instructors-details.module.scss";
import cardStyles from "../../styles/evaluation-page/instructors-card.module.scss";
import { UserContext } from "../../state-management/user-state/UserContext";
import { USER } from "../../constants";
import { AiFillEdit } from "react-icons/ai";
import Evaluation from "../../components/evaluation/Evaluation";
import InstructorRates from "../../components/Instructros/InstructorRates";
import EvaluationModal from "../../components/evaluation/EvaluationModal";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Head from "next/head";
import { MdFolderSpecial } from "react-icons/md";
import client from "../../api/apollo-client";
import { useQuery } from "@apollo/client";
import {
  getInstructorName,
  getInstructorDetail,
  hasEvaluatedQuery,
} from "../../api/queries";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
import translator from "../../dictionary/pages/instructor-details-dict"

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: getInstructorName,
    variables: {},
  });
  const ids = data.instructors.data.map((element) => {
    return {
      params: {
        instructor: element.id,
      },
    };
  });

  /**
   * we need to return an array of objects each with  param property
   * which include information needed for our path
   * that includes the tokenzied dynamic path
   */
  return {
    paths: ids,
    fallback: false,
  };
};
// This function will run for each path we provided
export const getStaticProps = async (context) => {
  const id = context.params.instructor;

  const { data } = await client.query({
    query: getInstructorDetail,
    variables: { id },
  });

  return {
    props: { data: data },
    revalidate: 3,
  };
};

export default function instructorDetails({ data }) {
  const router = useRouter();
  const [modalVisible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const {user} = useContext(UserContext);
   const [langState, setLang] = useState(() => translator(user.lang));

   useEffect(() => {
     // console.log(userContext.user.lang);
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
    if (user.status === USER.LOGGED_IN) {
      if (dataHasEvaluated) {
        if (dataHasEvaluated.hasEvaluated) {
          setMsg(`${langState.evaluated}`);
          setVisible(false);
          // we can redirect the user to the eavaluation edit page
        } else setMsg(`${langState.evalAllow}`);
      }
    } else setMsg("{langState.evalBlock}");
  }, [loadingHasEvaluated, user.status]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const closeModal = () => {
    setVisible(false);
  };

  const launchModal = () => {
    if (
      user.status === USER.LOGGED_IN &&
      !dataHasEvaluated.hasEvaluated
    )
      setVisible(true);
  };

  const colors = [
    "rgb(235, 24, 122)",
    "rgb(9, 248, 236)",
    "rgb(9, 248, 236)",
    "rgb(255 125 48)",
  ];

  const randomColor = () => {
    return (
      colors[Math.floor(Math.random() * colors.length)] +
      ' url("/images/background.svg")'
    );
  };
  // FIXME: add a filler image for empty evals
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

  const gradientColor = () => {
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
        return `rgb(204, 204, 204), rgb(163, 163, 163)`;
    }
  };

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
      <Navbar page="rating" />
      <Container className={styles.container}>
        <Row className={styles["col-container"]}>
          <Col xl={4} lg={6} className={styles.statsCol}>
            <Card style={{ borderRadius: 8 }} className={"shadow border-0"}>
              <Card.Body
                style={{ width: "100%" }}
                className={cardStyles.container}
              >
                <div className={cardStyles.cardColor + " cardColor"}>
                  <div className={cardStyles.insuctor_pic + " shadow"}>
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
                      <Tooltip id="button-tooltip-2">{langState.evalCount}</Tooltip>
                    }
                  >
                    <div className={cardStyles.eval_counter}>
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
              className={styles.statContainer + " shadow"}
            >
              <Card.Body className={styles.statsCard + " shadow"}>
                <div className={styles.containerHeaders}>{langState.ratingHeader}</div>
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
            <Card className={styles.feedbackContainer + " shadow"}>
              <div className={styles.containerHeaders}>{langState.recentEvals}</div>
              <Card.Body style={{ width: "100%" }}>
                <Row
                  style={{ paddingTop: "0px !important" }}
                  className={styles.prev_list}
                >
                  {/**
                   * The evaluations will also be a past of the response object in fetching
                   */}
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
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {loadingHasEvaluated ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 350, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-2">{langState.checkingData}</Tooltip>}
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
        />
      </Container>
    </>
  );
}
