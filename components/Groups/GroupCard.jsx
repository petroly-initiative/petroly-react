import styles from "../../styles/groups-page/group-card.module.scss";

import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState, useContext } from "react";
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
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "@apollo/client";
import { toggleLikeCommunityMutation } from "../../api/mutations";
import { communityInteractionsQuery } from "../../api/queries";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-card-dict";
import { M, USER } from "../../constants";

// dynamic imports for report and display modals to reduce the base module size
const GroupDisplay = dynamic(() => import("./GroupDisplay"));
const GroupReport = dynamic(() => import("./GroupReport"));

function GroupCard(props) {
  const { user } = useContext(UserContext);
  const [displayGroup, setDisplay] = useState(false);
  const [showReport, setReport] = useState(false);
  const [iactions, setIactions] = useState({
    number: props.likesCount,
    liked: false,
    reported: false,
  });

  /* managing a community interactions: like and report */
  const [toggleLikeCommunity, { data, loading, error }] = useMutation(
    toggleLikeCommunityMutation
  );

  const { data: interactions, refetch: refetchIactions } = useQuery(
    communityInteractionsQuery,
    {
      variables: { id: props.id },
      skip: user.status !== USER.LOGGED_IN,
    }
  );

  useEffect(() => {
    if (interactions) {
      setIactions((prev) => ({
        liked: interactions.communityInteractions.liked,
        number: prev.number,
        reported: interactions.communityInteractions.reported,
      }));
    }
  }, [interactions]);
  //  -----------------------------------------------------------------------------

  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const labels = (type) => {
    switch (type) {
      case "EDU":
        return `${langState.edu}`;
      case "ENTERTAINING":
        return `${langState.fun}`;
      case "SECTION":
        return `${langState.section}`;
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

  const addLike = () => {
    if (iactions.liked) {
      toggleLikeCommunity({ variables: { id: props.id } });
      setIactions((prev) => ({ liked: false, number: prev.number - 1 }));
    } else {
      toggleLikeCommunity({ variables: { id: props.id } });
      setIactions((prev) => ({ liked: true, number: prev.number + 1 }));
    }
  };

  const fireDisplay = (e) => {
    setDisplay(true);
    e.stopPropagation();
  };
  const closeDisplay = () => {
    setDisplay(false);
  };
  const fireReport = () => {
   
    setReport(true);
  };
  const closeReport = () => {
    setReport(false);
  };

  if (error) {
    console.error("we could not save your like or check it");
  }

  return (
    <>
      <GroupReport
        id={props.id}
        showModal={showReport}
        handleClose={closeReport}
        refetchIactions={refetchIactions}
      />
      <GroupDisplay
        {...props}
        labels={labels}
        liked={iactions.liked}
        likeNum={iactions.number}
        addLike={addLike}
        section={props.section}
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
        className={
          "shadow border-0 " +
          styles.Cardholder +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles.cardHeader +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <div className={styles["date-tag"]}>{props.date}</div>
          <div className={styles["btns-container"]}>
            <OverlayTrigger
              style={{ position: "absolute", right: 0 }}
              delay={{ show: 150, hide: 200 }}
              overlay={<Tooltip id="button-tooltip">{langState.like}</Tooltip>}
              trigger="hover"
            >
              {loading ? (
                <Spinner
                  className={styles["loading-spinner"]}
                  as="div"
                  animation="grow"
                  size="xl"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <div
                  style={{ color: iactions.liked ? "#00ead3" : "" }}
                  className={styles["likes-btn"]}
                >
                  <Button
                    style={{ color: iactions.liked ? "#00ead3" : "" }}
                    onClick={addLike}
                    className={styles["btns"]}
                  >
                    {iactions.liked ? (
                      <BsFillStarFill color={"#00ead3"} />
                    ) : (
                      <BsStar />
                    )}
                  </Button>

                  <span>{iactions.number}</span>
                </div>
              )}
            </OverlayTrigger>
            <OverlayTrigger
              style={{ position: "absolute", right: 0 }}
              delay={{ show: 150, hide: 200 }}
              overlay={
                <Tooltip id="button-tooltip">{langState.report}</Tooltip>
              }
              trigger="hover"
            >
              <Button
                disabled={iactions.reported}
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

          <div
            className={
              styles["group-name"] +
              ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
            }
          >
            {props.name}
          </div>
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
              <span className={styles["tag-text"]}>{labels(props.type)}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default GroupCard;
