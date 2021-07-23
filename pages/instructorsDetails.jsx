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
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { MdFolderSpecial } from "react-icons/md";

export default function instructorDetails(props) {
  /**
   * TODOs:
   * ? Create a counter for evaluations
   * ? Overlay triggers for each progress bar
   * ? Use REM sizing for the rating board
   */

  const [modalVisible, setVisible] = useState(false);

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
        {/* Will later become the name of the instructor */}
        <title>Petroly | Rating Details</title>
      </Head>
      <Navbar />
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
                      src="/images/spongy.png"
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
                      <span>75</span>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className={cardStyles.instructor_name}>Muhab Abubaker</div>

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
                  overall={4.6}
                  grading={3}
                  teaching={4.3}
                  personality={1.9}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={8} className={styles.feedbackCol}>
            <Card className={styles.feedbackContainer + " shadow"}>
              <div className={styles.containerHeaders}>التعليقات</div>
              <Card.Body>
                <Row
                  style={{ paddingTop: "0px !important" }}
                  className={styles.prev_list}
                >
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
          name={"Muhab Abubaker"}
          image={<CgProfile size={75} id="profile" />}
          dept={"Software Engineering"}
          close={closeModal}
          visible={modalVisible}
        />
      </Container>
    </>
  );
}
