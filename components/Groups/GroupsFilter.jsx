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
import { useEffect, useState, useCallback, useRef } from "react";
import { GoSettings } from "react-icons/go";

export default function GroupsFilter(props) {
  const [show, setShow] = useState(false);
  const [invalidCourse, validateCourse] = useState(false);

  const [platforms, setPlatforms] = useState({
    DISCORD: true,
    TELEGRAM: true,
    WHATSAPP: true,
  });

  const [types, setTypes] = useState({
    EDU: true,
    ENTERTAINING: true,
    SECTION: { find: false, course: "" },
  });
  const course = useRef();
  // Forcing a re- render
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const platformSwitch = (e) => {
    const key = e.target.id;
    console.log(key);
    setPlatforms((prev) => Object.assign(prev, { [`${key}`]: !prev[key] }));
    forceUpdate();
  };

  const typeSwitch = (e) => {
    const key = e.target.id;
    console.log(key);
    if (key === "Sections") {
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
    console.log(
      Object.assign(types, {
        SECTION: { find: types.SECTION.find, course: course.current.value },
      })
    );
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
        centered
        show={show}
        onHide={() => {
          props.close();
          setShow(false);
          saveChanges();
        }}
        size="md"
      >
        <Modal.Header className={styles["modal-header"]}>
          <GoSettings />
          <span>إعدادت البحث</span>
        </Modal.Header>
        <Modal.Body className={styles["modal-body"]}>
          <Row className={styles["cols-container"]}>
            <Col className={styles["cols"]}>
              <div className={styles["titles"]}>منصة المجتمع</div>
              <Form>
                <div>
                  <Form.Check
                    checked={platforms.DISCORD}
                    type="checkbox"
                    className={styles["filters"]}
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
                    checked={platforms.WHATSAPP}
                    type="checkbox"
                    className={styles["filters"]}
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
                    checked={platforms.TELEGRAM}
                    type="checkbox"
                    className={styles["filters"]}
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
              <div className={styles["titles"]}>نوع المجتمع</div>
              <Form>
                <Form.Check
                  checked={types.EDU}
                  type="checkbox"
                  className={styles["filters"]}
                  onChange={typeSwitch}
                  id="Educational"
                  label={
                    <div>
                      <FaGraduationCap color="#FFB830" />
                      <span>تعليمي</span>
                    </div>
                  }
                />

                <Form.Check
                  checked={types.ENTERTAINING}
                  type="checkbox"
                  className={styles["filters"]}
                  onChange={typeSwitch}
                  id="Entertainment"
                  label={
                    <div>
                      <MdGames color="#F037A5" />
                      <span>ترفيهي</span>
                    </div>
                  }
                />
                <Form.Check
                  checked={types.SECTION.find}
                  type="checkbox"
                  className={styles["filters"] + " " + styles["section-filter"]}
                  onChange={typeSwitch}
                  id="Sections"
                  style={{ height: types.SECTION.find ? 100 : 50 }}
                  label={
                    <div>
                      <RiBook2Fill color="#622edb" />
                      <span>شعبة</span>
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
