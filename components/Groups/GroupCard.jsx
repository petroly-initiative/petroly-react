import styles from "../../styles/groups-page/group-card.module.scss";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState, useContext } from "react";
import { Button, Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import GroupDisplay from "./GroupDisplay";
import GroupReport from "./GroupReport";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-card-dict";

function GroupCard(props) {
  const [displayGroup, setDisplay] = useState(false);
  const [showReport, setReport] = useState(false);

  const [likes, setLikes] = useState({
    number: props.likes,
    liked: false,
  });
  const group = {
    name: "CS Nerds",
    platform: "discord",
    type: "educational",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita laborum ipsa est at cupiditate ut consectetur corporis, harum in voluptatum, ab exercitationem aliquid perferendis odio. Odio, voluptas. Molestias, sint nostrum.",
  };

    const { user, userDispatch } = useContext(UserContext);
    const [langState, setLang] = useState(() => translator(user.lang));

    useEffect(() => {
      // console.log(userContext.user.lang);
      setLang(() => translator(user.lang));
      console.log("changed language!");
    }, [user.lang]);

  const ArLabels = (type) => {
    switch (type) {
      case "Educational":
        return `${langState.edu}`;
      case "Entertainment":
        return `${langState.fun}`;
      case "Sections":
        return `${langState.section}`;
    }
  }

  const platformColor = (platform) => {
    switch (platform) {
      case "Telegram":
        return "#0088cc";
      case "Whatsapp":
        return "#25D366";
      case "Discord":
        return "#5865F2";
    }
  };

  const platformIcon = (platform) => {
    switch (platform) {
      case "Telegram":
        return <FaTelegramPlane className={styles["tag-icon"]} />;
      case "Whatsapp":
        return <IoLogoWhatsapp className={styles["tag-icon"]} />;
      case "Discord":
        return <FaDiscord className={styles["tag-icon"]} />;
    }
  };

  const typeColor = (type) => {
    switch (type) {
      case "Educational":
        return "#FFB830";
      case "Entertainment":
        return "#F037A5";
      case "Sections":
        return "#622edb";
    }
  };

  const typeIcon = () => {
    switch (props.type) {
      case "Educational":
        return <FaGraduationCap className={styles["tag-icon"]} />;
      case "Entertainment":
        return <MdGames className={styles["tag-icon"]} />;
      case "Sections":
        return <RiBook2Fill className={styles["tag-icon"]} />;
    }
  };

  const addLike = () => {
    if (!likes.liked)
      setLikes((prev) => ({ liked: true, number: prev.number + 1 }));
    else setLikes((prev) => ({ liked: false, number: prev.number - 1 }));
  };

  const fireDisplay = (e) => {
    console.log("Modal launched!");
    setDisplay(true);
    e.stopPropagation()

  };
  const closeDisplay = () => {
    setDisplay(false);
  };
  const fireReport = () => {
    // console.log("Modal launched!");
    setReport(true);
  };
const closeReport = () => {
  setReport(false);
};

  return (
    <>
    <GroupReport
    showModal={showReport}
    handleClose = {closeReport} 
    />
      <GroupDisplay
        {...props}
        arLabels = {ArLabels}
        liked = {likes.liked}
        likeNum = {likes.number}
        addLike = {addLike}
        group={group}
        showModal={displayGroup}
        handleClose={closeDisplay}
        platformColor={platformColor}
        typeColor={typeColor}
        typeIcon = {typeIcon}
        platformIcon = {platformIcon}
      />
      {/* // We will fire an onClick listener for modal instead of a new page link */}
      <Card
        style={{ borderRadius: 8 }}
        className={"shadow border-0 " + styles.Cardholder}
      >
        <Card.Header className={styles.cardHeader}>
          <div className={styles["date-tag"]}>{props.date}</div>
          <div className={styles["btns-container"]}>
            <OverlayTrigger
              style={{ position: "absolute", right: 0 }}
              delay={{ show: 150, hide: 200 }}
              overlay={<Tooltip id="button-tooltip">{langState.like}</Tooltip>}
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
              overlay={<Tooltip id="button-tooltip">{langState.report}</Tooltip>}
            >
                <Button onClick  ={fireReport} className={styles["btns"] + " " + styles["report-btn"]}>
                  <HiOutlineSpeakerphone />
                </Button>
            </OverlayTrigger>
          </div>
        </Card.Header>
        <Card.Body  onClick={fireDisplay} className={styles.cardBody}>
          <div className={styles["group-pic"] + " shadow"}>{props.image}</div>

          <div className={styles["group-name"]}>{props.name}</div>
          <div className={styles["group-info"]}>
            <div
              style={{ background: platformColor(props.platform) }}
              className={
                styles["tags"] + " shadow-sm" + " " + styles["platform-tag"]
              }
            >
              {platformIcon(props.platform)}
              <span className={styles["tag-text"]}>{props.platform}</span>
            </div>
            <div
              style={{
                background: typeColor(props.type),
              }}
              className={
                styles["tags"] + " shadow-sm" + " " + styles["type-tag"]
              }
            >
              {typeIcon()}
              <span className={styles["tag-text"]}>{ArLabels(props.type)}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default GroupCard;
