import React from "react";
import { Row, Col, ProgressBar, Container } from "react-bootstrap";
import styles from "../../styles/evaluation-page/instructor-rating.module.scss";
function InstructorRates(props) {
  const colorFilter = (value) => {
    if (value >= 4) return "#04F9F2";
    else if (value >= 3) return "#00E091";
    else if (value >= 2) return "#FAC218";
    else if (value >= 1) return "#FF7600";
    else return "#F51663";
  };

  const barFilter = (value) => {
    if (value >= 4) return styles.grading_blue;
    else if (value >= 3) return styles.grading_green;
    else if (value >= 2) return styles.grading_yellow;
    else if (value >= 1) return styles.grading_orange;
    else return styles.grading_red;
  };

  const format = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  /**
   * Create a custom coloring function for each bar and the overall rating
   */
  return (
    <Container className={styles.statsBody}>
      <div id="overall-section" className={styles.ovrSection}>
        <div
          style={{
            boxShadow: `0 0 20px ${colorFilter(
              props.overall
            )}, 0 0 10px rgba(0, 0, 0, 0.13)`,
          }}
          id="overall-container"
          className={styles.ovrcontainer}
        >
          <div
            style={{
              boxShadow: `0 0 40px ${colorFilter(
                props.overall
              )}`,
            }}
            id="num-display"
            className={styles.ovrDisplay}
          >
            <div
              style={{ color: colorFilter(props.overall) }}
              id="overall-score"
              className={styles.score}
            >
              {format(props.overall, 1)}
            </div>
            <div id="divider" className={styles.divider}></div>
            <div id="full-score" className={styles.ovrFull}>
              5
            </div>
          </div>
        </div>
      </div>
      <div id="attrBars" className={styles.attrBars}>
        <div className={styles.barContainer}>
          <div className={styles.barHeaders}>الدرجات والتصحيح</div>
          <div className={styles.barValue}>
            <ProgressBar
              id="grading"
              className={[styles.bars, barFilter(props.grading)]}
              color={"blue"}
              now={(props.grading / 5) * 100}
            />
          </div>
        </div>
        <div className={styles.barContainer}>
          <div className={styles.barHeaders}>التدريس</div>
          <div className={styles.barValue}>
            <ProgressBar
              className={[styles.bars, barFilter(props.teaching)]}
              now={(props.teaching / 5) * 100}
            />
          </div>
        </div>
        <div className={styles.barContainer}>
          <div className={styles.barHeaders}>الشخصية</div>
          <div className={styles.barValue}>
            <ProgressBar
              className={[styles.bars, barFilter(props.personality)]}
              now={(props.personality / 5) * 100}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default InstructorRates;
