import { useEffect, useState, useContext } from "react";
import { Modal, Button, Col, Row, CloseButton } from "react-bootstrap";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FiCopy } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import styles from "../../styles/groups-page/groups-display.module.scss";
import { UserContext } from "../../state-management/user-state/UserContext";
import Image from "next/image";
import PopMsg from "../utilities/PopMsg";
import translator from "../../dictionary/components/groups-modal-dict";
import { L, M } from "../../constants";
/**
 *
 * @param {*} props
 * @returns A modal to preview the group to enter it
 *
 */

export default function GroupDisplay(props) {
  const [msgVisible, setMessage] = useState(false);

  const share = () => {
    navigator.clipboard.writeText(props.link);
    // self closing  mechanism
    setMessage(true);
  };

  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  return (
    <>
      <Modal
        centered
        style={{ direction: "rtl", overflow: "hidden", borderRadius: "3px" }}
        show={props.showModal}
        onHide={() => {
          props.handleClose();
        }}
        className={styles["modal-container"]}
        scrollable
      >
        <Modal.Header
          className={` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`}
        >
          <CloseButton
            onClick={() => {
              props.handleClose();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Modal.Header>
        <Modal.Body
          className={
            "text-right " +
            styles["card-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
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
                  {<FiCopy size={"1.3rem"} />}
                </Button>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <h2 className={styles.title + " w-100 text-center"}>
                {langState.platform}
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
                {langState.type}
              </h2>
              <div
                className={
                  styles.highlightText +
                  ` shadow
                  `
                }
                style={{
                  background: props.typeColor(props.type),
                  position: "relative",
                }}
              >
                {props.typeIcon(props.type)}
                <span style={{ marginRight: 8 }}>
                  {props.labels(props.type)}
                </span>

                {props.type === "SECTION" && (
                  <span
                    style={{
                      fontSize: 14,
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      padding: "3px 6px",
                      top: 0,
                      left: 0,
                      fontWeight: "600",
                      paddingRight: 15,
                      paddingLeft: 15,
                      height: "28px",
                      borderRadius: "3px",
                      backgroundColor: "#4a1eaf",
                      marginRight: 16,
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
                {langState.desc}
              </h2>
              <p
                className={` ${
                  user.theme === M.DARK ? styles["dark-extra"] : ""
                }`}
              >
                {props.description}
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          className={
            "justify-content-center" +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {/* join button */}
          <a
            target={"_blank"}
            href={props.link}
            className={styles["join-link"]}
            variant="primary"
          >
            <span className={styles["join-txt"]}>{langState.submit}</span>
            <HiOutlineUserAdd className={styles["join-icon"]} size="1.4rem" />
          </a>
        </Modal.Footer>
      </Modal>
      {/* popup message modal */}
      <PopMsg
        visible={msgVisible}
        msg={
          user.lang === L.AR_SA
            ? "تم نسخ رابط القروب بنجاح"
            : "Group Link Copied successfully"
        }
        handleClose={setMessage}
        success
        // you can use failure or none for different message types
      />
    </>
  );
}
