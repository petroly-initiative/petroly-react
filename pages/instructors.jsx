import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import InstructorCard from "../components/Instructros/Card/InstructorCard";

function instructuros() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter instructor"
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="">
            <Form.Control as="select">
              <option>All Departments</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <InstructorCard
          instructorName="Instructor Name"
          instructorDept="SWE"
          starsValue={5}
          gradingBarNow={80}
          teachingBarNow={50}
          personalityBarNow={65}
        />
        <InstructorCard
          instructorName="Instructor Name"
          instructorDept="ICE"
          starsValue={4}
          gradingBarNow={80}
          teachingBarNow={50}
          personalityBarNow={65}
        />
        <InstructorCard
          instructorName="Instructor Name"
          instructorDept="COE"
          starsValue={3}
          gradingBarNow={80}
          teachingBarNow={50}
          personalityBarNow={65}
        />
      </Row>
    </Container>
  );
}

export default instructuros;
