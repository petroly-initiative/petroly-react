import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { FaInfoCircle, FaEyeSlash, FaList } from "react-icons/fa";
import { ImLink } from "react-icons/im";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import styles from "../../styles/groups-page/group-creation.module.scss";
import translator from "../../dictionary/components/group-report-dict";
import { UserContext } from "../../state-management/user-state/UserContext";
import { MdWarning } from "react-icons/md";

function GroupReport(props) {
  const [cause, setCause] = useState("");
  const [show, setShow] = useState(false);
  const [invalidCause, validateCause] = useState(false);
  const [invalidOther, validateOther] = useState(false);
  const otherCause = useRef();
  const image = useRef();

  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  //TODO: handle reports in backend
  const createReport = (e) => {
    e.preventDefault();
    validateCause(cause.length === 0);
    if (cause === "OtherCause") {
      if (!otherCause.current.value.length === 0) {
        setShow(false);
        props.handleClose();
      } else {
        validateOther(true);
      }
    }
  };

  const selectType = (e) => {
    if (e.target.id !== "other-input") setCause(e.target.value);
  };

  useEffect(() => {
    setShow(props.showModal);
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
            {langState.header}{" "}
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
            {invalidCause && (
              <Alert className={styles["rules"]} variant="danger">
                <MdWarning className={styles["rules-icon"]} size="1.4rem" />
                <div>{langState.err}</div>
              </Alert>
            )}
            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                {" "}
                <FaInfoCircle className={styles.icons} />
                <span>*{langState.reasonSub}</span>
              </Form.Label>
              <Col>
                <Form onChange={selectType} noValidate>
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="Bad Content"
                    label={
                      <div
                        style={{ paddingBottom: 0 }}
                        className={styles["label-header"]}
                      >
                        <FaEyeSlash color="#FF0075" className={styles.icons} />
                        <span style={{ fontSize: "14px" }}>
                          {langState.badContent}
                        </span>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="Dead Link"
                    label={
                      <div
                        style={{ paddingBottom: 0 }}
                        className={styles["label-header"]}
                      >
                        <ImLink color="#F0A500" className={styles.icons} />
                        <span style={{ fontSize: "14px" }}>
                          {langState.deadLink}
                        </span>
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
                        <div
                          style={{ paddingBottom: 0 }}
                          className={styles["label-header"]}
                        >
                          <FaList color="#1DB9C3" className={styles.icons} />
                          <span style={{ fontSize: "14px" }}>
                            {langState.other}
                          </span>
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
                            isInvalid={invalidOther}
                            ref={otherCause}
                            className={styles["other-input"]}
                            style={{ fontSize: 12 }}
                            id="other-input"
                            type="text"
                            // disabled={!types.Section.find}
                            placeholder={langState.reasonSub}
                          />
                          <Form.Control.Feedback
                            style={{ textAlign: "right" }}
                            type="invalid"
                          >
                            {langState.otherErr}
                          </Form.Control.Feedback>
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
                <span> {langState.clue}</span>
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
                  {langState.clueHelper}{" "}
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
              {langState.submit}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupReport;
