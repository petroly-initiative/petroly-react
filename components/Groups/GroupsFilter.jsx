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
  const [show, setShow] = useState(false);
  const [invalidCourse, validateCourse] = useState(false);

  const [platform, setPlatform] = useState("whatsapp");

  /** 
   * ? state inputs can be the following
   * {
    {type: "Educational"}
    type: "Entertainment",
    {type: "Section", course: "ABCDXXX"}
  }
   */
  const [groupType, setType] = useState({ type: "Educational" });
  const course = useRef();
  // Forcing a re- render
  const [, updateState] = useState();

  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    // console.log(userContext.user.lang);
    setLang(() => translator(user.lang));
    console.log("changed language!");
  }, [user.lang]);

  const forceUpdate = useCallback(() => updateState({}), []);

  const platformSwitch = (e) => {
    const key = e.target.id;
    console.log(key);
    setPlatform(key);
    forceUpdate();
  };

  const typeSwitch = (e) => {
    const key = e.target.id;
    console.log(key);
    if (key === "Sections") {
      setType({ type: "Sections", course: course.current.value });
      forceUpdate();
    } else setType({ type: key });
    forceUpdate();
    console.log(course.current.value);
  };

  const saveChanges = () => {
    props.changePlatform(platform);
    console.log(
      groupType
    );
    
    if(groupType.type !== "Sections")
    props.changeType(groupType);
    else{
      if(!invalidCourse)
      props.changeType({type: "Sections", course: course.current.value})
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
                    checked={platform === "discord"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="discord"
                    label={
                      <div>
                        <FaDiscord color={"#5865F2"} />
                        <span>Discord</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platform === "whatsapp"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="whatsapp"
                    label={
                      <div>
                        {" "}
                        <IoLogoWhatsapp color={"#25D366"} />
                        <span>Whatsapp</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platform === "telegram"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="telegram"
                    label={
                      <div>
                        {" "}
                        <FaTelegramPlane color={"#0088cc"} />
                        <span>Telegram</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platform === "all"}
                    type="radio"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="all"
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
                  checked={groupType.type === "Educational"}
                  type="radio"
                  className={
                    styles["filters"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="Educational"
                  label={
                    <div>
                      <FaGraduationCap color="#FFB830" />
                      <span>{langState.edu}</span>
                    </div>
                  }
                />

                <Form.Check
                  checked={groupType.type === "Entertainment"}
                  type="radio"
                  className={
                    styles["filters"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="Entertainment"
                  label={
                    <div>
                      <MdGames color="#F037A5" />
                      <span>{langState.fun}</span>
                    </div>
                  }
                />
                <Form.Check
                  checked={groupType.type === "Sections"}
                  type="radio"
                  className={
                    styles["filters"] +
                    " " +
                    styles["section-filter"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="Sections"
                  style={{ height: groupType.type === "Sections" ? 100 : 50 }}
                  label={
                    <div>
                      <RiBook2Fill color="#622edb" />
                      <span>{langState.section}</span>
                      <InputGroup
                        className={styles["input-container"]}
                        style={{
                          maxHeight: groupType.type === "Sections" ? 90 : 0,
                          opacity: groupType.type === "Sections" ? "1" : "0",
                          transition: "150ms ease",
                          marginTop: groupType.type === "Sections" ? 12 : 0,
                        }}
                      >
                        <Form.Control
                          ref={course}
                          defaultValue={props.type.course || ""}
                          type="text"
                          onChange={setCourse}
                          disabled={!groupType.type === "Sections"}
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
                  checked={groupType.type === "All"}
                  type="radio"
                  className={
                    styles["filters"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="All"
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
