import Link from "next/link";
import Image from "next/image";
import styles from "../styles/error-pages/errors.module.scss";
import { Container } from "react-bootstrap";
import { DEF_THEME, DEF_LANG, L, M } from "../constants";

export default function Custom500() {
  const user = {
    theme: DEF_THEME,
    lang: DEF_LANG,
  };

  return (
    <Container className={styles["main-container"]}>
      <div className={styles["content-div"]}>
        <div className={styles["error-txt"]}>
          {user.lang === L.AR_SA
            ? " عذرا, هناك مشكلة في خادم الاتصال"
            : "Server Error"}
        </div>
        <Image
          className={styles["error-img"]}
          src={"/images/errors/500Epage.svg"}
          width={540}
          height={320}
        />
        <div className={styles["home-btn"] + " shadow"}>
          <Link href="/home">
            {user.lang === L.AR_SA ? "العودة إلى الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </Container>
  );
}
