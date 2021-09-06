import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
  FormControl,
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
/**
 *
 * ? State management:
 * This component will have 2 state only
 *
 * *view mode: the stats and profile piv and name are showing
 * *edit mode: the user can change name, profile pic and email, but not the password
 * TODO: Create a modal to recieve the image file
 */

export default function ProfileTab(props) {
  const [mode, setMode] = useState("view");

  const switchMode = () => {
    setMode(mode === "view" ? "edit" : "view");
  };

  return (
    <>
      <Card className={styles["card-containers"] + " shadow"}>
        <Card.Header className={styles["header-containers"]}>
          <div className={styles["card-headers"]}>
            <span className={styles["card-title"]}>حسابي الشخصي</span>
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
                  <Button className={styles["btns"]}>
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
              <div className={styles["pic-border"]}>
                <Image
                  width="140"
                  height="140"
                  className={styles["profile-pic"]}
                  src="/images/muhabpower.png"
                />
              </div>
              <div className={styles["user-name"]}>مهاب أبوبكر</div>
              <div className={styles["user-email"]}>
                mohababubakir2001@gmail.com
              </div>
              <Fade className={styles["fader"]}>
                <Row className={styles["stats-container"]}>
                  <Col
                    xs={6}
                    lg={3}
                    md={6}
                    sm={6}
                    xl={3}
                    className={styles["stat-col"]}
                  >
                    <div className={styles["stat-title"]}>التقييمات</div>
                    <Card className={styles["stat-cards"]}>
                      <RiMailStarFill
                        className={styles["rate-icon"]}
                        size="2.5rem"
                      />
                      <div className={styles["stat-num"]}>45</div>
                    </Card>
                  </Col>
                  <Col
                    xs={6}
                    lg={3}
                    md={6}
                    sm={6}
                    className={styles["stat-col"]}
                  >
                    <div className={styles["stat-title"]}>المجتمعات</div>
                    <Card className={styles["stat-cards"]}>
                      <HiUserGroup
                        className={styles["comms-icon"]}
                        size="2.5rem"
                      />
                      <div className={styles["stat-num"]}>13</div>
                    </Card>
                  </Col>
                  <Col
                    xs={6}
                    lg={3}
                    md={6}
                    sm={6}
                    className={styles["stat-col"]}
                  >
                    <div className={styles["stat-title"]}>المحادثات</div>
                    <Card className={styles["stat-cards"]}>
                      <IoMdChatbubbles
                        className={styles["chat-icon"]}
                        size="2.5rem"
                      />
                      <div className={styles["stat-num"]}>45</div>
                    </Card>
                  </Col>
                  <Col
                    xs={6}
                    lg={3}
                    md={6}
                    sm={6}
                    className={styles["stat-col"]}
                  >
                    <div className={styles["stat-title"]}>الميداليات</div>
                    <Card className={styles["stat-cards"]}>
                      <RiMedalFill
                        className={styles["medal-icon"]}
                        size="2.5rem"
                      />
                      <div className={styles["stat-num"]}>3</div>
                    </Card>
                  </Col>
                </Row>
              </Fade>
            </div>
          )}

          {mode === "edit" && (
            <div className={styles["body-structure"]}>
              {/* profile pic editing */}

              <div className={styles["pic-border"] + " shadow"}>
                <Button className={styles["edit-pic-btn"]}>
                <Image
                  width="140"
                  height="140"
                  className={styles["profile-pic"]}
                  src="/images/muhabpower.png"
                />
                </Button>
              </div>
              <Fade className={styles["fader"]}>
                <Form className={styles["edit-form"]}>
                  <Form.Group>
                    <Form.Label>اسم المستخدم</Form.Label>
                    <InputGroup>
                      <FormControl />
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
