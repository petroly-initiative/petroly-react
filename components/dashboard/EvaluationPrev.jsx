import { Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/dashboard-page/eval-tab.module.scss";
import { BsStarFill, BsStar } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import Image from "next/dist/client/image";
import EvaluationModal from "../evaluation/EvaluationModal";
import { useState } from "react";
import { indexOf } from "lodash";
/**
 *
 * ? Evaluation preview setup
 * - Each card will trigger the previously created signInModal with populated parameters
 * - the edit icon will show up at the edge but users can click the whole card to edit
 */

/**
 *
 * @param  props:data: {
 *  overall-rating,
 *  name,
 * pic,
 * department
 * }
 * @returns
 */

export default function EvaluationPreview(props) {
  const [modalVisible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const launchModal = () => {
    setVisible(true);
  };


    return (
      <>
        <Card onClick={launchModal} className={styles["card-body"] + " shadow"}>
          <MdModeEdit size="1.2rem" className={styles["edit-icon"]} />
          {/* img + name + dept container */}
          <div className={styles["instructor-info"]}>
            <div className={styles["pic-border"] + " shadow"}>
              <Image
                width="80"
                height="80"
                className={styles["profile-pic"]}
                src={props.pic}
              />
            </div>
            <div className={styles["instructor-name"]}>{props.name}</div>
            <div className={styles["instructor-dept"]}>{props.dept}</div>
          </div>
          {/* eval stars container */}
          <div className={styles["rate-container"]}>
            <ReactStars
              size={14}
              count={5}
              edit={false}
              emptyIcon={<BsStar />}
              filledIcon={<BsStarFill />}
              value={props.overall}
              activeColor="#ffd700"
            />
          </div>
        </Card>
        <EvaluationModal
          comments={["aaaaa", "bbbbb", "cccccc"]}
          rates={(4, 2, 3)}
          name={"data.instructor.name"}
          id={"data.instructor.id"}
          image={
            <Image
              width="80"
              height="80"
              className={styles["profile-pic"]}
              src={props.data.profilePic}
            />
          }
          dept={"data"}
          close={closeModal}
          visible={modalVisible}
          gradingRating={props.gradingRating}
          gradingCom={props.gradingCom}
          teachingRating={props.teachingRating}
          teachingCom={props.teachingCom}
          personRating={props.personRating}
          personCom={props.personCom}
          term={props.term}
          course={props.course}
        />
      </>
    );
}
