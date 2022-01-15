import styles from "../../styles/home-page/service-card.module.scss";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { L, langDirection, M } from "../../constants";
import { useEffect, useState } from "react";

export default function ServiceCard(props){

  const {user} = useContext(UserContext);
  const [direction, setDirection] = useState(() => langDirection(user.lang));
    useEffect(() => {
      setDirection(() => langDirection(user.lang));
    }, [user.lang]);

  useEffect(() => {
    if(user.theme === M.DARK)
    console.log(styles["dark-mode"]);
  }, [user.theme])
    return (
      <>
        <Link href= {props.link}>
          <Card
            className={[
              styles["md-card"],
              "shadow",
              ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`,
            ]}
          >
            <div
            dir ={`${user.lang === L.AR_SA ? "rtl": "ltr"}`}
              style={direction}
              className={[
                styles["card-title"],
                `${user.theme === M.DARK ? styles["dark-mode"] : ""}`,
              ]}
            >
              {props.title}
            </div>
            <div className={styles["card-header"]}>
              <Image
                alt="service image"
                src={props.header}
                width={90}
                height={90}
              />
            </div>
          </Card>
        </Link>
      </>
    );
}