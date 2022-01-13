import styles from "../../styles/groups-page/groups-filter.module.scss";
import { Modal, Col, Row, Form, InputGroup, FormControl } from "react-bootstrap";
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

  const [platforms, setPlatforms] = useState({
    Discord: true,
    Telegram: true,
    Whatsapp: true,
  });
 
const [types, setTypes] = useState({
  Educational: true,
  Entertainment: true,
  Section: { find: false, course: "" },
});
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
    setPlatforms(prev => Object.assign(prev, { [`${key}`]: !prev[key] }));
     forceUpdate();
  };

  const typeSwitch = (e) => {
   
    const key = e.target.id;
    console.log(key);
    if(key === "Sections"){
      setTypes((prev) =>
        Object.assign(prev, {
          Section: { find: !prev.Section.find, course: course },
        })
      );
      forceUpdate();
      
    }
    else
    setTypes((prev) => Object.assign(prev, { [`${key}`]: !prev[key] }));
    forceUpdate()
    console.log(course.current.value);
  }

  const saveChanges = () => {
    props.changePlatform(platforms);
    console.log(
      Object.assign(types, {
        Section: { find: types.Section.find, course: course.current.value },
      })
    );
    props.changeType(Object.assign(types, {Section: {find: types.Section.find, course: course.current.value}}))
  }

  const setCourse = (e) => {
    if (course.current.value.length !== 0) {
      validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
    }
  }




  
useEffect(() => {

  setPlatforms(props.platform)
}, [props.platform])

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
                    checked={platforms.Discord}
                    type="checkbox"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="Discord"
                    label={
                      <div>
                        <FaDiscord color={"#5865F2"} />
                        <span>Discord</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platforms.Whatsapp}
                    type="checkbox"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="Whatsapp"
                    label={
                      <div>
                        {" "}
                        <IoLogoWhatsapp color={"#25D366"} />
                        <span>Whatsapp</span>
                      </div>
                    }
                  />
                  <Form.Check
                    checked={platforms.Telegram}
                    type="checkbox"
                    className={
                      styles["filters"] +
                      ` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`
                    }
                    onChange={platformSwitch}
                    id="Telegram"
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
                  checked={types.Educational}
                  type="checkbox"
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
                  checked={types.Entertainment}
                  type="checkbox"
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
                  checked={types.Section.find}
                  type="checkbox"
                  className={
                    styles["filters"] +
                    " " +
                    styles["section-filter"] +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  onChange={typeSwitch}
                  id="Sections"
                  style={{ height: types.Section.find ? 100 : 50 }}
                  label={
                    <div>
                      <RiBook2Fill color="#622edb" />
                      <span>{langState.section}</span>
                      <InputGroup
                        className={styles["input-container"]}
                        style={{
                          maxHeight: types.Section.find ? 90 : 0,
                          opacity: types.Section.find ? "1" : "0",
                          transition: "150ms ease",
                          marginTop: types.Section.find ? 12 : 0,
                        }}
                      >
                        <Form.Control
                          ref={course}
                          defaultValue={props.type.Section.course}
                          type="text"
                          onChange={setCourse}
                          disabled={!types.Section.find}
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
