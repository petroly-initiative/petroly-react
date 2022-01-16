import styles from "../../styles/groups-page/groups-filter.module.scss";
import {
  Modal,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { GoSettings } from "react-icons/go";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-filter-dict";
import { M } from "../../constants";

export default function GroupsFilter(props) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [invalidCourse, validateCourse] = useState(false);

  /** 
   * ? state inputs can be the following
   * {
   {type: "Educational"}
   type: "Entertainment",
   {type: "Section", course: "ABCDXXX"}
  }
  */
  const [platform, setPlatform] = useState("ALL");
  const [groupType, setType] = useState({ type: "ALL" });
  const course = useRef();

  // Forcing a re- render
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [langState, setLang] = useState(() => translator(user.lang));
  useEffect(() => {
    // console.log(userContext.user.lang);
    setLang(() => translator(user.lang));
    console.log("changed language!");
  }, [user.lang]);

  const platformSwitch = (e) => {
    const key = e.target.id;
    console.log(key);
    setPlatform(key);
    forceUpdate();
  };

  const typeSwitch = (e) => {
    const key = e.target.id;
    console.log(key);

    if (key === "SECTION") {
      setType({ type: "SECTION", course: course.current.value });

      forceUpdate();
    } else setType({ type: key });
    forceUpdate();
    console.log(course.current.value);
  };

  const saveChanges = () => {
    props.changePlatform(platform);
    console.log(groupType);

    if (groupType.type !== "SECTION") props.changeType(groupType);
    else {
      if (!invalidCourse)
        props.changeType({ type: "SECTION", course: course.current.value });
    }
  };

  const setCourse = (e) => {
    if (course.current.value.length !== 0) {
      validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
    }
  };

  useEffect(() => {
    setPlatform(props.platform);
  }, [props.platform]);

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  return (
    <>
      <Modal
        className={styles["container"]}
        centered
        show={show}
        onHide={() => {
          props.close();
          setShow(false);
          saveChanges();
        }}
        size="md"
      >
        <Modal.Header
          className={
            styles["modal-header"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <GoSettings />
          <span>{langState.modalHeader}</span>
        </Modal.Header>
        <Modal.Body
          className={
            styles["modal-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Row className={styles["cols-container"]}>
            <Col className={styles["cols"]}>
              <div
                className={
                  styles["titles"] +
                  ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                }
              >
                {langState.platformSubHeader}
              </div>
              <Form>
                <div>
                  <Form.Check
                    checked={platform === "DISCORD"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="DISCORD"
                    label={
                      <div>
                        <FaDiscord color={"#5865F2"} />
                        <span>Discord</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platform === "WHATSAPP"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="WHATSAPP"
                    label={
                      <div>
                        {" "}
                        <IoLogoWhatsapp color={"#25D366"} />
                        <span>Whatsapp</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platform === "TELEGRAM"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="TELEGRAM"
                    label={
                      <div>
                        {" "}
                        <FaTelegramPlane color={"#0088cc"} />
                        <span>Telegram</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platform === "ALL"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="ALL"
                    label={
                      <div>
                        {" "}
                        <span>{langState.all}</span>
                      </div>
                    }
                  />
                </div>
              </Form>
            </Col>
            <Col className={styles["cols"]}>
              <div className={styles["titles"]}>{langState.typesubHeader}</div>
              <Form>
                <Form.Check
                  checked={groupType.type === "EDU"}
                  type="radio"
                  className={
                    styles["filters"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="EDU"
                  label={
                    <div>
                      <FaGraduationCap color="#FFB830" />
                      <span>{langState.edu}</span>
                    </div>
                  }
                />

                <Form.Check
                  checked={groupType.type === "ENTERTAINING"}
                  type="radio"
                  className={
                    styles["filters"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="ENTERTAINING"
                  label={
                    <div>
                      <MdGames color="#F037A5" />
                      <span>{langState.fun}</span>
                    </div>
                  }
                />
                <Form.Check
                  checked={groupType.type === "SECTION"}
                  type="radio"
                  className={
                    styles["filters"] +
                    " " +
                    styles["section-filter"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="SECTION"
                  style={{ height: groupType.type === "SECTION" ? 100 : 50 }}
                  label={
                    <div>
                      <RiBook2Fill color="#622edb" />
                      <span>{langState.section}</span>
                      <InputGroup
                        className={styles["input-container"]}
                        style={{
                          maxHeight: groupType.type === "SECTION" ? 90 : 0,
                          opacity: groupType.type === "SECTION" ? "1" : "0",
                          transition: "150ms ease",
                          marginTop: groupType.type === "SECTION" ? 12 : 0,
                        }}
                      >
                        <Form.Control
                          ref={course}
                          defaultValue={props.type.course || ""}
                          type="text"
                          onChange={setCourse}
                          disabled={!groupType.type === "SECTION"}
                          placeholder={"المادة الدراسية"}
                          isInvalid={invalidCourse}
                        />
                        <Form.Text
                          style={{
                            fontSize: 10,
                            width: "100%",
                            marginBottom: 6,
                          }}
                          id="passwordHelpBlock"
                          muted
                        >
                          الرجاء استخدام صيغة ABCDXXX
                        </Form.Text>
                      </InputGroup>
                    </div>
                  }
                />
                <Form.Check
                  checked={groupType.type === "ALL"}
                  type="radio"
                  className={
                    styles["filters"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="ALL"
                  label={
                    <div>
                      <span>{langState.all}</span>
                    </div>
                  }
                />
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
