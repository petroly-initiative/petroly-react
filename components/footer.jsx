import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/utilities/footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { FaTwitter } from "react-icons/fa";
import translator from "../dictionary/components/footer-dict";
import { M, L } from "../constants";

export default function Footer(props){

    const {user} = useContext(UserContext);
    const [langState, setLang] = useState(() => translator(user.lang));

    useEffect(() => {
      setLang(() => translator(user.lang));
    }, [user.lang]);

    return (
      <>
        <div
          className={
            styles["footer-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Row className={styles["footer-arch"]}>
            <Col xs={12} sm={6} lg={6} className={styles["services-container"]}>
              <div className={styles["service-container"]}>
                <span className={styles["titles"]}>
                  {langState.serviceTitle}
                </span>
                <span className={styles["links"]}>
                  <Link href={"/Groups"}>{langState.groups}</Link>
                </span>
                <span className={styles["links"]}>
                  <Link href={"/instructors"}>{langState.evals}</Link>
                </span>
              </div>
            </Col>
            <Col xs={12} sm={6} lg={6} className={styles["logos-container"]}>
              <Image
                className={styles["header-big"]}
                alt="petroly text icon"
                src={"/header-plain.svg"}
                width={134}
                height={46}
              />
              <span>Petroly Intiative &copy; {new Date().getFullYear()}</span>
              <span className={styles["twitter-btn"]}>
                <a target={"_blank"} href="https://twitter.com/PetrolyInit">
                  <FaTwitter />
                </a>
              </span>
            </Col>
          </Row>
        </div>
      </>
    );
}