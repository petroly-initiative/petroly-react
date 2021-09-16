import {
  useEffect,
  useReducer,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  Modal,
  Col,
  FormControl,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/evaluation-page/evaluation-modal.module.scss";
import { BsStarFill, BsStar, BsPersonBoundingBox } from "react-icons/bs";
import { FaChalkboardTeacher, FaClipboardCheck } from "react-icons/fa";
import { Image } from "next/dist/client/image";
import { FaSave } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { HiBookOpen } from "react-icons/hi";
import { MdWarning, MdCancel } from "react-icons/md";
import { evalReducer } from "../../state-management/evaluation-state/evaluationReducer";
import { evaluationCreateMutation } from "../../api/mutations";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../state-management/user-state/UserContext";
import { USER } from "../../constants";
import { Fade } from "react-awesome-reveal";
/**
 * TODO: State management for every form control
 * - creating a reducer to handle the evaluation request
 * - validation system for the suer input
 */
export default function EvaluationModal(props) {
  const userContext = useContext(UserContext);
  // modal state
  const [submissionState, dispatch] = useReducer(evalReducer, {
    sucess: false,
  });
  const [show, setShow] = useState(false);
  // evaluation form state
  // each category is an object with grade and comment attribute
  const [grading, setGrading] = useState({
    rating: 0,
    comment: "",
  });
  const [teaching, setTeaching] = useState({
    rating: 0,
    comment: "",
  });
  const [person, setPerson] = useState({
    rating: 0,
    comment: "",
  });
  const [extra, setExtra] = useState({
    term: "",
    course: "",
  });

  const [validationError, setError] = useState({
    show: false,
    msg: "",
  });

  const [waiting, setWaiting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isTermInvalid, setTermInvalid] = useState(false);
  const [isCourseInvalid, setCourseInvalid] = useState(false);

  const setCourse = (e) => {
    setExtra((state) => ({ term: state.term, course: e.target.value }));
    if (/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value)) {
      setCourseInvalid(false);
    } else setCourseInvalid(true);
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
      username: userContext.user.username,
      instructorId: props.id,
      grading: "A_" + String(grading.rating * 20),
      teaching: "A_" + String(teaching.rating * 20),
      personality: "A_" + String(person.rating * 20),
      course: extra.course,
      comment: "",
    },
  });

  const fireEval = (e) => {
    var form = document.getElementById("evalForm");
    if (
      extra.term === "" ||
      extra.course === "" ||
      grading.comment === "" ||
      teaching.comment === "" ||
      person.comment === ""
    ) {
      setError({
        show: true,
        msg: "الرجاء تعبئة الخانات المطلوبة لتسجيل الدخول",
      });
      setValidated(true);
    } else evaluationCreate();
  };

  useEffect(() => {
    if (submissionState.sucess) props.close();
  }, [submissionState]);

  useEffect(() => {
    if (dataEvaluationCreate) {
      console.log(dataEvaluationCreate);
      if (dataEvaluationCreate.evaluationCreate.ok) {
        setWaiting(true);
        setTimeout(() => location.reload(), 1900);
      }
    }
  }, [loadingEvaluationCreate]);

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
        <Modal.Header className={styles.modalHeader + " border-0"} closeButton>
          <Modal.Title
            className={styles.modalTitle}
            id="example-custom-modal-styling-title"
          >
            استمارة التقييم
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={[
            "d-flex flex-column align-items-center",
            styles["body-container"],
          ]}
        >
          <section
            style={{ borderBottom: "unset", paddingBottom: 8 }}
            className={styles.sections}
          >
            <div className={styles["info-container"]}>
              <div
                style={{ borderRadius: "35px" }}
                className={styles.instructorPic + " shadow-sm"}
              >
                {props.image}
              </div>
              <div className={styles.instructorInfo}>
                <div className={styles["instructor-name"]}>{props.name}</div>
                <div className={styles["instructor-dept"]}>{props.dept}</div>
              </div>
            </div>
          </section>
          <Alert className={styles["rules"]} key={0} variant="warning">
            <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
            <div>
              نرجو عدم استخدام الألفاظ النابية تجاه أساتذتنا الكرام في استمارة
              التقييم
            </div>
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
            <section className={styles.sections + " shadow-sm"}>
              <div className={styles.headers}>
                <div className={styles.titles}>معلومات التقييم</div>
                <div className={styles.descriptions}>
                  معلومات ضرورية للاستفادة القصوى من تقييمك
                </div>
              </div>

              <Form.Row className={styles["evaluation-data"]}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Label className={styles["labels"]}>
                    الفصل الدراسي
                  </Form.Label>
                  <InputGroup hasValidation className="mb-4">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">T</InputGroup.Text>
                    </InputGroup.Prepend>
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
                    />
                    <FormControl.Feedback
                      style={{ textAlign: "right" }}
                      type="invalid"
                    >
                      الرجاء استخدام 3 أرقام فقط
                    </FormControl.Feedback>
                  </InputGroup>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Label className={styles["labels"]}>
                    المادة الدراسية
                  </Form.Label>
                  <InputGroup hasValidation className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <HiBookOpen size="1.5rem" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
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
                      className={styles["course-input"]}
                    />
                    <FormControl.Feedback
                      style={{ textAlign: "right" }}
                      type="invalid"
                    >
                      ABCDXXX :الرجاء كتابة اسم المدة الدراسية كالآتي
                    </FormControl.Feedback>
                  </InputGroup>
                </Col>
              </Form.Row>
            </section>
            <section className={styles.sections + " shadow-sm"}>
              <div className={styles.headers}>
                <div style={{ color: "#F037A5" }} className={styles.titles}>
                  التصحيح والدرجات
                  <FaClipboardCheck className={styles["title-icons"]} />
                </div>
                <div className={styles.descriptions}>
                  شفافية التصحيح والالتزام بمعايير محددة للدرجات
                </div>
              </div>
              <div className={styles.ratingStars}>
                <div className={styles.stars}>
                  <ReactStars
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
                  maxLength="160"
                  className={styles["comments"]}
                  placeholder={"اكتب تعليقك عن تصحيح المحاضِر"}
                  size="sm"
                  as="textarea"
                  value={grading.comment}
                  onChange={gradeComment}
                  required
                ></FormControl>
              </InputGroup>
            </section>
            <section className={styles.sections + " shadow-sm"}>
              <div className={styles.headers}>
                <div style={{ color: "#3DB2FF" }} className={styles.titles}>
                  التدريس
                  <FaChalkboardTeacher className={styles["title-icons"]} />
                </div>
                <div className={styles.descriptions}>
                  سهولة إيصال المعلومة و فهم المنهج{" "}
                </div>
              </div>
              <div className={styles.ratingStars}>
                <ReactStars
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
                  maxLength="160"
                  className={styles["comments"]}
                  placeholder={"اكتب تعليقك عن تدريس المحاضِر"}
                  size="sm"
                  as="textarea"
                  value={teaching.comment}
                  onChange={teachComment}
                  required
                ></FormControl>
              </InputGroup>
            </section>
            <section className={styles.sections + " shadow-sm"}>
              <div className={styles.headers}>
                <div style={{ color: "#FF6666" }} className={styles.titles}>
                  الشخصية
                  <BsPersonBoundingBox className={styles["title-icons"]} />
                </div>
                <div className={styles.descriptions}>
                  المزاج العام والتعامل مع الطلاب
                </div>
              </div>
              <div className={styles.ratingStars}>
                <ReactStars
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
                  maxLength="160"
                  className={styles["comments"]}
                  placeholder={"اكتب تعليقك عن شخصية المحاضِر"}
                  as="textarea"
                  size="sm"
                  value={person.comment}
                  onChange={personComment}
                  required
                ></FormControl>
              </InputGroup>
            </section>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles["modal-footer"]}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={<Tooltip id="button-tooltip-2">حذف التقييم</Tooltip>}
          >
            <Button
              onClick={props.close}
              className={[styles["btns"], styles["cancel-btn"]]}
            >
              <MdCancel size="2rem" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={<Tooltip id="button-tooltip-2">تسليم التقييم</Tooltip>}
          >
            {waiting ? (
              <Spinner animation="border" role="status" />
            ) : (
              <Button
                onClick={fireEval}
                className={[styles["btns"], styles["submit-btn"]]}
              >
                <FaSave size="2rem" />
              </Button>
            )}
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}
