import { Col, Card, Button } from "react-bootstrap";
import { useState } from "react";

/**
 * ? Groups tab setup
 * - There will be two states for this tab
 * *view-all: header is visible and all evals are showing
 * *search: a searchbar is visible with a cancel btn, only matching names will be showing
 * ! The seaching function will be handled locally in reactJS for this process
 */

export default function GroupsTab(props) {
  const [mode, setMode] = useState("view-all");
  const [mode, setMode] = useState("view-all");
  return (
    <>
      <Col>
        <Card>
          <Card.Header>
            {mode === "view-all" && (
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
                <Button>Search</Button>
              </div>
            )}
          </Card.Header>
          <Card.Body>
            {/* A list will be populated via a custom component */}
            {mode === "view-all" && fullList}
            {mode === "search" && matchingList}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
