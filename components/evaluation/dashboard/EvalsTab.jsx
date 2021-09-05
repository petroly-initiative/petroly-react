import { Col, Card, Row, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import EvaluationPreview from "./EvaluationPrev";

/**
 * 
 * ? Evaluation Tab setup
 * - data will be recieved via props from Dashboard.jsx query
 * - The component will have two states
 * *view-all: header is visible and all evals are showing
 * *search: a searchbar is visible with a cancel btn, only matching names will be showing
 * ! The seaching function will be handled locally in reactJS for this process
 * 
 * - Instructor data will be mapped via a custom component
 */

export default function EvaluationsTab(props){

  const [mode ,setMode]  = useState("view-all")

  const fullList = {};
  const matchingList = {};

    return (
      <>
        <Col>
          <Card>
            <Card.Header>
              {mode === "view-all" &&(
              <div>
                <span></span>
                <Button>Cancel</Button>
              </div>
              )}
              {mode === "search" && (
                <div>
                  <Form>
                    <InputGroup>
                    <FormControl />
                    </InputGroup>
                  </Form>
                  <Button >Search</Button>
                </div>
              )}
              
            </Card.Header>
            <Card.Body>
              <Row>
                {/* conditoinal mapping between all available and only search match*/}
                {mode === "view-all" && (fullList)}
                {mode === "search" && (matchingList)}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
}