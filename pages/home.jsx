import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/home-page/home.module.scss";

import NewsCard from "../components/home/news-card";
import ServiceCard from "../components/home/service-card";
import Image from "next/image";
import Head from "next/head";
import ChatCard from "../components/home/Chat-card";
import { HiDesktopComputer } from "react-icons/hi";
import { GiMaterialsScience } from "react-icons/gi";
import { Fade } from "react-awesome-reveal";
import translator from "../dictionary/pages/home-dict";
import { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { T, L, langDirection, M } from "../constants";
import { NavContext } from "../state-management/navbar-state/NavbarContext";

export default function HomeScreen() {
  /**
   * TODO:
   * - Translation to english while taking into consideration the text direction
   */

  const { user } = useContext(UserContext);
  const { navDispatch } = useContext(NavContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  useEffect(() => {
    navDispatch("home");
  }, []);

  return (
    <>
      <Head>
        <title>Petroly | home</title>
        <meta name="title" content="Petroly | home" />
        <meta name="description" content="Digital Platform for All KFUPMers" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://petroly.co/" />
        <meta property="og:title" content="Petroly | home" />
        <meta
          property="og:description"
          content="Digital Platform for All KFUPMers"
        />
        <meta property="og:image" content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png" />
        <meta
          property="og:image:secure_url"
          content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://petroly.co/" />
        <meta property="twitter:title" content="Petroly | home" />
        <meta
          property="twitter:description"
          content="Digital Platform for All KFUPMers"
        />

        <meta property="twitter:image" content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png" />
        <meta
          property="twitter:image:src"
          content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4435926247205725"
          crossorigin="anonymous"
        ></script>
      </Head>
      
      {/* <Navbar page="home" /> */}
      <Container className={styles["main-container"]}>
        <Fade
          className={styles["fader"]}
          cascade
          damping={0.05}
          triggerOnce
          direction="up"
        >
          <div
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            style={langDirection(user.lang)}
            className={styles["titles"]}
          >
            <Image
              className={styles["header-big"]}
              alt="petroly text icon"
              src={"/header-plain.svg"}
              width={194}
              height={67}
            />
          </div>

          <Row
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            style={langDirection(user.lang)}
            className={styles["containers"]}
          >
            <Col xl={8} lg={8} md={12} sm={12} className={[styles["columns"]]}>
              <NewsCard
                title={langState.news0.title}
                size="lg"
                header="/images/home/update-news.jpg"
                content={langState.news0.content}
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
                title={langState.news1.title}
                header="/images/home/rating-news.jpg"
                content={langState.news1.content}
                link="/instructors"
                linked
              />
              <NewsCard
                title={langState.news2.title}
                header="/images/home/groups-news.jpg"
                content={langState.news2.content}
                link="/Groups"
                linked
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["small-news"], styles["columns"]]}
            >
              <NewsCard
                title={langState.news1.title}
                header="/images/home/rating-news.jpg"
                content={langState.news1.content}
                link="/instructors"
                linked
              />
            </Col>
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className={[styles["small-news"], styles["columns"]]}
            >
              <NewsCard
                title={langState.news2.title}
                header="/images/home/groups-news.jpg"
                content={langState.news2.content}
                link="/Groups"
                linked
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
            ></Col>
            <Col xl={12} lg={12} sm={12} xs={12}>
              <Row>
                <Col
                  style={langDirection(user.lang)}
                  xl={12}
                  xs={12}
                  className={styles["titles"]}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                >
                  {langState.servicesHeader}{" "}
                </Col>
                <Col xl={6} lg={12} md={12} xs={12}>
                  <ServiceCard
                    title={langState.service0}
                    header="/images/home/groups.png"
                    link="/Groups"
                  />
                </Col>
                <Col xl={6} lg={12} md={12} xs={12}>
                  <ServiceCard
                    title={langState.service1}
                    header="/images/home/rating.png"
                    link="/instructors"
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
