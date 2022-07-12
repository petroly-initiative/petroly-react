import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import styles from "../../styles/dashboard-page/dashboard-tabs.module.scss";
import { FaSave } from "react-icons/fa";
import { MdCancel, MdModeEdit } from "react-icons/md";
import { RiMailStarFill, RiMedalFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { IoMdChatbubbles } from "react-icons/io";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { profilePicUpdateMutation } from "../../api/mutations";
import { USER } from "../../constants";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/profile-tab-dict";
import { M } from "../../constants";

/**
 *
 * ? State management:
 * This component will have 2 state only
 *
 * *view mode: the stats and profile piv and name are showing
 * *edit mode: the user can change name, profile pic and email, but not the password
 * TODO: Create a modal to recieve the image file
 */

/**
 *
 * @param {*} props {
 * username,
 * email.
 * profile pic,
 * evalNum,
 * groupNum,
 * chatNum,
 * medalNum}
 * @returns The profile tab
 */

export default function ProfileTab({ dataMe, errorMe, refetchMe, loadingMe }) {
  const [mode, setMode] = useState("view");
  const [WaitingPic, setWaitingPic] = useState(false);
  const { user, userDispatch } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  const [
    profilePicUpdate,
    {
      data: dataProfilePicUpdate,
      loading: loadingProfilePicUpdate,
      error: errorProfilePicUpdate,
    },
  ] = useMutation(profilePicUpdateMutation);

  const switchMode = () => {
    setMode(mode === "view" ? "edit" : "view");
  };

  function handleImage({
    target: {
      validity,
      files: [file],
    },
  }) {
    if (validity.valid) {
      profilePicUpdate({ variables: { file } });
    }
  }

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  useEffect(() => {
    if (loadingProfilePicUpdate) setWaitingPic(true);
    else if (dataProfilePicUpdate) {
      setWaitingPic(false);
      if (dataProfilePicUpdate.profilePicUpdate.success) {
        refetchMe();
      } else {
        // popup an error msg
      }
    }
  }, [dataProfilePicUpdate, loadingProfilePicUpdate]);

  if (loadingMe) {
    return (
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <div
            className={
              styles["card-headers"] +
              ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
            }
          >
            <span className={styles["card-title"]}>{langState.header}</span>
            {/* Edit btn / cancel editing button / Saving button */}
            {mode === "view" && (
              <Fade duration="1200">
                <Button onClick={switchMode} className={styles["btns"]}>
                  <MdModeEdit size="1.6rem" />
                </Button>
              </Fade>
            )}
            {mode === "edit" && (
              <Fade duration="1200">
                <div>
                  <Button
                    onClick={switchMode}
                    className={[styles["btns"], styles["cancel-btns"]]}
                  >
                    <MdCancel size="1.6rem" />
                  </Button>
                  <Button onClick={switchMode} className={styles["btns"]}>
                    {" "}
                    <FaSave size="1.6rem" />
                  </Button>
                </div>
              </Fade>
            )}
          </div>
        </Card.Header>
        {/* The content of the body will be a subject to local state management */}
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={
            styles["card-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {/* Container for stat attributes and profile info */}

          <Spinner
            className={
              styles["loading-spinner"] +
              " shadow" +
              ` ${user.theme === M.DARK ? styles["dark-spinner"] : ""}`
            }
            animation="border"
            role="status"
          />
        </Card.Body>
      </Card>
    );
  }
  if (!dataMe) {
    return null;
  }
  if (errorMe) {
    return <p>Error loading your profile info</p>;
  }

  return (
    <>
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <div
            className={
              styles["card-headers"] +
              ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
            }
          >
            <span className={styles["card-title"]}>{langState.header}</span>
            {/* Edit btn / cancel editing button / Saving button */}
            {mode === "view" && (
              <Fade duration="1200">
                <Button
                  onClick={switchMode}
                  className={
                    styles["btns"] +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  <MdModeEdit size="1.6rem" />
                </Button>
              </Fade>
            )}
            {mode === "edit" && (
              <Fade duration="1200">
                <div>
                  <Button
                    onClick={switchMode}
                    className={[styles["btns"], styles["cancel-btns"]]}
                  >
                    <MdCancel size="1.6rem" />
                  </Button>
                  <Button onClick={switchMode} className={styles["btns"]}>
                    {" "}
                    <FaSave size="1.6rem" />
                  </Button>
                </div>
              </Fade>
            )}
          </div>
        </Card.Header>
        {/* The content of the body will be a subject to local state management */}
        <Card.Body className={styles["card-body"]}>
          {/* Container for stat attributes and profile info */}

          {mode === "view" && (
            <div className={styles["body-structure"]}>
              <div className={styles["pic-border"] + " shadow"}>
                <Image
                  width="140"
                  height="140"
                  className={styles["profile-pic"]}
                  src={dataMe.me.profile.profilePic}
                />
              </div>
              <div className={styles["user-name"]}>{dataMe.me.username}</div>
              <div
                className={
                  styles["user-email"] +
                  ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                }
              >
                {dataMe.me.email}
              </div>
              <Fade className={styles["fader"]}>
                <Row className={styles["stats-container"]}>
                  <Col
                    xs={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xl={6}
                    className={styles["stat-col"]}
                  >
                    <div
                      className={
                        styles["stat-title"] +
                        ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                      }
                    >
                      {langState.evals}
                    </div>
                    <Card
                      className={
                        styles["stat-cards"] +
                        ` ${user.theme === M.DARK ? styles["dark-card"] : ""}`
                      }
                    >
                      <RiMailStarFill
                        className={styles["rate-icon"]}
                        size="2.5rem"
                      />
                      <div
                        className={
                          styles["stat-num"] +
                          ` ${
                            user.theme === M.DARK ? styles["dark-header"] : ""
                          }`
                        }
                      >
                        {dataMe.me.evaluationSetCount}
                      </div>
                    </Card>
                  </Col>
                  <Col
                    xs={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xl={6}
                    className={styles["stat-col"]}
                  >
                    <div
                      className={
                        styles["stat-title"] +
                        ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                      }
                    >
                      {langState.groups}
                    </div>
                    <Card
                      className={
                        styles["stat-cards"] +
                        ` ${user.theme === M.DARK ? styles["dark-card"] : ""}`
                      }
                    >
                      <HiUserGroup
                        className={styles["comms-icon"]}
                        size="2.5rem"
                      />
                      <div
                        className={
                          styles["stat-num"] +
                          ` ${
                            user.theme === M.DARK ? styles["dark-header"] : ""
                          }`
                        }
                      >
                        {dataMe.me.ownedCommunitiesCount}
                      </div>
                    </Card>
                  </Col>
                  {/* <Col
                    xs={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xl={3}
                    className={styles["stat-col"]}
                  >
                    <div className={styles["stat-title"]}>المحادثات</div>
                    <Card className={styles["stat-cards"]}>
                      <IoMdChatbubbles
                        className={styles["chat-icon"]}
                        size="2.5rem"
                      />
                      <div className={styles["stat-num"]}>#</div>
                    </Card>
                  </Col> */}
                  {/* <Col
                    xs={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xl={3}
                    className={styles["stat-col"]}
                  >
                    <div className={styles["stat-title"]}>الميداليات</div>
                    <Card className={styles["stat-cards"]}>
                      <RiMedalFill
                        className={styles["medal-icon"]}
                        size="2.5rem"
                      />
                      <div className={styles["stat-num"]}>#</div>
                    </Card>
                  </Col> */}
                </Row>
              </Fade>
            </div>
          )}

          {mode === "edit" && (
            <div className={styles["body-structure"]}>
              {/* profile pic editing */}

              <div className={styles["pic-border"] + " shadow"}>
                {WaitingPic ? (
                  <Spinner
                    className={
                      styles["loading-spinner"] +
                      " shadow" +
                      ` ${user.theme === M.DARK ? styles["dark-spinner"] : ""}`
                    }
                    animation="border"
                    role="status"
                  />
                ) : (
                  <Fade style={{ width: "100%", height: "100%" }}>
                    <Image
                      width="140"
                      height="140"
                      className={styles["profile-pic"]}
                      src={dataMe.me.profile.profilePic}
                    ></Image>
                  </Fade>
                )}
              </div>
              <Fade className={styles["fader"]}>
                <Form>
                  {/* <Form.Group>
                    <Form.Label>اسم المستخدم</Form.Label>
                    <InputGroup>
                      <FormControl type="text" value={dataMe.me.username} />
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group controlId="formFile">
                    <InputGroup as="div" bsPrefix={styles["edit-form"]}>
                      <Form.Label> {langState.pic}</Form.Label>
                      <Form.Control
                        type="file"
                        className={` ${
                          user.theme === M.DARK
                            ? styles["dark-img-input"]
                            : styles["img-input"]
                        }`}
                        name="file"
                        onChange={handleImage}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Fade>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
