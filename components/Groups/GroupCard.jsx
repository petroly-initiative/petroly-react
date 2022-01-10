import styles from "../../styles/groups-page/group-card.module.scss";

import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import GroupDisplay from "./GroupDisplay";
import { useMutation, useQuery } from "@apollo/client";
import GroupReport from "./GroupReport";
import { updateCommunityLikes } from "../../api/mutations";
import { userHasLiked } from "../../api/queries";
function GroupCard(props) {
  const [displayGroup, setDisplay] = useState(false);
  const [showReport, setReport] = useState(false);
  // const isLiked = () => {
  //   // TODO complete this function
  //   const { data, loading, error, refetch, networkStatus, variables } =
  //     useQuery(userHasLiked, { variables: { id: props.id } });
  //   // TODO handle both loading and error
  //   if (!loading && typeof data !== "undefined") {
  //     if (data.me.likedCommunities.count == 1) return true;
  //   }
  //   return false;
  // };
  const [likes, setLikes] = useState({
    number: props.likes.count,
    liked: false,
  });

  const ArLabels = (type) => {
    switch (type) {
      case "EDU":
        return "تعليمي";
      case "ENTERTAINING":
        return "ترفيهي";
      case "SECTION":
        return "شعبة";
    }
  };

  const platformColor = (platform) => {
    switch (platform) {
      case "TELEGRAM":
        return "#0088cc";
      case "WHATSAPP":
        return "#25D366";
      case "DISCORD":
        return "#5865F2";
    }
  };

  const platformIcon = (platform) => {
    switch (platform) {
      case "TELEGRAM":
        return <FaTelegramPlane className={styles["tag-icon"]} />;
      case "WHATSAPP":
        return <IoLogoWhatsapp className={styles["tag-icon"]} />;
      case "DISCORD":
        return <FaDiscord className={styles["tag-icon"]} />;
    }
  };

  const typeColor = (type) => {
    switch (type) {
      case "EDU":
        return "#FFB830";
      case "ENTERTAINING":
        return "#F037A5";
      case "SECTION":
        return "#622edb";
    }
  };

  const typeIcon = () => {
    switch (props.type) {
      case "EDU":
        return <FaGraduationCap className={styles["tag-icon"]} />;
      case "ENTERTAINING":
        return <MdGames className={styles["tag-icon"]} />;
      case "SECTION":
        return <RiBook2Fill className={styles["tag-icon"]} />;
    }
  };
  // const [updateLikes, { data, loading, error }] = // TODO update this mutation
  // useMutation(updateCommunityLikes);
  // TODO Handle loading and error properly
  // if (loading) {
  //   return (
  //     <Spinner
  //       className={styles["loading-spinner"]}
  //       as="div"
  //       animation="grow"
  //       size="xl"
  //       role="status"
  //       aria-hidden="true"
  //     />
  //   );
  // }
  // if (error) return `Submission error! ${error.message}`;
  const addLike = () => {
    if (!likes.liked) {
      // updateLikes({ variables: { id: props.id, likes: props.likes + 1 } });
      setLikes((prev) => ({ liked: true, number: prev.number + 1 }));
    } else {
      // updateLikes({ variables: { id: props.id, likes: props.likes - 1 } });
      setLikes((prev) => ({ liked: false, number: prev.number - 1 }));
    }
  };

  const fireDisplay = (e) => {
    console.log("Modal launched!");
    setDisplay(true);
    e.stopPropagation();
  };
  const closeDisplay = () => {
    setDisplay(false);
  };
  const fireReport = () => {
    // console.log("Modal launched!");
    // TODO - mutations for report
    setReport(true);
  };
  const closeReport = () => {
    setReport(false);
  };

  return (
    <>
      <GroupReport showModal={showReport} handleClose={closeReport} />
      <GroupDisplay
        {...props}
        arLabels={ArLabels}
        liked={likes.liked}
        likeNum={likes.number}
        addLike={addLike}
        // group={props.group}
        link={props.link}
        showModal={displayGroup}
        handleClose={closeDisplay}
        platformColor={platformColor}
        typeColor={typeColor}
        typeIcon={typeIcon}
        platformIcon={platformIcon}
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
              <Button
                onClick={fireReport}
                className={styles["btns"] + " " + styles["report-btn"]}
              >
                <HiOutlineSpeakerphone />
              </Button>
            </OverlayTrigger>
          </div>
        </Card.Header>
        <Card.Body onClick={fireDisplay} className={styles.cardBody}>
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
