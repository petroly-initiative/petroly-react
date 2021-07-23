import { Card, Button } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import styles from "../../styles/home-page/discussion-card.module.scss";
import { useEffect, useState } from "react";

export default function ChatCard(props) {
  const [vote, setVote] = useState(["none", 76]);

  const upvote = () => {
    if (vote[0] === "none") setVote((prev) => ["upvote", prev[1] + 1]);
    else if (vote[0] === "downvote") setVote((prev) => ["upvote", prev[1] + 2]);
    else setVote((prev) => ["none", prev[1] - 1]);
  };
  const downvote = () => {
    if (vote[0] === "none") setVote((prev) => ["downvote", prev[1] - 1]);
    else if (vote[0] === "upvote") setVote((prev) => ["downvote", prev[1] - 2]);
    else setVote((prev) => ["none", prev[1] + 1]);
  };

  const tagDivs = props.tags.map((tag) => (
    <span style={{ background: tag["color"] }} className={styles["tags"]}>
      <span className={styles["tag-icon"]}>{tag["icon"]}</span>
      {tag["name"]}
    </span>
  ));

  {
    /**
    TODO: Create a Dicitonary to mimic the color of each tag in the service
    
 */
  }

  return (
    <>
      <Card className={[styles["main-container"], "shadow"]}>
        <Card.Body>
          <div className={styles["Header"]}>
            <div className={styles["user-info"]}>{props.profile}</div>
            <div className={styles["post-info"]}>
              <div className={styles["title"]}>{props.Title}</div>
              <div className={styles["date"]}>{props.date}</div>
              <div className={styles["tags-container"]}>{tagDivs}</div>
            </div>
            <div className={styles["vote-layout"]}>
              <Button onClick={upvote} className={styles["voting"]}>
                <GoArrowUp
                  color={vote[0] === "upvote" ? "#00ead3" : ""}
                  size="1.6rem"
                />
              </Button>
              <div className={styles["vote-count"]}>{vote[1]}</div>
              <Button onClick={downvote} className={styles["voting"]}>
                <GoArrowDown
                  color={vote[0] === "downvote" ? "#00ead3" : ""}
                  size="1.6rem"
                />
              </Button>
            </div>
          </div>
          <div className={styles["card-content"]}>{props.content}</div>
          <div className={styles["btn-layout"]}></div>
        </Card.Body>
      </Card>
    </>
  );
}
