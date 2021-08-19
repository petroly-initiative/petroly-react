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
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { MdFolderSpecial } from "react-icons/md";
import mockData from "../dummy-data/instructors-data.json";

export const getStaticPaths = async () => {
  //! Should be replaced by an API Call to get all instructor names for dynamic path creation
  const data = mockData;
  const names = data[0].map((val) => {
    return {
      params: {
        instructor: val.name,
      },
    };
  });

  /**
   * we need to return an array of objects each with  param property
   * which include information needed for our path
   * that includes the tokenzied dynamic path
   */
  return {
    paths: names,
    fallback: false,
  };
};
// This function will run for each path we provided
export const getStaticProps = async (context) => {
  const id = context.params.instructor;
  // !WARNING: This code should be replaced by an API Query
  const index = mockData[0].findIndex((element) => element.name === id);

  const data = mockData[0][index];

  return {
    props: { instructorData: data },
    revalidate: 5
  };
};

// TODO: Replacing static evaluations with mapped mock data

export default function instructorDetails({ instructorData }) {
  const [modalVisible, setVisible] = useState(false);

  useEffect(() => {
    console.log(instructorData);
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

  return (
    <>
      <Head>
        <title>Petroly | {instructorData.name}</title>
      </Head>
      <Navbar page="rating" />
      <Container className={styles.container}>
        <Row
          style={{
            margin: "16px !important",
            padding: "16px",
            display: "flex !important",
            alignItems: "center !important",
          }}
        >
          <Col xl={4} className={styles.statsCol}>
            <Card style={{ borderRadius: 8 }} className={"shadow border-0"}>
              <Card.Body className={cardStyles.container}>
                <div
                  style={{ background: randomColor() }}
                  className={cardStyles.cardColor}
                >
                  <div className={cardStyles.insuctor_pic + " shadow"}>
                    <Image
                      className={cardStyles.picDiv}
                      src={instructorData.src}
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
                      <span>{instructorData.evalCount}</span>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className={cardStyles.instructor_name}>
                  {instructorData.name}
                </div>

                <div className={cardStyles.instructor_dept}>
                  Software Engineering
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
                  overall={parseFloat(instructorData.rating)}
                  //!WARNING: All category scores should be fetched from data
                  grading={3}
                  teaching={4.3}
                  personality={1.9}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={8} className={styles.feedbackCol}>
            <Card className={styles.feedbackContainer + " shadow"}>
              <div className={styles.containerHeaders}>التقييمات السابقة</div>
              <Card.Body>
                <Row
                  style={{ paddingTop: "0px !important" }}
                  className={styles.prev_list}
                >
                  {/**
                   * The evaluations will also be a past of the response object in fetching
                   */}
                  <Col xs={12} md={6}>
                    <Evaluation
                      date="21/6/2001"
                      grading=" what a phenomenal experience to be taught under this teacher"
                      teaching=" really really goooooood"
                      personality="despite being angry, he is really friendly most of the tim"
                      rating={4}
                      term="201"
                      course="PHYS201"
                    />
                    <Evaluation
                      date="21/6/2001"
                      grading=" what a phenomenal experience to be taught under this teacher"
                      teaching=" really really goooooood"
                      personality="despite being angry, he is really friendly most of the tim"
                      rating={5}
                      course="PHYS101"
                      term={193}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Evaluation
                      date="21/6/2001"
                      grading=" what a phenomenal experience to be taught under this teacher"
                      teaching=" really really goooooood"
                      personality="despite being angry, he is really friendly most of the tim"
                      rating={5}
                      course="PHYS102"
                      term="203"
                    />
                    <Evaluation
                      date="21/9/2020"
                      grading=" what a phenomenal experience to be taught under this teacher"
                      teaching=" really really goooooood"
                      personality="despite being angry, he is really friendly most of the tim"
                      rating={5}
                      course="PYP003"
                    />
                    <Evaluation
                      date="21/6/2001"
                      grading=" what a phenomenal experience to be taught under this teacher"
                      teaching=" really really goooooood"
                      personality="despite being angry, he is really friendly most of the tim"
                      rating={5}
                    />
                  </Col>
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
          name={instructorData.name}
          image={<CgProfile size={75} id="profile" />}
          dept={"Software Engineering"}
          close={closeModal}
          visible={modalVisible}
        />
      </Container>
    </>
  );
}
