import { Card, Tooltip, OverlayTrigger, Col } from "react-bootstrap";
import styles from "../../styles/evaluation-page/evaluation-card.module.scss";
import { BsStar, BsStarFill, BsPersonBoundingBox } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import { FaChalkboardTeacher, FaClipboardCheck } from "react-icons/fa";
export default function Evaluation(props) {
  // const overall = Math.ceil(
  //   (props.rating
  //     .map((rate) => parseInt(rate.split("_")[1]))
  //     .reduce((a, b) => a + b, 0) /
  //     3) *
  //     20
  // );

  const colorFilter = (value) => {
    if (value >= 4) return "#74fffb";
    else if (value >= 3) return "#65ffc9";
    else if (value >= 2) return "#FAC218";
    else return "#f76a9b";
  };



  return (
    <>
      <Card className={styles.feedback_container + " shadow"}>
        <Card.Header className={styles.cardHeader}>
          <div className={styles.tags}>
            {props.course !== "" && (
              <OverlayTrigger
                placement="top"
                delay={{ show: 0, hide: 50 }}
                overlay={
                  <Tooltip id="button-tooltip-2">المادة الدراسية</Tooltip>
                }
              >
                <div id="course_tag" className={styles.course}>
                  {props.course}
                </div>
              </OverlayTrigger>
            )}
            {props.term !== "" && (
              <OverlayTrigger
                placement="top"
                delay={{ show: 0, hide: 50 }}
                overlay={<Tooltip id="button-tooltip-2">الفصل الدراسي</Tooltip>}
              >
                <div id="term_tag" className={styles.term}>
                  {"T" + props.term}
                </div>
              </OverlayTrigger>
            )}
          </div>
         
            <div className={styles.dates}>{props.date}</div>
         
        </Card.Header>
        <Card.Body className={styles["card-body"]}>
          <section
            style={{ color: "#F037A5" }}
            className={styles["sections"]}
            id="grading"
          >
            <div className={styles.headers}>
              الدرجات
              <FaClipboardCheck className={styles["section-icon"]} />
            </div>
            <p className={styles.contentText}>{props.grading}</p>
            <div className={styles.stars}>
              <ReactStars
                size={20}
                count={5}
                edit={false}
                edit={false}
                emptyIcon={<BsStar />}
                filledIcon={<BsStarFill />}
                value={parseInt(props.rating[0].split("_")[1]) / 20}
                activeColor="#ffd700"
              />
            </div>
          </section>
          <section
            style={{ color: "#3DB2FF" }}
            className={styles["sections"]}
            id="teaching"
          >
            <div className={styles.headers}>
              التدريس
              <FaChalkboardTeacher className={styles["section-icon"]} />
            </div>
            <p className={styles.contentText}>{props.teaching}</p>
            <div className={styles.stars}>
              <ReactStars
                size={20}
                count={5}
                edit={false}
                edit={false}
                emptyIcon={<BsStar />}
                filledIcon={<BsStarFill />}
                value={parseInt(props.rating[1].split("_")[1]) / 20}
                activeColor="#ffd700"
              />
            </div>
          </section>
          <section
            style={{ color: "#FF6666" }}
            className={styles["sections"]}
            id="personality"
          >
            <div className={styles.headers}>
              الشخصية
              <BsPersonBoundingBox className={styles["section-icon"]} />
            </div>
            <p className={styles.contentText}>{props.personality}</p>
            <div className={styles.stars}>
              <ReactStars
                size={20}
                count={5}
                edit={false}
                edit={false}
                emptyIcon={<BsStar />}
                filledIcon={<BsStarFill />}
                value={parseInt(props.rating[2].split("_")[1]) / 20}
                activeColor="#ffd700"
              />
            </div>
          </section>
        </Card.Body>
      </Card>
    </>
  );
}
