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
import {
  createCommunnityMutation,
  editCommunnityMutation,
} from "../../api/mutations";
import { getCommunity } from "../../api/queries";
import { useMutation, useQuery } from "@apollo/client";
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
function GroupCreationCard(props) {
  // UI control state

  const [type, setType] = useState("");
  const [platform, setPlatform] = useState("");
  const [APIErrors, setAPIErrors] = useState({});
  const course = useRef();
  const image = useRef();
  const description = useRef();
  const link = useRef();
  const name = useRef();
  const [invalidCourse, validateCourse] = useState(false);
  // using a variable instead of state as we only change it once
  const [defaultData, setDefaults] = useState({
    name: "",
    course: "",
    description: "",
    link: "",
  });

  // ? API State Hooks
  // New Community Creation Mutation
  const [
    createCommunnity,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(createCommunnityMutation);
  // Fetching existing communities query
  const {
    data: existingData,
    loading: existingLoading,
    error,
    refetch: refetchExisting,
  } = useQuery(getCommunity, {
    variables: { id: props.id },
    skip: props.create,
  }); // skipping the query when at create mode
  // Editing Existing Community Mutation
  const [
    editCommunnity,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(editCommunnityMutation);
  // handling existing community data loading
  useEffect(() => {
    if (existingData) {
      setType(existingData.community.category);
      setPlatform(existingData.community.platform);
      setDefaults({
        name: existingData.community.name,
        course: existingData.community.section,
        description: existingData.community.description,
        link: existingData.community.link,
      });
    }
  }, [existingData]);

  // handling modal output

  // -------
  // validation state
  const [invalidName, validateName] = useState(false);
  const [invalidImage, validateImage] = useState(false);
  const [invalidLink, validateLink] = useState(false);
  const [invalidType, validateType] = useState(false);
  const [invalidPlatform, validatePlatform] = useState(false);
  const [invalidDesc, validateDesc] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const submitGroup = (e) => {
    e.preventDefault();
    validateName(name.current.value.length === 0 || name.current.length > 100);
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
      if (course.current.value.length !== 0) {
        validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
      }
    }
  };
  // submission controllers
  const createGroup = () => {
    // TODO: create separate functions and call from this point
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
            file: image.current.files[0],
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
          file: image.current.files[0],
        },
      });
    }
  };

  const editGroup = () => {
    console.log(image.current.files[0]);
    if (type == "SECTION")
      editCommunnity({
        variables: {
          id: props.id,
          name: name.current.value,
          link: link.current.value,
          platform: platform,
          category: type,
          description: description.current.value,
          section: course.current.value,
          file: image.current.files[0],
        },
      });
    else
      editCommunnity({
        variables: {
          id: props.id,
          name: name.current.value,
          link: link.current.value,
          platform: platform,
          category: type,
          description: description.current.value,
          section: course.current.value, //  this empty string is a must
          file: image.current.files[0],
        },
      });
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
        // delegating the correct handler to fire
        if (props.create) createGroup();
        else if (props.edit) editGroup();
        else throw new Error("No valid Operation prop was passed");
      } else setSubmit(false);
    }
  }, [submit]);

  // Enexpected error handling and logging for both creation and editing
  useEffect(() => {
    if (createData && props.create) {
      if (createData.communityCreate.pk) {
        props.handleClose(false);
        props.refetch();
        props.handleMsg(true);
      } else {
        setAPIErrors(mapErrorsToFields(createData.communityCreate.messages));
        setSubmit(false); // to use it for later
      }
    }
  }, [createData, createLoading]);

  useEffect(() => {
    if (editData && props.edit) {
      if (editData.communityUpdate.pk) {
        props.handleClose(false);
        props.refetch();
        refetchExisting();
        props.handleMsg(true);
      } else {
        setAPIErrors(mapErrorsToFields(editData.communityUpdate.messages));
        setSubmit(false); // to use it for later
      }
    }
  }, [editData]);

  useLayoutEffect(() => {
    if (APIErrors.name) validateName(true);
    if (APIErrors.icon) validateImage(true);
    if (APIErrors.description) validateDesc(true);
    if (APIErrors.link) validateLink(true);
  }, [APIErrors]);

  if (existingLoading) return null;

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
            {langState.header}{" "}
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
                  defaultValue={defaultData.name}
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
                    {langState.nameErr} <br />
                    {APIErrors.name}
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
                  style={{ paddingBottom: 0 }}
                />
                {invalidImage && (
                  <Form.Control.Feedback
                    style={langDirection(user.lang)}
                    type="invalid"
                  >
                    {APIErrors.icon}
                  </Form.Control.Feedback>
                )}
                {!invalidImage && (
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
                    {langState.imageHelper}{" "}
                  </Form.Text>
                )}
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
                    defaultChecked={type === "EDU"}
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
                    defaultChecked={type === "ENTERTAINING"}
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
                    defaultChecked={type === "SECTION"}
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
                            defaultValue={defaultData.course}
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
                    defaultChecked={platform === "WHATSAPP"}
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
                    defaultChecked={platform === "TELEGRAM"}
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
                    defaultChecked={platform === "DISCORD"}
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
                  defaultValue={defaultData.description}
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
                  defaultValue={defaultData.link}
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
                    {langState.linkErr} <br />
                    {APIErrors.link}
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
          {createLoading || editLoading ? (
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
              {props.create ? langState.create : langState.edit}{" "}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupCreationCard;
