import Link from "next/link";
import Image from "next/image";
import styles from "../styles/error-pages/errors.module.scss";
import { Container } from "react-bootstrap";

export default function Custom500() {
  return (
    <Container className={styles["main-container"]}>
      <div className={styles["content-div"]}>
        <div className={styles["error-txt"]}>عذرا, هنالك مشكلة في خادم الاتصال</div>
        <Image
          className={styles["error-img"]}
          src={"/images/errors/500Epage.svg"}
          width={540}
          height={320}
        />
        <div className={styles["home-btn"] + " shadow"}>
          <Link href="/home">العودة إلى الرئيسية</Link>
        </div>
      </div>
    </Container>
  );
}
