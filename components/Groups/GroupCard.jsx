import styles from "../../styles/groups-page/group-card.module.scss";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Button, Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

/**
 * TODO:
 * * a report modal
 *
 */
function GroupCard(props) {
  const [showModal, setModal] = useState(false);
  const [likes, setLikes] = useState({
    number: props.likes,
    liked: false,
  });

  const platformColor = () => {
    switch (props.platform) {
      case "Telegram":
        return "#0088cc";
      case "Whatsapp":
        return "#25D366";
      case "Discord":
        return "#5865F2";
    }
  };

  const platformIcon = () => {
    switch (props.platform) {
      case "Telegram":
        return <FaTelegramPlane className={styles["tag-icon"]} />;
      case "Whatsapp":
        return <IoLogoWhatsapp className={styles["tag-icon"]} />;
      case "Discord":
        return <FaDiscord className={styles["tag-icon"]} />;
    }
  };

  const typeColor = () => {
    switch (props.type) {
      case "تعليمي":
        return "#FFB830";
      case "ترفيهي":
        return "#F037A5";
      case "شعبة":
        return "#622edb";
    }
  };

  const typeIcon = () => {
    switch (props.type) {
      case "تعليمي":
        return <FaGraduationCap className={styles["tag-icon"]} />;
      case "ترفيهي":
        return <MdGames className={styles["tag-icon"]} />;
      case "شعبة":
        return <RiBook2Fill className={styles["tag-icon"]} />;
    }
  };

  const addLike = () => {
    if (!likes.liked)
      setLikes((prev) => ({ liked: true, number: prev.number + 1 }));
    else setLikes((prev) => ({ liked: false, number: prev.number - 1 }));
  };

  const fireModal = () => {
    console.log("Modal launched!");
    setModal(true);
  };

  return (
    //   We will fire an onClick listener for modal instead of a new page link
    <Card
      style={{ borderRadius: 8 }}
      className={"shadow border-0 " + styles.Cardholder}
      onClick={fireModal}
    >
      <Card.Header className={styles.cardHeader}>
        <div className={styles["date-tag"]}>{props.date}</div>
        <div className={styles["btns-container"]}>
          <OverlayTrigger
            style={{ position: "absolute", right: 0 }}
            delay={{ show: 150, hide: 200 }}
            overlay={<Tooltip id="button-tooltip">إعجاب</Tooltip>}
          >
            <div
              style={{ color: likes.liked ? "#00ead3" : "" }}
              className={styles["likes-btn"]}
            >
              <Button
                style={{ color: likes.liked ? "#00ead3" : "" }}
                onClick={addLike}
                className={styles["btns"]}
              >
                {likes.liked ? (
                  <BsFillStarFill color={"#00ead3"} />
                ) : (
                  <BsStar />
                )}
              </Button>

              <span>{likes.number}</span>
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            style={{ position: "absolute", right: 0 }}
            delay={{ show: 150, hide: 200 }}
            overlay={<Tooltip id="button-tooltip">تقديم بلاغ</Tooltip>}
          >
            <a HREF="https://forms.gle/8JxD2g1RJzfE3FQ38" target="_blank">
              <Button className={styles["btns"] + " " + styles["report-btn"]}>
                <HiOutlineSpeakerphone />
              </Button>
            </a>
          </OverlayTrigger>
        </div>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <div className={styles["group-pic"] + " shadow"}>{props.image}</div>

        <div className={styles["group-name"]}>{props.name}</div>
        <div className={styles["group-info"]}>
          <div
            style={{ background: platformColor() }}
            className={
              styles["tags"] + " shadow-sm" + " " + styles["platform-tag"]
            }
          >
            {platformIcon()}
            <span className={styles["tag-text"]}>{props.platform}</span>
          </div>
          <div
            style={{
              background: typeColor(),
            }}
            className={styles["tags"] + " shadow-sm" + " " + styles["type-tag"]}
          >
            {typeIcon()}
            <span className={styles["tag-text"]}>{props.type}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default GroupCard;
