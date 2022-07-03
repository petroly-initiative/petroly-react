import { useEffect, useState, useContext } from "react";
import {
  Modal,
  Col,
  CloseButton,
  FormControl,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/evaluation-page/evaluation-modal.module.scss";
import { BsStarFill, BsStar, BsPersonBoundingBox } from "react-icons/bs";
import { FaChalkboardTeacher, FaClipboardCheck } from "react-icons/fa";

import { FaSave, FaInfoCircle } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { HiBookOpen } from "react-icons/hi";
import { MdWarning, MdCancel } from "react-icons/md";
import {
  evaluationCreateMutation,
  evaluationUpdateMutation,
} from "../../api/mutations";
import { getInstructorDetail } from "../../api/queries";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../state-management/user-state/UserContext";
import { USER, L, M, langDirection } from "../../constants";
import { Fade } from "react-awesome-reveal";
import translator from "../../dictionary/components/eval-modal-dict";

export default function EvaluationModal(props) {
  const { user } = useContext(UserContext);
  // modal state

  const [show, setShow] = useState(false);
  // evaluation form state
  // each category is an object with grade and comment attribute
  const [grading, setGrading] = useState({
    rating: props.gradingRating,
    comment: props.gradingCom,
  });
  const [teaching, setTeaching] = useState({
    rating: props.teachingRating,
    comment: props.teachingCom,
  });
  const [person, setPerson] = useState({
    rating: props.personRating,
    comment: props.personCom,
  });
  const [extra, setExtra] = useState({
    term: props.term,
    course: props.course,
  });

  const [validationError, setError] = useState({
    show: false,
    msg: "",
  });

  const [generalComment, setComment] = useState(props.comment);

  const [waiting, setWaiting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isTermInvalid, setTermInvalid] = useState(false);
  const [isCourseInvalid, setCourseInvalid] = useState(false);
  // language state
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const setCourse = (e) => {
    setExtra((state) => ({ term: state.term, course: e.target.value }));

    setCourseInvalid(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
  };
  const setTerm = (e) => {
    setExtra((state) => ({ term: e.target.value, course: state.course }));
    setTermInvalid(!Number.isInteger(parseInt(e.target.value)));
  };

  const gradeRate = (val) => {
    setGrading((state) => ({ rating: val, comment: state.comment }));
  };
  const gradeComment = (e) => {
    setGrading((state) => ({ rating: state.rating, comment: e.target.value }));
  };

  const teachRate = (val) => {
    setTeaching((state) => ({ rating: val, comment: state.comment }));
  };
  const teachComment = (e) => {
    setTeaching((state) => ({ rating: state.rating, comment: e.target.value }));
  };

  const personRate = (val) => {
    setPerson((state) => ({ rating: val, comment: state.comment }));
  };
  const personComment = (e) => {
    setPerson((state) => ({ rating: state.rating, comment: e.target.value }));
  };
  const setGeneralComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  const [
    evaluationCreate,
    {
      data: dataEvaluationCreate,
      loading: loadingEvaluationCreate,
      error: errorEvaluationCreate,
    },
  ] = useMutation(evaluationCreateMutation, {
    notifyOnNetworkStatusChange: true,
    variables: {
      user: user.id,
      instructorId: props.id,
      grading: grading.rating * 20,
      teaching: teaching.rating * 20,
      personality: person.rating * 20,
      gradingComment: grading.comment,
      teachingComment: teaching.comment,
      personalityComment: person.comment,
      course: extra.course,
      term: parseInt(extra.term),
      comment: generalComment,
    },
  });

  const [
    evaluationUpdate,
    { data: dataEvaluationUpdate, loading: loadingEvaluationUpdate },
  ] = useMutation(evaluationUpdateMutation, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      grading: grading.rating * 20,
      teaching: teaching.rating * 20,
      personality: person.rating * 20,
      gradingComment: grading.comment,
      teachingComment: teaching.comment,
      personalityComment: person.comment,
      course: extra.course,
      term: parseInt(extra.term),
      comment: generalComment,
    },
  });

  const fireEval = (e) => {
    var form = document.getElementById("evalForm");
    if (
      extra.term === "" ||
      extra.course === "" ||
      grading.rating === 0 ||
      teaching.rating === 0 ||
      person.rating === 0
    ) {
      setError({
        show: true,
        msg: "الرجاء تعبئة الخانات المطلوبة",
      });
      setValidated(true);
    } else if (isCourseInvalid || isTermInvalid) {
      setError({
        show: true,
        msg: "الرجاء تعبئة الخانات  الإلزامية بالطريقة الصحيحة ",
      });
      setValidated(true);
    } else if (props.edit) {
      setWaiting(true);
      evaluationUpdate();
    } else {
      setWaiting(true);
      evaluationCreate();
    }
  };

  useEffect(() => {
    if (dataEvaluationCreate) {
      if (dataEvaluationCreate.evaluationCreate.pk) {
        setWaiting(false);
        props.close();
        props.handleMsg(true);
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } else if (dataEvaluationUpdate) {
      if (dataEvaluationUpdate.evaluationUpdate.pk) {
        setWaiting(false);
        setTimeout(() => {
          props.close();
          props.handleMsg(true);
          props.refetch();
        }, 400);
      } else {
        setError({ show: true, msg: "Error while updatig" });
      }
    }
  }, [loadingEvaluationCreate, loadingEvaluationUpdate]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          props.close();
          setShow(false);
        }}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        className={styles["modal-container"] + " border-0"}
        scrollable
      >
        <Modal.Header
          className={
            styles.modalHeader +
            " border-0" +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Modal.Title
            className={styles.modalTitle}
            id="example-custom-modal-styling-title"
          >
            {langState.modalHeader}
          </Modal.Title>
          <CloseButton
            onClick={() => {
              props.close();
              setShow(false);
            }}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
          />
        </Modal.Header>
        <Modal.Body
          className={[
            "d-flex flex-column align-items-center",
            styles["body-container"],
            `${user.theme === M.DARK ? styles["dark-mode"] : ""}`,
          ]}
        >
          <section
            style={{ borderBottom: "unset", paddingBottom: 8 }}
            className={styles.sections}
          >
            <div className={styles["info-container"]}>
              <div
                style={{ borderRadius: "35px" }}
                className={
                  styles.instructorPic +
                  " shadow" +
                  ` ${user.theme === M.DARK ? styles["dark-border"] : ""}`
                }
              >
                {props.image}
              </div>
              <div className={styles.instructorInfo}>
                <div
                  className={
                    styles["instructor-name"] +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  {props.name}
                </div>
                <div className={styles["instructor-dept"]}>{props.dept}</div>
              </div>
            </div>
          </section>
          <Alert
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            style={{ textAlign: `${user.lang === L.AR_SA ? "right" : "left"}` }}
            className={styles["rules"]}
            key={0}
            variant="warning"
          >
            <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
            <div>{langState.politeMsg}</div>
          </Alert>
          {validationError.show && (
            <Fade triggerOnce style={{ width: "95%" }} duration="1000">
              <Alert
                style={{ width: "100%" }}
                className={styles["rules"]}
                variant="danger"
              >
                <MdWarning className={styles["rules-icon"]} size="1.4rem" />
                <div>{validationError.msg}</div>
              </Alert>
            </Fade>
          )}
          <Form
            className={styles["evalForm"]}
            id={"evalForm"}
            validated={validated}
          >
            <section
              className={
                styles.sections +
                " shadow-sm" +
                ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
              }
            >
              <div className={styles.headers}>
                <div
                  style={{ color: "#316B83" }}
                  className={
                    styles.titles +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  {langState.infoHeader}{" "}
                  <FaInfoCircle
                    color="#0091e7"
                    className={styles["title-icons"]}
                  />
                </div>
                <div
                  className={
                    styles.descriptions +
                    ` ${user.theme === M.DARK ? styles["dark-subheader"] : ""}`
                  }
                >
                  {langState.infoSubHeader}{" "}
                </div>
              </div>

              <Row className={styles["evaluation-data"]}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Label className={styles["labels"]}>
                    {langState.termSubHeader}{" "}
                  </Form.Label>
                  <InputGroup hasValidation className="mb-4">
                    <InputGroup.Text id="basic-addon1">T</InputGroup.Text>

                    <FormControl
                      type="text"
                      maxLength={3}
                      placeholder="XXX"
                      aria-label="Term"
                      aria-describedby="term-txtarea"
                      value={extra.term}
                      onChange={setTerm}
                      required
                      isInvalid={isTermInvalid}
                      className={` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`}
                    />
                    {isTermInvalid && (
                      <FormControl.Feedback
                        style={langDirection(user.lang)}
                        type="invalid"
                      >
                        {langState.termErr}
                      </FormControl.Feedback>
                    )}
                  </InputGroup>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Label className={styles["labels"]}>
                    {langState.courseSubHeader}{" "}
                  </Form.Label>
                  <InputGroup hasValidation className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <HiBookOpen size="1.5rem" />
                    </InputGroup.Text>

                    <FormControl
                      minLength={5}
                      maxLength={7}
                      placeholder="ABCDXXX"
                      aria-label="Course"
                      aria-describedby="Course-txt-input"
                      value={extra.course}
                      onChange={setCourse}
                      required
                      isInvalid={isCourseInvalid}
                      className={
                        styles["course-input"] +
                        ` ${
                          user.theme === M.DARK ? styles["dark-mode-input"] : ""
                        }`
                      }
                    />
                    {isCourseInvalid && (
                      <FormControl.Feedback
                        style={langDirection(user.lang)}
                        type="invalid"
                      >
                        {langState.courseErr}
                      </FormControl.Feedback>
                    )}
                  </InputGroup>
                </Col>
              </Row>
            </section>
            <section
              className={
                styles.sections +
                " shadow-sm" +
                ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
              }
            >
              <div className={styles.headers}>
                <div
                  style={Object.assign({ color: "#316B83" })}
                  className={
                    styles.titles +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  {langState.gradeHeader}{" "}
                  <FaClipboardCheck
                    color="F037A5"
                    className={styles["title-icons"]}
                  />
                </div>
                <div
                  className={
                    styles.descriptions +
                    ` ${user.theme === M.DARK ? styles["dark-subheader"] : ""}`
                  }
                >
                  {langState.gradeSubHeader}
                </div>
              </div>
              <div className={styles.ratingStars}>
                <div className={styles.stars}>
                  <ReactStars
                    style={langDirection(user.lang)}
                    size={14}
                    count={5}
                    edit={true}
                    emptyIcon={<BsStar />}
                    filledIcon={<BsStarFill />}
                    value={grading.rating}
                    activeColor="#ffd700"
                    onChange={gradeRate}
                  />
                </div>
              </div>

              <InputGroup hasValidation className={styles["input-containers"]}>
                <FormControl
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={langDirection(user.lang)}
                  maxLength="500"
                  className={
                    ` ${
                      user.theme === M.DARK ? styles["dark-mode-input"] : ""
                    } ` + styles["eval-params"]
                  }
                  placeholder={langState.gradePlaceholder}
                  size="sm"
                  as="textarea"
                  value={grading.comment}
                  onChange={gradeComment}
                ></FormControl>
                <Form.Text
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={Object.assign(
                    { fontSize: 12 },
                    langDirection(user.lang)
                  )}
                  muted
                >
                  {langState.limitHelper}
                </Form.Text>
              </InputGroup>
            </section>
            <section
              className={
                styles.sections +
                " shadow-sm" +
                ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
              }
            >
              <div className={styles.headers}>
                <div
                  style={{ color: "#316B83" }}
                  className={
                    styles.titles +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  {langState.teachHeader}{" "}
                  <FaChalkboardTeacher
                    color="#3DB2FF"
                    className={styles["title-icons"]}
                  />
                </div>
                <div
                  className={
                    styles.descriptions +
                    ` ${user.theme === M.DARK ? styles["dark-subheader"] : ""}`
                  }
                >
                  {langState.teachSubHeader}{" "}
                </div>
              </div>
              <div className={styles.ratingStars}>
                <ReactStars
                  style={langDirection(user.lang)}
                  size={14}
                  count={5}
                  edit={true}
                  emptyIcon={<BsStar />}
                  filledIcon={<BsStarFill />}
                  value={teaching.rating}
                  activeColor="#ffd700"
                  onChange={teachRate}
                />
              </div>

              <InputGroup hasValidation className={styles["input-containers"]}>
                <Form.Label></Form.Label>
                <FormControl
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  maxLength="500"
                  className={
                    ` ${
                      user.theme === M.DARK ? styles["dark-mode-input"] : ""
                    } ` + styles["eval-params"]
                  }
                  placeholder={langState.teachPlaceholder}
                  size="sm"
                  as="textarea"
                  value={teaching.comment}
                  onChange={teachComment}
                  style={langDirection(user.lang)}
                ></FormControl>
                <Form.Text
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={Object.assign(
                    { fontSize: 12 },
                    langDirection(user.lang)
                  )}
                  muted
                >
                  {langState.limitHelper}
                </Form.Text>
              </InputGroup>
            </section>
            <section
              className={
                styles.sections +
                " shadow-sm" +
                ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
              }
            >
              <div className={styles.headers}>
                <div
                  style={{ color: "#316B83 " }}
                  className={
                    styles.titles +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  {langState.personHeader}{" "}
                  <BsPersonBoundingBox
                    color="#FF6666"
                    className={styles["title-icons"]}
                  />
                </div>
                <div
                  className={
                    styles.descriptions +
                    ` ${user.theme === M.DARK ? styles["dark-subheader"] : ""}`
                  }
                >
                  {langState.personSubHeader}{" "}
                </div>
              </div>
              <div className={styles.ratingStars}>
                <ReactStars
                  style={langDirection(user.lang)}
                  size={14}
                  count={5}
                  edit={true}
                  emptyIcon={<BsStar />}
                  filledIcon={<BsStarFill />}
                  value={person.rating}
                  activeColor="#ffd700"
                  onChange={personRate}
                />
              </div>

              <InputGroup hasValidation className={styles["input-containers"]}>
                <FormControl
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={langDirection(user.lang)}
                  maxLength="500"
                  className={
                    ` ${
                      user.theme === M.DARK ? styles["dark-mode-input"] : ""
                    } ` + styles["eval-params"]
                  }
                  placeholder={langState.personPlaceholder}
                  as="textarea"
                  size="sm"
                  value={person.comment}
                  onChange={personComment}
                ></FormControl>
                <Form.Text
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={Object.assign(
                    { fontSize: 12 },
                    langDirection(user.lang)
                  )}
                  muted
                >
                  {langState.limitHelper}
                </Form.Text>
              </InputGroup>
            </section>
            <section
              className={
                styles.sections +
                " shadow-sm" +
                ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
              }
            >
              <div className={styles.headers}>
                <div
                  style={{ color: "#316B83" }}
                  className={
                    styles.titles +
                    ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                  }
                >
                  {langState.commentHeader}
                </div>
              </div>

              <InputGroup hasValidation className={styles["input-containers"]}>
                <FormControl
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={langDirection(user.lang)}
                  maxLength="160"
                  className={
                    ` ${
                      user.theme === M.DARK ? styles["dark-mode-input"] : ""
                    } ` + styles["eval-params"]
                  }
                  placeholder={langState.commentPlaceholder}
                  as="textarea"
                  size="sm"
                  value={generalComment}
                  onChange={setGeneralComment}
                ></FormControl>
                <Form.Text
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  style={Object.assign(
                    { fontSize: 12 },
                    langDirection(user.lang)
                  )}
                  muted
                >
                  {langState.limitHelper}
                </Form.Text>
              </InputGroup>
            </section>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className={
            styles["modal-footer"] +
            ` ${user.theme === M.DARK ? styles["dark-footer"] : ""}`
          }
        >
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2">{langState.cancelHover}</Tooltip>
            }
          >
            <Button
              id="create-group-btn"
              onClick={props.close}
              className={[styles["btns"], styles["cancel-btn"]]}
            >
              <MdCancel size="1.2rem" /> {langState.cancelHover}
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2"> {langState.submitHover}</Tooltip>
            }
          >
            {waiting ? (
              <Button
                onClick={fireEval}
                className={[styles["btns"], styles["submit-btn"]]}
              >
                <Spinner animation="border" role="status" />
              </Button>
            ) : (
              <Button
                onClick={fireEval}
                className={[styles["btns"], styles["submit-btn"]]}
              >
                <FaSave size="1.2rem" /> {langState.submitHover}
              </Button>
            )}
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}
