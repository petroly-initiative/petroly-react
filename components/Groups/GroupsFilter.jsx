import styles from "../../styles/groups-page/groups-filter.module.scss";
import {
  Modal,
  Col,
  Row,
  Form,
  InputGroup,
  CloseButton,
} from "react-bootstrap";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-filter-dict";
import { M } from "../../constants";

export default function GroupsFilter(props) {
  const { user } = useContext(UserContext); // user context info
  const [show, setShow] = useState(false); // modal visisbility state
  const [invalidCourse, validateCourse] = useState(false); // course validation indicator

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
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const platformSwitch = (e) => {
    const key = e.target.id;
    setPlatform(key);
    // forceUpdate();
  };

  const typeSwitch = (e) => {
    const key = e.target.id;

    if (key === "SECTION") {
      setType(Object.assign({ type: "SECTION", course: course.current.value }));
    } else setType({ type: key });
    // forceUpdate();
  };

  const saveChanges = () => {
    props.changePlatform(platform);

    if (groupType.type !== "SECTION") props.changeCategory(groupType);
    else {
      if (!invalidCourse)
        props.changeCategory({ type: "SECTION", course: course.current.value });
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
    if (props.category.type === "SECTION")
      setType({ type: props.category.type, course: props.category.course });
    else setType({ type: props.category.type });
  }, [props.category]);

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
          setShow(false);
          saveChanges();
          props.close();
        }}
        size="md"
      >
        <Modal.Header
          className={
            styles["modal-header"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <span
            className={` ${user.theme === M.DARK ? styles["dark-topper"] : ""}`}
          >
            <GiSettingsKnobs />
            <span dir="ltr">{langState.modalHeader}</span>
          </span>
          <CloseButton
            onClick={() => {
              setShow(false);
              saveChanges();
              props.close();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Modal.Header>
        <Modal.Body
          className={
            styles["modal-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Row className={styles["cols-container"]}>
            <Col xs={12} sm={6} className={styles["cols"]}>
              <div
                className={
                  styles["titles"] +
                  ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                }
              >
                {langState.platformSubHeader}
              </div>
              <Form>
               
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
                
              </Form>
            </Col>
            <Col xs={12} sm={6} className={styles["cols"]}>
              <div
                className={
                  styles["titles"] +
                  ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                }
              >
                {langState.typesubHeader}
              </div>
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
                          defaultValue={props.category.course || ""}
                          type="text"
                          onChange={setCourse}
                          disabled={!groupType.type === "SECTION"}
                          placeholder={langState.course}
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
                          {langState.courseErr}
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
