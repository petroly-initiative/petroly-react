import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/home-page/home.module.scss";
import Navbar from "../components/navbar";
import NewsCard from "../components/home/news-card";
import ServiceCard from "../components/home/service-card";
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
        <meta
          name="description"
          content="Petroly intiative is a platform to serve the digital needs for all kfupmers"
        />
      </Head>
      <Navbar page="home" />
      <Container className={styles["main-container"]}>
        <Fade cascade damping={0.05} triggerOnce direction="up">
          <div className={styles["titles"]}>أخبار بترولي</div>
          <Row style={{ direction: "rtl" }} className={styles["containers"]}>
            <Col
              xl={8}
              lg={8}
              md={12}
              sm={12}
              className={[styles["news"], styles["columns"]]}
            >
              <NewsCard
                title="بترولي بحلة جديدة!"
                size="lg"
                header="/images/home/update-news.jpg"
                content="مبادرة بترولي تعود لكم بحلة جديدة. واجهة جديدة وسهلة للاستخدام. وخدمة المجتمعات الجديدة لتقريب المسافات بين أصحاب الاهتمامات المشتركة. والقادم أكثر"
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
                title="التقييم صار أسهل"
                header="/images/home/rating-news.jpg"
                content="واجهة جديدة تسهل لك عرض آخر التقييمات, وعملية تقييم أسلس من ذي قبل"
              />
              <NewsCard
                title="البتروليين صاروا أقرب! "
                header="/images/home/groups-news.jpg"
                content="تعبت من البحث عن بتروليين يشاركونك اهتماماتك وتطلعاتك؟ ستجد ضالتك في مجتمعات بترولي بكل تأكيد"/>
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
            ></Col>
            <Col xl={12} lg={12} sm={12} xs={12}>
              <Row>
                <Col xl={12} xs={12} className={styles["titles"]}>
                  خدماتنا
                </Col>
                <Col xl={6} xs={12}>
                  <ServiceCard
                    title="التقييم"
                    header="/images/home/rating.webp"
                  />
                </Col>
                <Col xl={6} xs={12}>
                  <ServiceCard
                    title="المجتمعات"
                    header="/images/home/communities-icon.webp"
                  />
                </Col>

                {/* <Col
                  xs={12}
                  sm={6}
                  lg={6}
                  xl={6}
                  className={[styles["services"], styles["columns"]]}
                >
                  <ServiceCard
                    title="المحادثات"
                    header="/images/home/chat.webp"
                  />
                  <ServiceCard
                    title="الموارد"
                    header="/images/home/resources-icon.webp"
                  />
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Fade>
      </Container>
    </>
  );
}
