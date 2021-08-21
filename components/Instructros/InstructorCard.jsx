import React from "react";
import { Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { BsStarFill, BsStar } from "react-icons/bs";
import { MdFolderSpecial } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/evaluation-page/instructors-card.module.scss";

/**
 * TODO: Create an overlay for evaluation numbers
 */
function InstructorCard(props) {
  const colors = [
    "rgb(235, 24, 122)",
    "rgb(9, 248, 236)",
    "rgb(9, 248, 236)",
    "rgb(255 125 48)",
  ];

  const randomColor = () => {
    return (
      colors[Math.floor(Math.random() * colors.length)] +
      ' url("/images/background.svg")'
    );
  };
  return (
    
      
        <Link href= {`/${props.instructorID}`} >
        <Card
          style={{ borderRadius: 8 }}
          className={"shadow border-0 " + styles.Cardholder}
        >
          <Card.Body className={styles.container}>
            <div
              style={{ background: randomColor() }}
              className={styles.cardColor}
            >
              <div className={styles.insuctor_pic + " shadow"}>
                {props.image}
              </div>
              <OverlayTrigger
                placement="top"
                delay={{ show: 150, hide: 200 }}
                overlay={<Tooltip id="button-tooltip-2">عدد المقيّمين</Tooltip>}
              >
                <div className={styles.eval_counter}>
                  <MdFolderSpecial />
                  <span>{props.evalCount}</span>
                </div>
              </OverlayTrigger>
            </div>

            <div className={styles.instructor_name}>{props.instructorName}</div>

            <div className={styles.instructor_dept}>{props.instructorDept}</div>

            <div className={styles.stars}>
              <ReactStars
                size={14}
                count={5}
                edit={false}
                emptyIcon={<BsStar />}
                filledIcon={<BsStarFill />}
                value={props.starValue}
                activeColor="#ffd700"
              />
            </div>
          </Card.Body>
        </Card>
        </Link>
     
  );
}

export default InstructorCard;
