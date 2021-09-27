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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const arTitles = {
    platform: "المنصة",
    type: "تصنيف المجموعة",
    description: "الوصف",
    joinCommunity: "انضم للمجموعة",
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="justify-content-center text-center">
          <Col className="justify-content-center">
            {/* group image */}
            <img src="" alt="" />

            {/* group name */}
            <Modal.Title>{props.group.name}</Modal.Title>

            {/* rating */}
            <ReactStars
              className="justify-content-center text-center"
              size={14}
              count={5}
              edit={false}
              emptyIcon={<BsStar />}
              filledIcon={<BsStarFill />}
              value={props.starValue}
              activeColor="#ffd700"
            />
          </Col>
        </Modal.Header>
        <Modal.Body>
          {/* platform */}
          <Row>
            <Col sm={8}>
              <h2 className={styles.title}>{arTitles.platform}</h2>
            </Col>
            <Col>
              <h4>platform2</h4>
            </Col>
          </Row>

          {/* group type */}
          <Row>
            <Col sm={8}>
              <h2 className={styles.title}>{arTitles.type}</h2>
            </Col>
            <Col>
              <h4>Educational</h4>
            </Col>
          </Row>

          {/* description */}
          <Row>
            <div>
              <Col sm={8}>
                <h2 className={styles.title}>{arTitles.description}</h2>
              </Col>
              <Col className={classNames(styles.description,"px-4")}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Iusto, ullam?
                </p>
              </Col>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {/* join button */}
          <Button variant="primary" onClick={handleShow}>
            {arTitles.joinCommunity}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
