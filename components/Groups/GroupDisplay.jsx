import { useEffect, useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { HiOutlineUserAdd } from "react-icons/hi";
import { BiShareAlt } from "react-icons/bi";
import { BsStarFill, BsStar } from "react-icons/bs";
import styles from "../../styles/groups-page/groups-display.module.scss";
import classNames from "classnames";
import Image from "next/image";
import PopMsg from "../PopMsg";
/**
 *
 * @param {*} props
 * @returns A modal to preview the group to enter it
 *
 */

export default function GroupDisplay(props) {
  const arTitles = {
    platform: "المنصة",
    type: "تصنيف المجتمع",
    description: "الوصف",
    joinCommunity: "انضم للمجموعة",
  };
  const [ShowShared, setShowShared] = useState({
    shareMsg: "",
  });
  const share = () => {
    navigator.clipboard.writeText(props.link);
    setShowShared({
      shareMsg: (
        <PopMsg
          success={true}
          successMsg={"تم نسخ رابط القروب بنجاح."}
          msgBody={props.link}
        />
      ),
    });
  };

  return (
    <>
      <Modal
        centered
        style={{ direction: "rtl", overflow: "hidden" }}
        show={props.showModal}
        onHide={props.handleClose}
      >
        <Modal.Body className={"text-right " + styles["card-body"]}>
          {/* platform */}
          <Row className="align-items-center justify-content-between">
            <Col
              xs={12}
              className={
                "justify-content-center text-center " + styles["header"]
              }
            >
              {/* group image */}

              <div className={styles["group-pic"] + " shadow"}>
                {props.image}
              </div>

              {/* group name */}
              <div className={styles["group-name"]}>{props.name}</div>
              <div
                className={
                  "d-flex justify-content-center " + styles["btns-container"]
                }
              >
                <Button
                  style={{ color: props.liked ? "rgb(255, 174, 0)" : "" }}
                  onClick={props.addLike}
                  className={
                    styles["like-btn"] +
                    " " +
                    (props.liked ? styles["active-btn"] : "")
                  }
                >
                  <span>{props.likeNum}</span>
                  {props.liked ? (
                    <BsStarFill size={"18px"} color={"rgb(255, 174, 0)"} />
                  ) : (
                    <BsStarFill size={"18px"} />
                  )}
                </Button>
                <Button onClick={share} className={styles["share-btn"]}>
                  {<BiShareAlt size={"1.3rem"} />}
                </Button>
                {ShowShared.shareMsg}
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <h2 className={styles.title + " w-100 text-center"}>
                {arTitles.platform}
              </h2>
              <div
                className={styles.highlightText + " shadow"}
                style={{ background: props.platformColor(props.platform) }}
              >
                <span style={{ marginLeft: 8 }}>{props.platform}</span>
                {props.platformIcon(props.platform)}
              </div>
            </Col>

            <Col xs={12} sm={6}>
              <h2 className={styles.title + " w-100 text-center"}>
                {arTitles.type}
              </h2>
              <div
                className={
                  styles.highlightText +
                  ` shadow text-${
                    props.type === "Sections" ? "right pr-4" : "center"
                  } `
                }
                style={{
                  background: props.typeColor(props.type),
                  position: "relative",
                }}
              >
                {props.typeIcon(props.type)}
                <span style={{ marginRight: 8 }}>
                  {props.arLabels(props.type)}
                </span>

                {props.type === "SECTION" && (
                  <span
                    style={{
                      fontSize: 14,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      padding: "3px 6px",
                      top: 0,
                      left: 0,
                      fontWeight: "600",
                      paddingRight: 15,
                      paddingLeft: 15,
                      height: "100%",
                      borderRadius: "3px",
                      backgroundColor: "#4a1eaf",
                    }}
                  >
                    {props.section}
                  </span>
                )}
              </div>
            </Col>
          </Row>

          {/* description */}
          <Row>
            <Col className={styles["desc-container"]} xs={12}>
              <h2 className={styles.title + " w-100 text-center"}>
                {arTitles.description}
              </h2>
              <p>{props.description}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {/* join button */}
          <a
            href={props.link}
            className={styles["join-link"]}
            variant="primary"
          >
            <span className={styles["join-txt"]}>{arTitles.joinCommunity}</span>
            <HiOutlineUserAdd className={styles["join-icon"]} size="1.4rem" />
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}
