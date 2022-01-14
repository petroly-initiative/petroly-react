import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Col,
  Row,
  Form,
  Alert,
  Button,
  InputGroup,
  Spinner,
} from "react-bootstrap";

import { AiOutlineUsergroupAdd } from "react-icons/ai";

import styles from "../../styles/groups-page/group-creation.module.scss";

// TODO Modify this component.
/* It should show the created community to the user and allow him to share it or edit it. */
function CreatedGroup(props) {
  const [successShow, setSuccessShow] = useState(props.success);
  const refreshPage = () => window.location.reload(false);
  return (
    <>
      <Modal
        contentClassName={styles.layout}
        onHide={() => props.refetch()}
        show={successShow}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
          >
            {" تم  انشاء المجتمع بنجاح"}
            <AiOutlineUsergroupAdd color="#00ead3" className={styles.icons} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"show-grid " + styles["modal-body"]}>
          <Alert variant={"success"}>
            بإمكانك تعديل المجتمع او حذفه من صفحتك الشخصية
          </Alert>
          <Button
            className={styles.createButton}
            type="submit"
            onClick={() => props.refetch()}
          >
            ok
          </Button>
        </Modal.Body>
        <Modal.Footer className={styles.footer}></Modal.Footer>
      </Modal>
      <Modal
        contentClassName={styles.layout}
        onHide={() => props.refetch()}
        show={!successShow}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
          >
            {" لم يتم انشاء المجتمع"}
            <AiOutlineUsergroupAdd color="#00ead3" className={styles.icons} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"show-grid " + styles["modal-body"]}>
          <Button
            className={styles.createButton}
            type="submit"
            onClick={() => props.refetch()}
          >
            ok
          </Button>
        </Modal.Body>
        <Modal.Footer className={styles.footer}></Modal.Footer>
      </Modal>
    </>
  );
}
export default CreatedGroup;
