import { Col, Card, Row, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
/**
 *
 * ? State management:
 * This component will have 2 state only
 *
 * *view mode: the stats and profile piv and name are showing
 * *edit mode: the user can change name, profile pic and email, but not the password
 */

export default function ProfileTab(props) {
  const [mode, setMode] = useState("view");

  return (
    <>
      <Col>
        <Card>
          <Card.Header>
            <div></div>
            {/* Edit btn / cancel editing button / Saving button */}
            {mode === "view" && <Button>Edit</Button>}
            {mode === "edit" && (
              <div>
                <Button>Cancel</Button>
                <Button>Save</Button>
              </div>
            )}
          </Card.Header>
          {/* The content of the body will be a subject to local state management */}
          <Card.Body>
            {/* Container for stat attributes and profile info */}

            {mode === "view" && (
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            )}

            {mode === "view" && (
              <div>
                {/* profile pic editing */}
                <div></div>
                <Form>
                <InputGroup>
                <FormControl />
                </InputGroup>
                <InputGroup>
                <FormControl />
                </InputGroup>
                </Form>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
