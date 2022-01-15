import React, { useRef, useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
  OverlayTrigger,
  Tooltip,
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
import { AiFillFileAdd } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import styles from "../../styles/groups-page/group-creation.module.scss";
import { createCommunnityMutation } from "../../api/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-create-dict";
import { langDirection, L, M, USER } from "../../constants";

function GroupCreationCard(props) {
  // UI control state
  const [modalShow, setModalShow] = useState(false);

  const [type, setType] = useState("");
  const [platform, setPlatform] = useState("");
  const course = useRef();
  const image = useRef();
  const description = useRef();
  const link = useRef();
  const name = useRef();
  const [invalidCourse, validateCourse] = useState(false);

  // TODO: another mutation for editing
  // Mutations & Queries State
  const [createCommunnity, { data, loading, error }] = useMutation(
    createCommunnityMutation
  );
  // -------
  // TODO: pass in initial values according to the mode
  // validation state
  const [invalidName, validateName] = useState(false);
  const [invalidLink, validateLink] = useState(false);
  const [invalidType, validateType] = useState(false);
  const [invalidPlatform, validatePlatform] = useState(false);
  const [invalidDesc, validateDesc] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    // console.log(userContext.user.lang);
    setLang(() => translator(user.lang));
    console.log("changed language!");
  }, [user.lang]);

  const createGroup = (e) => {
    e.preventDefault();
    validateName(name.current.value.length === 0 || name.current.length > 20);
    validateLink(link.current.value.length === 0);
    validateType(type.length === 0);
    validateDesc(
      description.current.value.length === 0 &&
        description.current.value.length <= 500
    );
    validatePlatform(platform.length === 0);
    if (course.current.value.length !== 0 && type === "SECTION") {
      validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(course.current.value));

    } else validateCourse(false);
    setSubmit(true);

  };

  const selectPlatform = (e) => {
    setPlatform(e.target.value);
  };

  const selectType = (e) => {
    if (e.target.id !== "course-input") setType(e.target.value);
    else {
      console.log(course.current.value);
      if (course.current.value.length !== 0) {
        validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
      }
    }
  };

  // TODO: edit for tags
  useEffect(() => {
    if (submit) {
      if (
        !(
          invalidName ||
          invalidLink ||
          invalidType ||
          invalidPlatform ||
          invalidDesc
        )
      ) {
        if (type === "SECTION") {
          if (!invalidCourse) {
            //TODO: check for duplicate naming in the DB, then submit in the DB
            createCommunnity({
              variables: {
                name: name.current.value,
                link: link.current.value,
                platform: platform,
                category: type,
                description: description.current.value,
                section: course.current.value,
              },
            });
          }
        } else {
          createCommunnity({
            variables: {
              name: name.current.value,
              link: link.current.value,
              platform: platform,
              category: type,
              description: description.current.value,
              section: "", //  this empty string is a must
            },
          });
        }
      }
    }
  }, [submit]);

  // handle load and error status.
  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data.communityCreate));

      if (data.communityCreate.ok) {
        setModalShow(false);
        props.refetch();
        props.handleMsg(true);
      } else {
        // this error belongs to API itself, user does not care about it
        validateLink(true);

        // TODO: handle link error msg
        // or ignore if there are enough validation, i.e., regex
        console.log(JSON.stringify(data.communityCreate));
        setSubmit(false); // to use it for later
      }
    }
  }, [data, loading]);

  return (
    <div>
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
        onHide={() => setModalShow(false)}
        show={modalShow}
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
            {langState.header}{" "}
            <AiOutlineUsergroupAdd
              color="#00ead3"
              className={styles["icons"]}
            />
          </Modal.Title>
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
            onSubmit={createGroup}
            className={styles.formStyle}
            noValidate
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          >
            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label
                style={langDirection(user.lang)}
                className={styles.label}
                column
                xs="12"
                dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
              >
                <FaIdCard className={styles.icons} />
                <span> *{langState.name}</span>
              </Form.Label>
              <Col>
                <Form.Control
                  isInvalid={invalidName}
                  ref={name}
                  required
                  className={
                    styles.input +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  type="text"
                  placeholder={langState.namePlaceholder}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                />
                {invalidName && (
                  <Form.Control.Feedback
                    style={langDirection(user.lang)}
                    type="invalid"
                  >
                    {langState.nameErr}
                  </Form.Control.Feedback>
                )}
                {!invalidName && (
                  <Form.Text
                    style={Object.assign(
                      {
                        fontSize: 12,
                        width: "100%",
                        marginBottom: 6,
                      },
                      langDirection(user.lang)
                    )}
                    muted
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  >
                    {langState.nameHelper}{" "}
                  </Form.Text>
                )}
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <BsCardImage className={styles.icons} />
                <span>{langState.pic}</span>
              </Form.Label>
              <Col>
                <Form.Control
                  ref={image}
                  className={
                    styles.input +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  type="file"
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                />
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <FaListUl className={styles["icons"]} />
                <span>*{langState.type}</span>
              </Form.Label>
              <Col>
                <Form onChange={selectType} noValidate>
                  {invalidType && (
                    <Alert className={styles["rules"]} variant="danger">
                      <MdWarning
                        className={styles["rules-icon"]}
                        size="1.4rem"
                      />
                      <div>{langState.typeErr}</div>
                    </Alert>
                  )}
                  <Form.Check
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                    className={styles.radio}
                    type={"radio"}
                    value="EDU"
                    label={
                      <div>
                        <div className={styles["label-header"]}>
                          <FaGraduationCap color="#FFB830" size="1.1rem" />
                          <span
                            className={` ${
                              user.theme === M.DARK ? styles["dark-header"] : ""
                            }`}
                          >
                            {langState.edu}
                          </span>
                        </div>
                        <div
                          className={
                            styles["label-content"] +
                            ` ${
                              user.theme === M.DARK ? styles["dark-check"] : ""
                            }`
                          }
                        >
                          {langState.eduSub}
                        </div>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    className={styles.radio}
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                    style={langDirection(user.lang)}
                    type={"radio"}
                    value="ENTERTAINING"
                    label={
                      <div>
                        <div className={styles["label-header"]}>
                          <MdGames color="#F037A5" size="1.1rem" />
                          <span
                            className={` ${
                              user.theme === M.DARK ? styles["dark-header"] : ""
                            }`}
                          >
                            {langState.fun}
                          </span>
                        </div>
                        <div
                          className={
                            styles["label-content"] +
                            ` ${
                              user.theme === M.DARK ? styles["dark-check"] : ""
                            }`
                          }
                        >
                          {langState.funSub}
                        </div>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                    className={styles.radio + " " + styles["course-container"]}
                    type={"radio"}
                    value="SECTION"
                    label={
                      <div>
                        <div
                          style={langDirection(user.lang)}
                          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                          className={styles["label-header"]}
                        >
                          <RiBook2Fill color="#5865F2" size="1.1rem" />
                          <span
                            className={` ${
                              user.theme === M.DARK ? styles["dark-header"] : ""
                            }`}
                          >
                            {langState.section}
                          </span>
                        </div>
                        <div
                          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                          className={
                            styles["label-content"] +
                            ` ${
                              user.theme === M.DARK ? styles["dark-check"] : ""
                            }`
                          }
                          style={langDirection(user.lang)}
                        >
                          {langState.sectionSub}
                        </div>
                        <InputGroup
                          hasValidation
                          style={{
                            maxHeight: type === "SECTION" ? 60 : 0,
                            opacity: type === "SECTION" ? "1" : "0",
                            transition: "150ms ease",
                            marginTop: type === "SECTION" ? 12 : 0,
                          }}
                        >
                          <Form.Control
                            isInvalid={invalidCourse}
                            ref={course}
                            className={
                              styles["course-input"] +
                              ` ${
                                user.theme === M.DARK
                                  ? styles["dark-mode-input"]
                                  : ""
                              }`
                            }
                            style={{ fontSize: 12 }}
                            id="course-input"
                            type="text"
                            // disabled={!types.Section.find}
                            placeholder={langState.course}
                            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                          />
                          {invalidCourse && (
                            <Form.Control.Feedback
                              style={langDirection(user.lang)}
                              type="invalid"
                            >
                              {langState.courseErr}
                            </Form.Control.Feedback>
                          )}
                          {!invalidCourse && (
                            <Form.Text
                              style={Object.assign(
                                {
                                  fontSize: 12,
                                  width: "100%",
                                  marginBottom: 6,
                                },
                                langDirection(user.lang)
                              )}
                              muted
                              dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                            >
                              {langState.courseErr}{" "}
                            </Form.Text>
                          )}
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
                <BiCube className={styles.icons} />
                <span> *{langState.platform}</span>
              </Form.Label>
              <Col>
                <Form onChange={selectPlatform} noValidate>
                  {invalidPlatform && (
                    <Alert className={styles["rules"]} variant="danger">
                      <MdWarning
                        className={styles["rules-icon"]}
                        size="1.4rem"
                      />
                      <div>{langState.platformErr}</div>
                    </Alert>
                  )}
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="WHATSAPP"
                    label={
                      <div>
                        <IoLogoWhatsapp color="#25D366" size="1.1rem" />{" "}
                        <span
                          style={{ marginLeft: 8, marginRight: 8 }}
                          className={` ${
                            user.theme === M.DARK ? styles["dark-header"] : ""
                          }`}
                        >
                          {langState.whatsapp}
                        </span>
                      </div>
                    }
                    id="1"
                    name="type"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="TELEGRAM"
                    label={
                      <div>
                        <FaTelegramPlane color="#0088cc" size="1.1rem" />{" "}
                        <span
                          style={{ marginLeft: 8, marginRight: 8 }}
                          className={` ${
                            user.theme === M.DARK ? styles["dark-header"] : ""
                          }`}
                        >
                          {langState.telegram}
                        </span>
                      </div>
                    }
                    id="2"
                    name="type"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="DISCORD"
                    label={
                      <div>
                        <FaDiscord color="#5865F2" size="1.1rem" />{" "}
                        <span
                          style={{ marginLeft: 8, marginRight: 8 }}
                          className={` ${
                            user.theme === M.DARK ? styles["dark-header"] : ""
                          }`}
                        >
                          {langState.discord}
                        </span>
                      </div>
                    }
                    id="3"
                    name="type"
                  />
                </Form>
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column sm="12">
                <MdDescription className={styles.icons} />
                <span> *{langState.desc}</span>
              </Form.Label>
              {/* <FloatingLabel label="Comments"> */}
              <Col>
                <Form.Control
                  ref={description}
                  required
                  className={
                    `${styles.input} ${styles.description}` +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  as="textarea"
                  placeholder={langState.descPlaceHolder}
                  style={{ height: "100px" }}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  maxLength="500"
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
                    {langState.descHelper}
                  </Form.Text>
                )}
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column sm="12">
                <FiLink className={styles.icons} />
                <span> *{langState.link}</span>
              </Form.Label>
              <Col>
                <Form.Control
                  isInvalid={invalidLink}
                  required
                  ref={link}
                  className={
                    `${styles.input} ${styles.link}` +
                    ` ${user.theme === M.DARK ? styles["dark-mode-input"] : ""}`
                  }
                  type="text"
                  placeholder={langState.linkPlaceholder}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                />
                {invalidLink && (
                  <Form.Control.Feedback
                    style={langDirection(user.lang)}
                    type="invalid"
                  >
                    {langState.linkErr}
                  </Form.Control.Feedback>
                )}
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
          {loading ? (

            <Button className={styles["createButton"] + " shadow"} disabled>

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
              // onClick={() => setModalShow(false)}
              onClick={createGroup}
            >
              {langState.create}{" "}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {user.status !== USER.LOGGED_IN ? (
        <OverlayTrigger
          trigger={"hover"}
          placement="top"
          delay={{ show: 100, hide: 300 }}
          overlay={
            <Tooltip>
              {langState.createBlock}
            </Tooltip>
          }
        >
          <Button
            className={styles.modalButton}
            onClick={() => setModalShow(true)}
            disabled={user.status !== USER.LOGGED_IN}
          >
            <AiFillFileAdd size={32} />
          </Button>
        </OverlayTrigger>
      ) : (

        <Button
          className={styles.modalButton}
          onClick={() => setModalShow(true)}
          disabled={user.status !== USER.LOGGED_IN}
        >
          <AiFillFileAdd size={32} />
        </Button>

      )}
    </div>
  );
}

export default GroupCreationCard;
