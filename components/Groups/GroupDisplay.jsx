// import styles from "../../styles/groups-page/groups-display.module.scss";
import { useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStar } from "react-icons/bs";
import styles from "../../styles/groups-page/groups-display.module.scss";
import classNames from "classnames";

/**
 *
 * @param {*} props
 * @returns A modal to preview the group to enter it
 */
export default function GroupDisplay(props) {
  const arTitles = {
    platform: "المنصة",
    type: "تصنيف المجموعة",
    description: "الوصف",
    joinCommunity: "انضم للمجموعة",
  };

  return (
    <>
      <Modal
        style={{ direction: "rtl" }}
        show={props.showModal}
        onHide={props.handleClose}
      >
        <Modal.Header className="justify-content-center text-center">
          <Col className="justify-content-center">
            {/* group image */}
            <div>{props.image}</div>

            {/* group name */}
            <Modal.Title>{props.name}</Modal.Title>
            <div className="d-flex justify-content-center ">
              <ReactStars
                sytle={{ direction: "rtl" }}
                className="justify-content-center"
                size={14}
                count={5}
                edit={false}
                emptyIcon={<BsStar />}
                filledIcon={<BsStarFill />}
                value={3}
                activeColor="#ffd700"
              />
            </div>

            {/* rating */}
          </Col>
        </Modal.Header>
        <Modal.Body className="text-right">
          {/* platform */}
          <Row className="align-items-center justify-content-between">
            <Col sm={8}>
              <h2 className={styles.title}>{arTitles.platform}</h2>
            </Col>
            <Col>
              <div
                className={styles.highlightText}
                style={{ background: props.platformColor(props.platform) }}
              >
                {props.platform}
              </div>
            </Col>
          </Row>

          {/* group type */}
          <Row className="align-items-center">
            <Col sm={8}>
              <h2 className={styles.title}>{arTitles.type}</h2>
            </Col>
            <Col>
              <div
                className={styles.highlightText}
                style={{ background: props.typeColor(props.type) }}
              >
                {props.type}
              </div>
            </Col>
          </Row>

          {/* description */}
          <Row>
            <div>
              <Col sm={8}>
                <h2 className={styles.title}>{arTitles.description}</h2>
              </Col>
              <Col className={classNames(styles.description, "px-4")}>
                <p>
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                  النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
                  التى يولدها التطبيق.
                </p>
              </Col>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {/* join button */}
          <Button variant="primary">{arTitles.joinCommunity}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
