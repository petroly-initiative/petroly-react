import React from "react";
import { Card, Col, Row, ProgressBar, Button } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import ReactStarts from "react-rating-stars-component";
import InstructorRates from "../InstructorRates/InstructorRates";

function InstructorCard(props) {
  return (
    <Col xs={12} md={6} className="my-2">
      <Card>
        <Card.Body>
          <Row className="m-2 align-items-center justify-content-start">
            <Col className="p-0" xs={4} rounded>
              <CgProfile size={40} />
            </Col>

            <Col className="p-0">
              <Row>
                <Card.Title className="m-0 my-1">
                  {props.instructorName}
                </Card.Title>
              </Row>
              <Row className="align-items-center">
                <Col className="p-0 w-100" xs={6}>
                  <Button variant="secondary" className="p-1 m-0 w-50">
                    {props.instructorDept}
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end p-0 w-100">
                  <IconContext.Provider value={{ color: "yellow" }}>
                    <div>
                      <ReactStarts
                        count={5}
                        edit={false}
                        half={true}
                        value={props.starsValue}
                        activeColor="#ffd700"
                      />
                    </div>
                  </IconContext.Provider>
                </Col>
              </Row>
            </Col>
          </Row>

          <InstructorRates
            title="Grading"
            barColor="primary"
            barNow={props.gradingBarNow}
          />

          <InstructorRates
            title="Teching"
            barColor="success"
            barNow={props.teachingBarNow}
          />

          <InstructorRates
            title="Personality"
            barColor="warning"
            barNow={props.personalityBarNow}
          />

          <Row className="justify-content-center m-2">
            <Button style={{ background: "#00ead3", border: "#00ead3" }}>
              Details
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default InstructorCard;
