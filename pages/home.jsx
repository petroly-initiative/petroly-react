import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/home-page/home.module.scss";
import { motion } from "framer-motion";
import NewsCard from "../components/home/news-card";
import ServiceCard from "../components/home/service-card";
import Image from "next/image";
import Head from "next/head";
import ChatCard from "../components/home/Chat-card";
import { ImTarget } from "react-icons/im";
import {
  FaArrowDown,
  FaQuoteLeft,
  FaQuoteRight,
  FaPatreon,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import translator from "../dictionary/pages/home-dict";
import { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { T, L, langDirection, M } from "../constants";
import { NavContext } from "../state-management/navbar-state/NavbarContext";
import ScrollDrag from "../components/utilities/ScrollDrag";

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
        <meta
          property="og:image"
          content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
        />
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

        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
        />
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
        <section
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          className={styles["sections"] + " " + styles["home-section"]}
        >
          <div className={styles["header-title"]}>
            <div>
              <Image
                className={styles["header-big"]}
                alt="petroly text icon"
                src={"/header-plain.svg"}
                width={194}
                height={67}
              />
            </div>
            <h1
              className={` ${user.theme === M.DARK ? styles["dark-txt"] : ""} ${
                user.lang === L.EN_US ? styles["header-highlight"] : ""
              }`}
            >
              {langState.headerOne}
            </h1>
            <h1
              className={`{styles["header-second"]} ${
                user.theme === M.DARK ? styles["dark-txt"] : ""
              }`}
            >
              {langState.headerTwo}
              {user.lang === L.AR_SA && (
                <span
                  style={{
                    margin: "0px 8px",
                  }}
                  className={
                    user.lang === L.AR_SA ? styles["header-highlight"] : ""
                  }
                >
                  متميزة
                </span>
              )}
            </h1>
            {/* ! Translation needed */}
            <p
              className={
                styles["landing-text"] +
                ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
              }
            >
              {langState.landingText}
            </p>
            <div
              onClick={() => {
                window.location.href =
                  window.location.origin + "#services-section";
              }}
              className={styles["nav-buttons"]}
            >
              {langState.navBtnMain}
              <FaArrowDown className={styles["btn-icons"]} />
            </div>
            <a
              href="https://patreon.com/petroly_initiative"
              target={"_blank"}
              rel="noreferrer"
              className={
                styles["support-btn"] +
                ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
              }
            >
              <FaPatreon
                style={{ marginRight: 16 }}
                className={styles["btn-icons"]}
              />
              <span> {langState.supportBtn}</span>
            </a>
          </div>
          <div
            style={{
              left: user.lang === L.AR_SA ? -5 : "",
              right: user.lang === L.EN_US ? -5 : "",
              transform: `scaleX(${user.lang === L.AR_SA ? "1" : "-1"})`,
            }}
            className={styles["landing-header"]}
          >
            <Image
              alt="abstract landing page art"
              src="/images/home/title_header_v4.svg"
              width={695}
              height={759}
            />
          </div>
        </section>
        {/* 3 more sections for each image */}
        <section
          id="services-section"
          style={{
            paddingLeft: 0,
            height: "fit-content",
          }}
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          className={styles["sections"]}
        >
          <h1
            className={
              styles["section-header"] +
              ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
            }
          >
            <FiLayers className={styles["header-icons"]} />
            {langState.servicesHeader}
          </h1>

          <ScrollDrag dir="ltr" className={styles["cards-container"]}>
            <ServiceCard
              title={langState.service2}
              content={langState.service2Desc}
              imgInit={"/images/home/radar.svg"}
              link="/Notifier"
              imgVisible={"/images/home/radar-visible.svg"}
              btnText={langState.navBtnSecondary}
            />

            <ServiceCard
              title={langState.service1}
              content={langState.service1Desc}
              imgInit={"/images/home/rating-star.svg"}
              link="/instructors"
              imgVisible={"/images/home/rating-visible.svg"}
              btnText={langState.navBtnSecondary}
            />

            <ServiceCard
              title={langState.service0}
              content={langState.service0Desc}
              imgInit={"/images/home/groups.svg"}
              link="/Groups"
              imgVisible={"/images/home/groups-visible.svg"}
              btnText={langState.navBtnSecondary}
            />
          </ScrollDrag>
        </section>
        <section
          id="about-us-section"
          style={{
            paddingLeft: 0,
            height: "fit-content",
            marginBottom: 34,
          }}
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          className={styles["sections"]}
        >
          <h1
            className={
              styles["section-header"] +
              ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
            }
          >
            {" "}
            <ImTarget className={styles["header-icons"]} />
            {langState.quoteHeader}
          </h1>

          <div className={styles["about-us-container"]}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ type: "spring", delay: 0.8, duration: 3 }}
              className={
                user.lang === L.AR_SA
                  ? styles["aboutus-icons-holder-ar"]
                  : styles["aboutus-icons-holder-en"]
              }
              dir="ltr"
            >
              <FaQuoteLeft className={styles["aboutus-icon"]} />
              <FaQuoteRight className={styles["aboutus-icon"]} />
            </motion.div>
            <p
              className={
                styles["aboutus-text"] +
                ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
              }
            >
              {langState.quoteText}
            </p>
          </div>
          <span
            className={
              styles["aboutus-author"] +
              ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
            }
            style={{
              textAlign: user.lang === L.AR_SA ? "right" : "left",
            }}
          >
            {langState.quoteAuth}
          </span>
        </section>
      </Container>
    </>
  );
}
