import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import Modal from "react-bootstrap/Modal";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
  CloseButton,
} from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames, MdWarning } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaIdCard, FaListUl } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { BiCube } from "react-icons/bi";

import { MdDescription } from "react-icons/md";
import styles from "../../styles/groups-page/group-creation.module.scss";
import { quickAddGroups } from "../../api/mutations";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-create-dict";
import { langDirection, L, M, USER } from "../../constants";
import mapErrorsToFields from "./utils";

/**
 * a modal for both editing and creating a new community
 * @param  {
 * create: a boolean flag used to indicate creation mode
 * edit: a boolean flag used to indicate editing mode
 * refetch: a callback to the parent to refetch original data after finishing the action
 * }
 * @returns
 */
function GroupQuickAddModal(props) {
  // UI control state
  const description = useRef("");

  // ? API State Hooks
  // New Community Creation Mutation
  const [
    createGroups,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(quickAddGroups);

  // handling modal output

  // -------
  // validation state
  const [invalidDesc, validateDesc] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const submitGroup = (e) => {
    e.preventDefault();
    validateDesc(
      description.current.value.length === 0 &&
        description.current.value.length <= 5000
    );
    setSubmit(true);
  };

  // submission controllers
  useEffect(() => {
    if (submit) {
      if (!invalidDesc) {
        createGroups({ variables: { text: description.current.value } });
      } else setSubmit(false);
    }
  }, [submit]);

  useEffect(() => {
    if (createData) {
      setSubmit(false);
    }
  }, [createData]);

  return (
    <>
      <style jsx>
        {`
        .label, .title{
          direction: ${
            user.lang === L.AR_SA ? "rtl !important" : "ltr !important"
          },
          textAlign: ${
            user.lang === L.AR_SA ? "right !important" : "left !important"
          }
          }
          .label-content {
          direction: ${
            user.lang === L.AR_SA ? "rtl !important" : "ltr !important"
          },
          textAlign: ${
            user.lang === L.AR_SA ? "right !important" : "left !important"
          }
          }
          
          `}
      </style>
      <Modal
        contentClassName={
          styles.layout + ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
        // controlling visibility from outer button for flexibility
        onHide={() => props.handleClose(false)}
        show={props.visible}
        aria-labelledby="contained-modal-title-vcenter"
        style={langDirection(user.lang)}
        dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
      >
        <Modal.Header
          style={langDirection(user.lang)}
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          className={`${user.theme === M.DARK ? styles["dark-mode"] : ""}`}
        >
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
            style={langDirection(user.lang)}
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          >
            {langState.headerQuick}{" "}
            <AiOutlineUsergroupAdd
              color="#00ead3"
              className={styles["icons"]}
            />
          </Modal.Title>
          <CloseButton
            onClick={() => {
              props.handleClose();
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Modal.Header>

        <Modal.Body
          className={
            "show-grid " +
            styles["modal-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Form
            style={langDirection(user.lang)}
            onSubmit={submitGroup}
            className={styles.formStyle}
            noValidate
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          >
            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column sm="12">
                <MdDescription className={styles.icons} />
                <span> *{langState.descQuick}</span>
              </Form.Label>
              {/* <FloatingLabel label="Comments"> */}
              <Col>
                <Form.Control
                  defaultValue={""}
                  ref={description}
                  required
                  className={
                    `${styles.input} ${styles.description}` +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  as="textarea"
                  placeholder={langState.descPlaceHolderQuick}
                  style={{ height: "100px" }}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  maxLength="5000"
                  isInvalid={invalidDesc}
                />
                {invalidDesc && (
                  <Form.Control.Feedback
                    style={langDirection(user.lang)}
                    type="invalid"
                  >
                    {langState.descErr}
                  </Form.Control.Feedback>
                )}
                {!invalidDesc && (
                  <Form.Text
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                    style={Object.assign(
                      { fontSize: 12 },
                      langDirection(user.lang)
                    )}
                    muted
                  >
                    {langState.descHelperQuick}
                  </Form.Text>
                )}
                {createData ? createData.quickAdd : ""}
              </Col>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className={
            styles.footer +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {createLoading ? (
            <Button
              className={
                styles["createButton"] + " shadow " + styles["loadingButton"]
              }
              disabled
            >
              <Spinner
                className={styles["loading-spinner"]}
                as="div"
                animation="grow"
                size="xl"
                role="status"
                aria-hidden="true"
              />
            </Button>
          ) : (
            <Button
              className={styles.createButton}
              type="submit"
              onClick={submitGroup}
            >
              {langState.createQuick}{" "}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupQuickAddModal;
