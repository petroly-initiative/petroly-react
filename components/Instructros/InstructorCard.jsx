import React, { useRef } from "react";
import { Card, Col, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { BsStarFill, BsStar } from "react-icons/bs";
import { MdFolderSpecial } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/evaluation-page/instructors-card.module.scss";

/**
 * TODO: Create an overlay for evaluation numbers
 *
 *
 */

function InstructorCard(props) {
  const tooltip = useRef();

  const gradientColor = () => {
    switch (props.starValue) {
      case 5:
      case 4:
        return `rgb(0, 183, 255),
              rgb(0, 255, 191)`;
      case 3:
        return `yellow,
              rgb(255, 120, 120)`;
        break;
      case 2:
      case 1:
        return `orange,
              rgb(255, 90, 90)`;
      default:
        return `rgb(204, 204, 204), rgb(163, 163, 163)`;
    }
  };

  return (
    <>
      <Link href={`/instructors/${props.instructorID}`}>
        <Card
          style={{ borderRadius: 8 }}
          className={"shadow border-0 " + styles.Cardholder}
        >
          <Card.Body className={styles.container}>
            <div
              // style={{ borderBottom: "3.5px solid rgb(9, 248, 236)" }}
              className={styles.cardColor + " " + "cardColor"}
            >
              <div
                style={{ position: "relative" }}
                className={styles.insuctor_pic + " shadow"}
              >
                {props.image}
              </div>
              <OverlayTrigger
                style={{ position: "absolute", right: 0 }}
                delay={{ show: 150, hide: 200 }}
                overlay={<Tooltip id="button-tooltip">عدد المقيمين</Tooltip>}
                target={tooltip.current}
              >
                <Container id="cunter" className={styles.eval_counter}>
                  <MdFolderSpecial />
                  <span>{props.evalCount}</span>
                </Container>
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
      <style jsx>
        {`
          .cardColor::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 4.5px;
            right: 0;
            background-image: linear-gradient(to right, ${gradientColor()});
          }
        `}
      </style>
    </>
  );
}

export default InstructorCard;
