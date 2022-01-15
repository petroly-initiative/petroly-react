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
  const course = useRef();
  const [platforms, setPlatforms] = useState({
    DISCORD: false,
    TELEGRAM: false,
    WHATSAPP: false,
  });
  const [types, setTypes] = useState({
    EDU: false,
    ENTERTAINING: false,
    SECTION: { find: false, course: "" },
  });

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
    setPlatforms((prev) => Object.assign(prev, { [`${key}`]: !prev[key] }));
    forceUpdate();
  };

  const typeSwitch = (e) => {
    const key = e.target.id;
    console.log(key);
    if (key === "SECTION") {
      setTypes((prev) =>
        Object.assign(prev, {
          SECTION: { find: !prev.SECTION.find, course: course },
        })
      );
      forceUpdate();
    } else setTypes((prev) => Object.assign(prev, { [`${key}`]: !prev[key] }));
    forceUpdate();
    console.log(course.current.value);
  };

  const saveChanges = () => {
    props.changePlatform(platforms);
    props.changeType(
      Object.assign(types, {
        SECTION: { find: types.SECTION.find, course: course.current.value },
      })
    );
  };

  const setCourse = (e) => {
    if (course.current.value.length !== 0) {
      validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
    }
  };

  useEffect(() => {
    setPlatforms(props.platform);
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
                    defaultChecked={platforms.DISCORD}
                    type="checkbox"
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
                    defaultChecked={platforms.WHATSAPP}
                    type="checkbox"
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
                    defaultChecked={platforms.TELEGRAM}
                    type="checkbox"
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
                </div>
              </Form>
            </Col>
            <Col className={styles["cols"]}>
              <div className={styles["titles"]}>{langState.typesubHeader}</div>
              <Form>
                <Form.Check
                  defaultChecked={types.EDU}
                  type="checkbox"
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
                  defaultChecked={types.ENTERTAINING}
                  type="checkbox"
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
                  defaultChecked={types.SECTION.find}
                  type="checkbox"
                  className={
                    styles["filters"] +
                    " " +
                    styles["section-filter"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="SECTION"
                  style={{ height: types.SECTION.find ? 100 : 50 }}
                  label={
                    <div>
                      <RiBook2Fill color="#622edb" />
                      <span>{langState.section}</span>
                      <InputGroup
                        className={styles["input-container"]}
                        style={{
                          maxHeight: types.SECTION.find ? 90 : 0,
                          opacity: types.SECTION.find ? "1" : "0",
                          transition: "150ms ease",
                          marginTop: types.SECTION.find ? 12 : 0,
                        }}
                      >
                        <Form.Control
                          ref={course}
                          defaultValue={props.type.SECTION.course}
                          type="text"
                          onChange={setCourse}
                          disabled={!types.SECTION.find}
                          placeholder={"المادة الدراسية"}
                          isInvalid={invalidCourse}
                          // onChange = {setCourse}
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
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
