import { useEffect, useState } from "react";
import { Modal, Col, FormControl, Form, Button, OverlayTrigger, Tooltip, InputGroup, Alert } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/evaluation-page/evaluation-modal.module.scss";
import { BsStarFill, BsStar } from "react-icons/bs";
import { Image } from "next/dist/client/image";
import { FaSave, FaCommentAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im"
import { BiInfoCircle} from "react-icons/bi";
import { HiBookOpen} from "react-icons/hi";

export default function EvaluationModal(props) {

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  const submitEvaluation = () => {
    /* Submit all forms and sned it in a query */
  }

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
          <Alert className={styles["rules"]} key={0} variant="primary">
            <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
            <div>
              نرجو عدم استخدام الألفاظ النابية تجاه أساتذتنا الكرام في استمارة
              التقييم
            </div>
          </Alert>
          <section className={styles.sections}>
            <div className={styles.headers}>
              <div className={styles.titles}>معلومات التقييم</div>
              <div className={styles.descriptions}>
                معلومات ضرورية للاستفادة القصوى من تقييمك
              </div>
            </div>
            <Form>
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
                      maxLength={3}
                      placeholder="XXX"
                      aria-label="Term"
                      aria-describedby="term-txtarea"
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
                      maxLength={7}
                      placeholder="ABCDXXX"
                      aria-label="Course"
                      aria-describedby="Course-txt-input"
                    />
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form>
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
                  value={props.starValue}
                  activeColor="#ffd700"
                />
              </div>
            </div>
            <Form>
              <InputGroup className={styles["input-containers"]}>
                <FormControl
                  maxLength="160"
                  className={styles["comments"]}
                  placeholder={"اكتب تعليقك عن تصحيح المحاضِر"}
                  size="sm"
                  as="textarea"
                ></FormControl>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FaCommentAlt />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
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
                value={props.starValue}
                activeColor="#ffd700"
              />
            </div>
            <Form>
              <InputGroup className={styles["input-containers"]}>
                <Form.Label></Form.Label>
                <FormControl
                  maxLength="160"
                  className={styles["comments"]}
                  placeholder={"اكتب تعليقك عن تدريس المحاضِر"}
                  size="sm"
                  as="textarea"
                ></FormControl>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FaCommentAlt />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
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
                value={props.starValue}
                activeColor="#ffd700"
              />
            </div>
            <Form>
              <InputGroup className={styles["input-containers"]}>
                <FormControl
                  maxLength="160"
                  className={styles["comments"]}
                  placeholder={"اكتب تعليقك عن شخصية المحاضِر"}
                  as="textarea"
                  size="sm"
                ></FormControl>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FaCommentAlt />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
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
            <Button className={[styles["btns"], styles["submit-btn"]]}>
              <FaSave size="1.7rem" />
            </Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}
