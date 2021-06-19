import React from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";

function InstructorRates(props) {
  return (
    <Row className="align-items-center m-0 p-0">
      <Col className="m-0 p-0 mx-1" xs={4} sm={2}>
        {props.title}
      </Col>
      <Col className="m-0 p-0 align-items-center">
        <ProgressBar
          className="align-self-center m-0 p-0"
          variant={props.barColor}
          now={props.barNow}
        />
      </Col>
    </Row>
  );
}

export default InstructorRates;
