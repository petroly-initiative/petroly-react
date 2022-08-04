import { useRouter } from "next/router";
import { OverlayTrigger, Popover } from "react-bootstrap";
import styles from "../../styles/notifier-page/instructor-popover.module.scss";
import { AiFillStar } from "react-icons/ai";
import { RiArrowRightUpFill } from "react-icons/ri";
import { M } from "../../constants";
import Image from "next/image";
import Link from "next/link";

/**
 * ? props
 * @id the instructor id to facilitate routing on click
 * @name instructor name
 * @rating instructor rating in our evaluation service
 * @img instructor image in our evaluation service
 * @user the user context object
 * @msg header content
 *
 */

export default function InstructorPopover(props) {


  return (
    <OverlayTrigger
      trigger={"click"}
      placement={"top"}
      rootClose
      overlay={
        <Popover
          className={
            styles["popover-container"] +
            ` ${props.user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <Link href={`/instructors/${props.id}`} passHref>
            <a onClick={(e) => {
              e.stopPropagation()
            }} target="_blank" rel="noopener noreferrer">
              <Popover.Header
                className={
                  styles["card-header"] +
                  " shadow" +
                  ` ${props.user.theme === M.DARK ? styles["dark-mode"] : ""}`
                }
              >
                <span> {props.msg}</span>
                <RiArrowRightUpFill className={styles["link-icon"]} />
              </Popover.Header>
              <Popover.Body className={styles["card-body"]}>
                <div
                  style={{ position: "relative" }}
                  className={
                    styles.insuctor_pic +
                    " shadow" +
                    ` ${
                      props.user.theme === M.DARK ? styles["dark-border"] : ""
                    }`
                  }
                >
                  <Image
                    className={styles.picDiv}
                    src={props.img}
                    width="60"
                    height="60"
                  />
                </div>
                <div className={styles["instructor-name"]}>{props.name}</div>
                <div className={styles["card-rating"]}>
                  <AiFillStar
                    className={
                      props.rating > 0
                        ? styles["active-icon"]
                        : styles["rating-icon"]
                    }
                  />{" "}
                  <span
                    className={` ${
                      props.user.theme === M.DARK ? styles["dark-txt"] : ""
                    }`}
                  >
                    {props.rating}
                  </span>
                </div>
              </Popover.Body>
            </a>
          </Link>
        </Popover>
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          styles["outer-rating"] +
          ` ${props.user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        {" "}
        <AiFillStar
          className={
            props.rating > 0 ? styles["active-icon"] : styles["rating-icon"]
          }
        />{" "}
        <span
          className={` ${
            props.user.theme === M.DARK ? styles["dark-txt"] : ""
          }`}
        >
          {props.rating}
        </span>
      </div>
    </OverlayTrigger>
  );
}
