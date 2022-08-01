import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/home-page/home.module.scss";

import NewsCard from "../components/home/news-card";
import ServiceCard from "../components/home/service-card";
import Image from "next/image";
import Head from "next/head";
import ChatCard from "../components/home/Chat-card";
import { HiDesktopComputer } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa";
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
        <div className={styles["landing-header"]}>
          <Image
            alt="abstract landing page art"
            src="/images/home/title_header.svg"
            width={593}
            height={437}
          />
        </div>
        <section
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          style={langDirection(user.lang)}
          className={styles["sections"]}
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
              className={` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`}
            >
              خدمات رقمية
            </h1>
            <h1
              className={`{styles["header-second"]} ${
                user.theme === M.DARK ? styles["dark-txt"] : ""
              }`}
            >
              بترولية
              <span className={styles["header-highlight"]}>متميزة</span>
            </h1>
            {/* ! Translation needed */}
            <p
              className={
                styles["landing-text"] +
                ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
              }
            >
              {"خدمات إلكترونية عالية الجودة لزملائنا البتروليين!"}
            </p>
            <button className={styles["nav-buttons"]}>
              اكتشف خدماتنا
              <FaArrowDown className={styles["btn-icons"]} />
            </button>
          </div>
        </section>
        {/* 3 more sections for each image */}
        

        <Row
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          style={langDirection(user.lang)}
          className={styles["containers"]}
        ></Row>
      </Container>
    </>
  );
}
