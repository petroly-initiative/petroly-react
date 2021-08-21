import {
  Col,
  Row,
  Container,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Navbar from "../components/navbar";
import styles from "../styles/evaluation-page/instructors-details.module.scss";
import cardStyles from "../styles/evaluation-page/instructors-card.module.scss";
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import Evaluation from "../components/evaluation/Evaluation";
import InstructorRates from "../components/Instructros/InstructorRates";
import EvaluationModal from "../components/evaluation/EvaluationModal";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { MdFolderSpecial } from "react-icons/md";
import mockData from "../dummy-data/instructors-data.json";
import client from "../api/apollo-client";
import { getInstructorName, getInstructorDetail } from "../api/queries";


export const getStaticPaths = async () => {
  //! Should be replaced by an API Call to get all instructor names for dynamic path creation

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
    fallback: true,
  };
};
// This function will run for each path we provided
export const getStaticProps = async (context) => {
  const id = context.params.instructor;

  const { data } = await client.query({
    query: getInstructorDetail,
    variables: {id}});

  return {
    props: { data: data },
    revalidate: 5,
  };
};

// TODO: Replacing static evaluations with mapped mock data

export default function instructorDetails({ data }) {
  const [modalVisible, setVisible] = useState(false);

  useEffect(() => {
    console.log(data);
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  const colors = [
    "rgb(235, 24, 122)",
    "rgb(9, 248, 236)",
    "rgb(9, 248, 236)",
    "rgb(255 125 48)",
  ];

  const randomColor = () => {
    console.log("finished", Math.floor(Math.random() * colors.length));
    return (
      colors[Math.floor(Math.random() * colors.length)] +
      ' url("/images/background.svg")'
    );
  };
  // !WARNING: Change eval structure according to specified date
  const evalMapper = () => 
    data.instructor.evaluationSet.data.map(evaluation => 
      <Evaluation
        date={evaluation.date.split("T")[0]}
        grading={""}
        teaching={evaluation.comment}
        personality=""
        rating={[
          evaluation.grading,
          evaluation.teaching,
          evaluation.personality,
        ]}
        term={""}
        course={evaluation.course.toUpperCase()}
      />
    );
  

  const evalList = evalMapper();


  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <>
      <Head>
        <title>Petroly | {data.instructor.name}</title>
      </Head>
      <Navbar page="rating" />
      <Container className={styles.container}>
        <Row
          style={{
            margin: "16px !important",
            padding: "16px",
            display: "flex !important",
            alignItems: "center !important",
            width: "100%"
          }}
        >
          <Col xl={4} className={styles.statsCol}>
            <Card style={{ borderRadius: 8 }} className={"shadow border-0"}>
              <Card.Body style={{width: "100%"}} className={cardStyles.container}>
                <div
                  style={{ background: randomColor() }}
                  className={cardStyles.cardColor}
                >
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
                      <Tooltip id="button-tooltip-2">عدد المقيّمين</Tooltip>
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
              <Card.Body className={styles.statsCard}>
                <div className={styles.containerHeaders}>التقييم العام</div>
                <InstructorRates
                  overall={data.instructor.overallFloat}
                  //!WARNING: All category scores should be fetched from data
                  grading={(data.instructor.gradingAvg / 20).toPrecision(2)}
                  teaching={(data.instructor.teachingAvg / 20).toPrecision(2)}
                  personality={(data.teachingAvg / 20).toPrecision(2)}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={8} className={styles.feedbackCol}>
            <Card className={styles.feedbackContainer + " shadow"}>
              <div className={styles.containerHeaders}>التقييمات السابقة</div>
              <Card.Body style={{width: "100%"}}>
                <Row
                  style={{ paddingTop: "0px !important" }}
                  className={styles.prev_list}
                >
                  {/**
                   * The evaluations will also be a past of the response object in fetching
                   */}

                    {evalList}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <OverlayTrigger
          placement="top"
          delay={{ show: 350, hide: 400 }}
          overlay={<Tooltip id="button-tooltip-2">قيّم المحاضِر</Tooltip>}
        >
          <Button
            id="evaluate"
            className={styles.evalBtn}
            onClick={() => {
              setVisible(true);
            }}
          >
            <AiFillEdit size={32} />
          </Button>
        </OverlayTrigger>
        <EvaluationModal
          name={data.instructor.name}
          image={
            <Image
              style={{ borderRadius: "30px !important" }}
              className={cardStyles.picDiv}
              src={data.instructor.profilePic}
              width="70"
              height="70"
            />
          }
          dept= {data.instructor.department}
          close={closeModal}
          visible={modalVisible}
        />
      </Container>
    </>
  );
}
