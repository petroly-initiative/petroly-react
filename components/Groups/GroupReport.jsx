import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaIdCard, FaListUl } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiCube } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import styles from "../../styles/groups-page/group-creation.module.scss";

function GroupReport(props) {
  const [cause, setCause] = useState("");
  const [show, setShow] = useState(false);
  const otherCause = useRef();
  const image = useRef();
  const description = useRef();

  const createReport = (e) => {
    e.preventDefault();
  };

  const selectType = (e) => {
    if (e.target.id !== "other-input")
      setCause(e.target.value, console.log(cause));
  };

  useEffect(() => {
    setShow(props.showModal);
    console.log(props.showModal);
  }, [props.showModal]);

  return (
    <div>
      <Modal
        backdrop={true}
        contentClassName={styles.layout}
        style={{ direction: "rtl", overflow: "hidden" }}
        show={show}
        onHide={() => {
          props.handleClose();
          setShow(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header className={styles.title}>
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
          >
            بلاغ عن مجتمع{" "}
            <HiOutlineSpeakerphone
              style={{ marginRight: "8px" }}
              size="1.5rem"
              color="#00ead3"
              className={styles.icons}
            />
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={createReport} className={styles.formStyle} noValidate>
          <Modal.Body className={"show-grid " + styles["modal-body"]}>
            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12"></Form.Label>
              <Col>
                <Form onChange={selectType} noValidate>
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="Educational"
                    label={
                      <div className={styles["label-header"]}>
                        <span>محتوى غير مناسب</span>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="Entertainment"
                    label={
                      <div className={styles["label-header"]}>
                        <span>الرابط لا يعمل</span>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    className={styles.radio + " " + styles["course-container"]}
                    type={"radio"}
                    value="OtherCause"
                    label={
                      <div>
                        <div className={styles["label-header"]}>
                          <span>أسباب أخرى</span>
                        </div>

                        <InputGroup
                          hasValidation
                          style={{
                            maxHeight: cause === "OtherCause" ? 60 : 0,
                            opacity: cause === "OtherCause" ? "1" : "0",
                            transition: "150ms ease",
                            marginTop: cause === "OtherCause" ? 12 : 0,
                          }}
                        >
                          <Form.Control
                            ref={otherCause}
                            className={styles["other-input"]}
                            style={{ fontSize: 12 }}
                            id="other-input"
                            type="text"
                            // disabled={!types.Section.find}
                            placeholder={"سبب البلاغ"}
                          />
                        </InputGroup>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                </Form>
              </Col>
            </InputGroup>
            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <BsCardImage className={styles.icons} />
                <span> دليل البلاغ</span>
              </Form.Label>
              <Col>
                <Form.Control
                  ref={image}
                  className={styles.input}
                  type="file"
                />
                <Form.Text
                  style={{
                    fontSize: 12,
                    width: "100%",
                    marginBottom: 6,
                  }}
                  id="passwordHelpBlock"
                  muted
                >
                  الرجاء إرفاق صورة واضحة تبيّن سبب البلاغ
                </Form.Text>
              </Col>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer className={styles.footer}>
            <Button
              className={styles.createButton}
              type="submit"
              // onClick={() => setModalShow(false)}
            >
              أرسل البلاغ
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupReport;
