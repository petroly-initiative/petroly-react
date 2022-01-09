import styles from "../../styles/home-page/news-card.module.scss";
import { Card } from "react-bootstrap";
import { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { UserContext } from "../../state-management/user-state/UserContext";

export default function NewsCard(props){

  
  const {user} = useContext(UserContext);

    useEffect(() => {
      document.getElementById(props.title).setAttribute("tabindex", 0);

    }, []);

    return (
      <>
        <Card
          id={props.title}
          className={
            styles["card"] +
            " shadow border-0 " +
            ` ${props.size == "lg" ? styles["large-card"] : ""}`
          }
          style={{
            background: "#00b7ff44 " + props.header,
            backgroundSize: "100% 100%",
            backgroundBlendMode: "multiply",
          }}
        >
          <Image alt="news card" src={props.header} layout="fill" />
          <div
            style={{ position: "relative", zIndex: 3 }}
            className={styles["card-title"]}
          >
            {props.title}
          </div>
          <div className={styles["card-content"]}>
            <div style={{ height: "70%" }}>{props.content} </div>
          </div>
          {props.linked && (
            <Link className="mt-2" href={props.link}>
              <span className={styles["card-link"]}>
                <FaArrowAltCircleRight />
                <span style={{margin: 8}}>
                  {`${user.lang === "ar" ? "زيارة الخدمة" : "Visit Service"}`}{" "}
                </span>
              </span>
            </Link>
          )}
        </Card>
      </>
    );
}