import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/home-page/home.module.scss";
import Navbar from "../components/navbar";
import NewsCard from "../components/home/news-card";
import ServiceCard from "../components/home/service-card";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import ChatCard from "../components/home/Chat-card";
import { HiDesktopComputer } from "react-icons/hi";
import { GiMaterialsScience } from "react-icons/gi";
import { Fade } from "react-awesome-reveal";

export default function HomeScreen() {
  /**
   * TODO:
   * - Create a Grid Layout for the trending Section
   * - Create Discussion Cards
   */
  return (
    <>
      <Head>
        <title>Petroly | home</title>
      </Head>
      <Navbar page="home" />
      <Container className={styles["main-container"]}>
        <Fade cascade damping={0.05} triggerOnce direction="up">
          <div className={styles["titles"]}>أخبار بترولي</div>
          <Row className={styles["containers"]}>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title="COE Concentration Program"
                header='url("/images/books.jpg")'
                content=" علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title=" Concentration Program"
                header='url("/images/books.jpg")'
                content=" علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title="KFUPM  registration"
                header=' url("/images/coding.jpg")'
                content=" علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title="KFUPM 2021 registration"
                header=' url("/images/coding.jpg")'
                content=" علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title="Petroly  V2"
                header=' url("/images/architecture.jpg")'
                content=" علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title="Petroly  V2.0"
                header=' url("/images/architecture.jpg")'
                content=" علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
              />
            </Col>
          </Row>
          <Row className={styles["containers"]}>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={7}
              className={[styles["trending"], styles["columns"]]}
            >
              <Row style={{ width: "100%" }}>
                <Col xs={12} xl={12} className={styles["titles"]}>
                  المحادثات الشائعة
                </Col>
                <Col xs={12} xl={12} className={styles["columns"]}>
                  {/*Grid Layout for 3 Messages*/}
                  <Card className={[styles["xl-card"]]}>
                    <ChatCard
                      profile={
                        <Image
                          className={styles.profile}
                          src="/images/muhabpower.png"
                          width="40"
                          height="40"
                        />
                      }
                      tags={[
                        {
                          name: "Tech",
                          color: "#00ead3",
                          icon: (
                            <HiDesktopComputer size="1.2rem" color="white" />
                          ),
                        },
                        {
                          name: "Physics",
                          color: "#0091E7",
                          icon: (
                            <GiMaterialsScience size="1.2rem" color="white" />
                          ),
                        },
                      ]}
                      content="دمة لأبنائها ادمة لأبنائها ادمة لأبنائها ادمة لأبنائها ادمة لأبنائها ا عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات للدفعة القادمة لأبنائها الطلاب والطالبات لأبنائها الطلاب و لأبنائها الطلاب و لأبنائها الطلاب و دفعة القادمة لأبنائها الطلاب والطالبا علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات  علنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات أعلنت الجامعة عن يرامج جديدة للدفعة القادمة لأبنائها الطلاب والطالبات"
                      Title="ر استغرابي في الفترة الماضي ر استغرابي في الفترة الماضي ر استغرابي في الفترة الماضية"
                      date="20-7-2021"
                      upvote={72}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xl={5} lg={6} sm={12} xs={12}>
              <Row>
                <Col xl={12} xs={12} className={styles["titles"]}>
                  خدماتنا
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  lg={6}
                  xl={6}
                  className={[styles["services"], styles["columns"]]}
                >
                  <ServiceCard title="التقييم" header="/images/home/rating.svg" />
                  <ServiceCard
                    title="المجتمعات"
                    header="/images/home/communities-icon.svg"
                  />
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  lg={6}
                  xl={6}
                  className={[styles["services"], styles["columns"]]}
                >
                  <ServiceCard
                    title="المحادثات"
                    header="/images/home/chat.svg"
                  />
                  <ServiceCard
                    title="الموارد"
                    header="/images/home/resources-icon.svg"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Fade>
      </Container>
    </>
  );
}
