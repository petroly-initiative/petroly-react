import styles from "../../styles/groups-page/groups-filter.module.scss";
import { Modal, Col, Row, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { useEffect, useState, useCallback, useRef } from "react";
import { GoSettings } from "react-icons/go";
/**
 *
 * @param {*} props
 * @returns a modal to receive filtering options from users
 */

/**
 * 
 * TODO: 
 *  *Create a value prop to connect the chekboxes to state
 *  
 */
export default function GroupsFilter(props) {

  
  const [show, setShow] = useState(false);
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

  




  
useEffect(() => {

  setPlatforms(props.platform)
}, [props.platform])

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
              <Form onSele>
                <Form.Check
                  checked={platforms.Discord}
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
                  checked={platforms.Whatsapp}
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
                  checked={platforms.Telegram}
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
              </Form>
            </Col>
            <Col className={styles["cols"]}>
              <div className={styles["titles"]}>نوع المجتمع</div>
              <Form>
                <Form.Check
                  checked={types.Educational}
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
                  checked={types.Entertainment}
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
                  checked={types.Section.find}
                  type="checkbox"
                  className={styles["filters"] + " " + styles["section-filter"]}
                  onChange={typeSwitch}
                  id="Sections"
                  style={{ height: types.Section.find ? 90 : 50 }}
                  label={
                    <div>
                      <RiBook2Fill color="#622edb" />
                      <span>شعبة</span>
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
                          disabled={!types.Section.find}
                          placeholder={"المادة الدراسية"}
                          // onChange = {setCourse}
                        />
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
