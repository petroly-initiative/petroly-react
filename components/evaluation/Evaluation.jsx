import {Card, Tooltip, OverlayTrigger} from 'react-bootstrap';
import styles from "../../styles/evaluation-page/evaluation-card.module.scss";
import { BsStar, BsStarFill } from 'react-icons/bs';
import ReactStars from "react-rating-stars-component";

export default function Evaluation(props){
    return (
      <>
        <Card className={styles.feedback_container}>
          <Card.Header className={styles.cardHeader}>
            <div className={styles.tags}>
              {props.course !== undefined && (
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
              {props.term !== undefined && (
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 0, hide: 50 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">الفصل الدراسي</Tooltip>
                  }
                >
                  <div id="term_tag" className={styles.term}>
                    {"T" + props.term}
                  </div>
                </OverlayTrigger>
              )}
            </div>
            <div className={styles.dates}>{props.date}</div>
          </Card.Header>
          <Card.Body>
            <section id="grading">
              <div className={styles.headers}>الدرجات</div>
              <p className={styles.contentText}>{props.grading}</p>
            </section>
            <section id="teaching">
              <div className={styles.headers}>التدريس</div>
              <p className={styles.contentText}>{props.teaching}</p>
            </section>
            <section id="personality">
              <div className={styles.headers}>الشخصية</div>
              <p className={styles.contentText}>{props.personality}</p>
            </section>
            <section>
              <div className={styles.stars}>
                <ReactStars
                  size={20}
                  count={5}
                  edit={false}
                  edit={false}
                  emptyIcon={<BsStar />}
                  filledIcon={<BsStarFill />}
                  value={props.rating}
                  activeColor="#ffd700"
                />
              </div>
            </section>
          </Card.Body>
        </Card>
      </>
    );
}