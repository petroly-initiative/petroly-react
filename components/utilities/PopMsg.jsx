import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { IoMdCloseCircle } from "react-icons/io";
import styles from "../../styles/utilities/popup.module.scss";
import { useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { M } from "../../constants";
import { useCallback } from "react";


export default function PopMsg(props) {
  // This is gonna be useful when setting onClose prop.

  const { user } = useContext(UserContext);

  // auto closing mechanism
  var timer = useCallback(() => {
    if (props.visible) {
      timer = setTimeout(() => {
        props.handleClose(false);
      }, 2500);
    }
  }, [props.visible]);

  useEffect(() => {
    timer();
  });

  return (
    <>
      <Modal
        show={props.visible}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        // making sure that no 2 fades conflict
        onHide={() => {
          clearTimeout(timer);
          props.handleClose(false);
        }}
        backdrop={false}
        style={{ borderRadius: "10px !important" }}
      >
        <Modal.Body
          className={
            styles["popup-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}` +
            " shadow"
          }
          style={{ borderRadius: "10px !important" }}
        >
          <div
            className={
              props.success
                ? styles["success"]
                : props.failure
                ? styles["fail"]
                : ""
            }
          >
            {props.msg}
          </div>
          <Button
            className={styles.createButton}
            type="submit"
            onClick={() => props.handleClose(false)}
          >
            <IoMdCloseCircle />
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
