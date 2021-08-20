import { useEffect, useReducer, useState } from "react";
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
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/evaluation-page/evaluation-modal.module.scss";
import { BsStarFill, BsStar } from "react-icons/bs";
import { Image } from "next/dist/client/image";
import { FaSave, FaCommentAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { BiInfoCircle } from "react-icons/bi";
import { HiBookOpen } from "react-icons/hi";
import { evalReducer } from "../../state-management/evaluation-state/evaluationReducer";
/**
 * TODO: State management for every form control
 * - creating a reducer to handle the evaluation request
 * - state hooks for each form control and react stars' value component
 * - evaluation submission for gathering user input from different forms
 */
export default function EvaluationModal(props) {
  // modal state
  const [submissionState, dispatch] = useReducer(evalReducer, {sucess: false})
  const [show, setShow] = useState(false);
  // evaluation form state
  // each category is an object with grade and comment attribute
  const [grading, setGrading] = useState({
    rating: 0,
    comment: ""
  });
  const [teaching, setTeaching] = useState({
    rating: 0,
    comment: ""
  });
  const [person, setPerson] = useState({
    rating: 0, 
    comment: ""
  });
  const [extra, setExtra] = useState({
    term: "",
    course: ""
  })

  const setCourse = (e) => {
    setExtra(state => ({term: state.term, course: e.target.value}))
  }
  const setTerm = (e) => {
    setExtra((state) => ({term: e.target.value, course: state.course}));
  };

  const gradeRate = (val) => {
    setGrading(state => ({rating: val, comment: state.comment}))
  }
  const gradeComment = (e) => {
    setGrading(state => ({rating: state.rating, comment: e.target.value}))
  }

  const teachRate = (val) => {
    setTeaching(state => ({rating: val, comment: state.comment}))
  }
  const teachComment = (e) => {
    setTeaching(state => ({rating: state.rating, comment: e.target.value}))
  }

    const personRate = (val) => {
    setPerson(state => ({rating: val, comment: state.comment}))
  }
  const personComment = (e) => {
    setPerson(state => ({rating: state.rating, comment: e.target.value}))
  }


  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  const submitEvaluation = async (e) => {
    /* Submit all forms and sned it in a query */
    e.preventDefault();
    var dataFormat = {
      context: extra,
      grading: grading,
      teaching: teaching,
      personality: person
    }

    await dispatch({
      type: "send",
      content: dataFormat
    })

    console.log("Done")

  };

  useEffect(() => {
    if(submissionState.sucess)
    props.close()
  }, [submissionState])

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
          <section className={styles.sections}>
            <div className={styles["info-container"]}>
              <div className={styles.instructorPic}>{props.image}</div>
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
          <Alert className={styles["rules"]} key={0} variant="primary">
            <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
            <div>تعبئة الحقول الكتابية غير إلزامي لإكمال استمارة التقييم</div>
          </Alert>
          <Form onSubmit={submitEvaluation}></Form>
          <section className={styles.sections}>
            <div className={styles.headers}>
              <div className={styles.titles}>معلومات التقييم</div>
              <div className={styles.descriptions}>
                معلومات ضرورية للاستفادة القصوى من تقييمك
              </div>
            </div>

            <Form.Row className={styles["evaluation-data"]}>
              <Col xs={12} sm={6}>
                <Form.Label className={styles["labels"]}>
                  الفصل الدراسي
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">T</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    minLength={3}
                    maxLength={3}
                    placeholder="XXX"
                    aria-label="Term"
                    aria-describedby="term-txtarea"
                    value = {extra.term}
                    onChange ={setTerm}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Label className={styles["labels"]}>
                  المادة الدراسية
                </Form.Label>
                <InputGroup className="mb-3">
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
                    value = {extra.course}
                    onChange = {setCourse}
                  />
                </InputGroup>
              </Col>
            </Form.Row>
          </section>
          <section className={styles.sections}>
            <div className={styles.headers}>
              <div className={styles.titles}>التصحيح والدرجات</div>
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
                  onChange = {gradeRate}
                />
              </div>
            </div>

            <InputGroup className={styles["input-containers"]}>
              <FormControl
                maxLength="160"
                className={styles["comments"]}
                placeholder={"اكتب تعليقك عن تصحيح المحاضِر"}
                size="sm"
                as="textarea"
                value = {grading.comment}
                onChange={gradeComment}
              ></FormControl>
              <InputGroup.Append>
                <InputGroup.Text>
                  <FaCommentAlt />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </section>
          <section className={styles.sections}>
            <div className={styles.headers}>
              <div className={styles.titles}>التدريس</div>
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

            <InputGroup className={styles["input-containers"]}>
              <Form.Label></Form.Label>
              <FormControl
                maxLength="160"
                className={styles["comments"]}
                placeholder={"اكتب تعليقك عن تدريس المحاضِر"}
                size="sm"
                as="textarea"
                value = {teaching.comment}
                onChange={teachComment}
              ></FormControl>
              <InputGroup.Append>
                <InputGroup.Text>
                  <FaCommentAlt />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </section>
          <section className={styles.sections}>
            <div className={styles.headers}>
              <div className={styles.titles}>الشخصية</div>
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

            <InputGroup className={styles["input-containers"]}>
              <FormControl
                maxLength="160"
                className={styles["comments"]}
                placeholder={"اكتب تعليقك عن شخصية المحاضِر"}
                as="textarea"
                size="sm"
                value = {person.comment}
                onChange={personComment}
              ></FormControl>
              <InputGroup.Append>
                <InputGroup.Text>
                  <FaCommentAlt />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </section>
        </Modal.Body>
        <Modal.Footer className={styles["modal-footer"]}>
          <OverlayTrigger
            onClick={submitEvaluation}
            placement="top"
            delay={{ show: 500, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-2">حذف التقييم</Tooltip>}
          >
            <Button
              onClick={props.close}
              className={[styles["btns"], styles["cancel-btn"]]}
            >
              <ImCancelCircle size="1.7rem" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            onClick={submitEvaluation}
            placement="top"
            delay={{ show: 500, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-2">تسليم التقييم</Tooltip>}
          >
            <Button onClick={submitEvaluation} type="submit" className={[styles["btns"], styles["submit-btn"]]}>
              <FaSave size="1.7rem" />
            </Button>
          </OverlayTrigger>
          <Form />
        </Modal.Footer>
      </Modal>
    </>
  );
}
