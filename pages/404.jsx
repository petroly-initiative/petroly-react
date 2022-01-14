import Link from "next/link";
import Image from "next/image";
import styles from "../styles/error-pages/errors.module.scss";
import { Container } from "react-bootstrap";
import { UserContext } from "../state-management/user-state/UserContext";
import { useContext } from "react";
import { L, M } from "../constants";

export default function FourOhFour() {

  const {user} = useContext(UserContext);
  return (
    <>
      <Container className={styles["main-container"]}>
        <div className={styles["content-div"]}>
          <div
            className={
              styles["error-txt"] +
              ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
            }
          >{user.lang === L.AR_SA ?
           " عذرا, الصفحة المطلوبة غير متاحة حاليا": "Page not Found"}</div>

          <Image
            className={styles["error-img"]}
            src={"/images/errors/404Epage.svg"}
            width={540}
            height={320}
          />
          <div className={styles["home-btn"] + " shadow"}>
            <Link href="/home">{user.lang === L.AR_SA ? "العودة إلى الرئيسية" : "Back to Home"}</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
