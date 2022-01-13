import styles from "../../styles/home-page/news-card.module.scss";
import { Card } from "react-bootstrap";
import { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { UserContext } from "../../state-management/user-state/UserContext";
import { langDirection, L } from "../../constants";
import { useState } from "react";


export default function NewsCard(props) {

  const { user } = useContext(UserContext);
  const [direction, setDirection] = useState(() => langDirection(user.lang))

  useEffect(() => {
    document.getElementById(props.title).setAttribute("tabindex", 0);
  }, []);

  useEffect(() => {
    setDirection(() => langDirection(user.lang))
  }, [user.lang])

  return (
    <>
      <style jsx>
        {`
          .card-content {
            text-align: ${user.lang === L.AR_SA ? "right" : "left"} !important;
            direction: unset !important
          }
        `}
      </style>
      <Card
        dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
        id={props.title}
        className={
          styles["card"] +
          " shadow border-0 " +
          ` ${props.size == "lg" ? styles["large-card"] : ""}`
        }
        style={Object.assign(
          {
            background: "#00b7ff44 " + props.header,
            backgroundSize: "100% 100%",
            backgroundBlendMode: "multiply",
          },
          direction
        )}
      >
        <Image alt="news card" src={props.header} layout="fill" />
        <div
          style={Object.assign({ position: "relative", zIndex: 3 }, direction)}
          className={styles["card-title"]}
        >
          {props.title}
        </div>
        <div  className={styles["card-content"] + " card-content"}>
          <div style={Object.assign({ height: "70%" })}>{props.content} </div>
        </div>
        {props.linked && (
          <Link className="mt-2" href={props.link}>
            <span className={styles["card-link"]}>
              <FaArrowAltCircleRight className="m-1" />
              {`${
                user.lang === L.AR_SA ? "زيارة الخدمة" : "Visit Service"
              }`}{" "}
            </span>
          </Link>
        )}
      </Card>
    </>
  );
}
