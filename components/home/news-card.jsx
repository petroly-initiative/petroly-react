import styles from "../../styles/home-page/news-card.module.scss";
import { Card } from "react-bootstrap";
import { useEffect } from "react";


export default function NewsCard(props){

  /**
   * TODO: Display Content upon Hovering
   */

    useEffect(() => {
      document.getElementById(props.title).setAttribute("tabindex", 0);

    }, []);

    return (
      <>
        <Card
        id = {props.title}
          className={[styles["lg-card"], "shadow", "border-0"]}
          style={{
            background: "#00b7ff44 " + props.header,
            backgroundSize: "100% 100%",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className={styles["card-title"]}>{props.title}</div>
          <div className={styles["card-content"]}>{props.content}</div>
        </Card>
      </>
    );
}