import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/dashboard-page/eval-tab.module.scss";
import { BsStarFill, BsStar } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import EvaluationModal from "../evaluation/EvaluationModal";
import { useState, useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { M } from "../../constants";
/**
 *
 * ? Evaluation preview setup
 * - Each card will trigger the previously created signInModal with populated parameters
 * - the edit icon will show up at the edge but users can click the whole card to edit
 */

/**
 *
 * @param  props:data: {
 * }
 * @returns
 */

export default function EvaluationPreview(props) {
  const { user } = useContext(UserContext);
  const [modalVisible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const launchModal = () => {
    setVisible(true);
  };

  return (
    <>
      <Card
        onClick={launchModal}
        className={
          styles["card-body"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-card"] : ""}`
        }
      >
        <MdModeEdit size="1.2rem" className={styles["edit-icon"]} />
        {/* img + name + dept container */}
        <div className={styles["instructor-info"]}>
          <div className={styles["pic-border"] + " shadow"}>
            <Image
              width="80"
              height="80"
              className={styles["profile-pic"]}
              src={props.instructor.profilePic}
            />
          </div>
          <div className={styles["instructor-name"]}>
            {props.instructor.name}
          </div>
          <div
            className={
              styles["instructor-dept"] +
              ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
            }
          >
            {props.instructor.department}
          </div>
        </div>
        {/* eval stars container */}
        <div className={styles["rate-container"]}>
          <ReactStars
            size={14}
            count={5}
            edit={false}
            emptyIcon={<BsStar />}
            filledIcon={<BsStarFill />}
            value={Math.round(
              (props.evaluation.grading / 20 +
                props.evaluation.teaching / 20 +
                props.evaluation.personality / 20) /
                3
            )}
            activeColor="#ffd700"
          />
        </div>
      </Card>
      <EvaluationModal
        refetch={props.refetch}
        name={props.instructor.name}
        id={props.evaluation.pk}
        image={
          <Image
            width="80"
            height="80"
            className={styles["profile-pic"]}
            src={props.instructor.profilePic}
          />
        }
        dept={props.instructor.department}
        close={closeModal}
        visible={modalVisible}
        gradingRating={props.evaluation.grading / 20}
        gradingCom={props.evaluation.gradingComment}
        teachingRating={props.evaluation.teaching / 20}
        teachingCom={props.evaluation.teachingComment}
        personRating={props.evaluation.personality / 20}
        personCom={props.evaluation.personalityComment}
        comment={props.evaluation.comment}
        term={props.evaluation.term}
        course={props.evaluation.course}
        edit={true} // To indicate this isn't new eval
        handleMsg={props.handleMsg}
      />
    </>
  );
}
