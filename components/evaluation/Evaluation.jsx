import { Card, Tooltip, OverlayTrigger, Col } from "react-bootstrap";
import styles from "../../styles/evaluation-page/evaluation-card.module.scss";
import { BsStar, BsStarFill, BsPersonBoundingBox } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { useEffect, useContext, useState } from "react";
import { FaChalkboardTeacher, FaClipboardCheck } from "react-icons/fa";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/eval-card-dict";
import { langDirection, M, L } from "../../constants";

export default function Evaluation(props) {
  // const overall = Math.ceil(
  //   (props.rating
  //     .map((rate) => parseInt(rate.split("_")[1]))
  //     .reduce((a, b) => a + b, 0) /
  //     3) *
  //     20
  // );

  // const colorFilter = (value) => {
  //   if (value >= 4) return "#74fffb";
  //   else if (value >= 3) return "#65ffc9";
  //   else if (value >= 2) return "#FAC218";
  //   else return "#f76a9b";
  // };

  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  return (
    <Card
      className={
        styles.feedback_container +
        " shadow" +
        ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
      }
    >
      <Card.Header
        className={
          styles.cardHeader +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <div className={styles.tags}>
          {props.course !== "" && (
            <OverlayTrigger
              placement="top"
              delay={{ show: 0, hide: 50 }}
              overlay={
                <Tooltip id="button-tooltip-2">{langState.course}</Tooltip>
              }
            >
              <div id="course_tag" className={styles.course}>
                {props.course}
              </div>
            </OverlayTrigger>
          )}
          {props.term !== null && (
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
      <Card.Body
        className={
          styles["card-body"] +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <section
          className={
            styles["sections"] +
            ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
          }
          id="grading"
        >
          {/* ERR: COLOR IS SPECIFIED LOCALLY */}
          <div
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            style={langDirection(user.lang)}
            className={styles.headers}
          >
            <span>{langState.grades}</span>
            <FaClipboardCheck
              style={{ color: "#F037A5" }}
              className={styles["section-icon"]}
            />
          </div>
          {props.grading !== "" && (
            <p
              className={
                styles.contentText +
                ` ${user.theme === M.DARK ? styles["dark-extra"] : ""}`
              }
            >
              {props.grading}
            </p>
          )}
          <div className={styles.stars}>
            <ReactStars
              size={20}
              count={5}
              edit={false}
              emptyIcon={<BsStar />}
              filledIcon={<BsStarFill />}
              value={parseInt(props.rating[0].split("_")[1]) / 20}
              activeColor="#ffd700"
            />
          </div>
        </section>
        <section
          className={
            styles["sections"] +
            ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
          }
          id="teaching"
        >
          <div
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            style={langDirection(user.lang)}
            className={styles.headers}
          >
            <span>{langState.teaching}</span>
            <FaChalkboardTeacher
              style={{ color: "#3DB2FF" }}
              className={styles["section-icon"]}
            />
          </div>
          {props.teaching !== "" && (
            <p
              className={
                styles.contentText +
                ` ${user.theme === M.DARK ? styles["dark-extra"] : ""}`
              }
            >
              {props.teaching}
            </p>
          )}
          <div className={styles.stars}>
            <ReactStars
              size={20}
              count={5}
              edit={false}
              emptyIcon={<BsStar />}
              filledIcon={<BsStarFill />}
              value={parseInt(props.rating[1].split("_")[1]) / 20}
              activeColor="#ffd700"
            />
          </div>
        </section>
        <section
          className={
            styles["sections"] +
            ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
          }
          id="personality"
        >
          <div
            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
            style={langDirection(user.lang)}
            className={styles.headers}
          >
            <span>{langState.person}</span>
            <BsPersonBoundingBox
              style={{ color: "#FF6666" }}
              className={styles["section-icon"]}
            />
          </div>
          {props.personality !== "" && (
            <p
              className={
                styles.contentText +
                ` ${user.theme === M.DARK ? styles["dark-extra"] : ""}`
              }
            >
              {props.personality}
            </p>
          )}
          <div className={styles.stars}>
            <ReactStars
              size={20}
              count={5}
              edit={false}
              emptyIcon={<BsStar />}
              filledIcon={<BsStarFill />}
              value={parseInt(props.rating[2].split("_")[1]) / 20}
              activeColor="#ffd700"
            />
          </div>
        </section>
        {props.comment !== "" && (
          <section
            className={
              styles["sections"] +
              ` ${user.theme === M.DARK ? styles["dark-section"] : ""}`
            }
            id="general"
          >
            <div
              dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
              style={langDirection(user.lang)}
              className={
                styles.headers +
                ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
              }
            >
              {langState.comment}
            </div>
            <p
              className={
                styles.contentText +
                ` ${user.theme === M.DARK ? styles["dark-extra"] : ""}`
              }
            >
              {props.comment}
            </p>
          </section>
        )}
      </Card.Body>
    </Card>
  );
}
