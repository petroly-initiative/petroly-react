import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import styles from "../styles/groups-page/group-creation.module.scss";

// TODO Modify this component.
export default function PopMsg(props) {
  const [successShow, setSuccessShow] = useState(props.success);
  const [visible, setModalVisible] = useState(true); // This is gonna be useful when setting onClose prop.

  return (
    <>
      <Modal
        contentClassName={styles.layout}
        onHide={props.onClose ? props.onClose : () => setModalVisible(false)}
        show={successShow && visible}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
          >
            {props.successMsg}
            <AiOutlineUsergroupAdd color="#00ead3" className={styles.icons} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"show-grid " + styles["modal-body"]}>
          <div
            className="center-text"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {props.msgBody}
          </div>
          <Button
            className={styles.createButton}
            type="submit"
            onClick={
              props.onClose ? props.onClose : () => setModalVisible(false)
            }
          >
            Close
          </Button>
        </Modal.Body>
        <Modal.Footer className={styles.footer}></Modal.Footer>
      </Modal>
      <Modal
        contentClassName={styles.layout}
        onHide={props.onClose ? props.onClose : () => setModalVisible(false)}
        show={!successShow && visible}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
          >
            {props.errorMsg}
            <AiOutlineUsergroupAdd color="#00ead3" className={styles.icons} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"show-grid " + styles["modal-body"]}>
          <div
            className="center-text"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {props.msgBody}
          </div>
          <Button
            className={styles.createButton}
            type="submit"
            onClick={
              props.onClose ? props.onClose : () => setModalVisible(false)
            }
          >
            ok
          </Button>
        </Modal.Body>
        <Modal.Footer className={styles.footer}></Modal.Footer>
      </Modal>
    </>
  );
}
