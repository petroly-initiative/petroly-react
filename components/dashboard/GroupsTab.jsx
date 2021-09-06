import { Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "../../styles/dashboard-page/dashboard-tabs.module.scss";
import GroupPreview from "./GroupPrev";
import { MdCancel } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { FiSearch } from "react-icons/fi";
/**
 * ? Groups tab setup
 * - There will be two states for this tab
 * *view-all: header is visible and all evals are showing
 * *search: a searchbar is visible with a cancel btn, only matching names will be showing
 
 */

export default function GroupsTab(props) {
  const [mode, setMode] = useState("view-all");

  const fullList = "all of it";
  const matchingList = "matching only";
  return (
    <>
        <Card className={styles["card-containers"] + " shadow"}>
          <Card.Header className={styles["header-containers"]}>
            {mode === "view-all" && (
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>مجتمعاتي</span>
                <Button className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button>
              </div>
            )}
            {mode === "search" && (
              <div className={styles["card-headers"]}>
                <Form>
                  <InputGroup>
                    <FormControl />
                  </InputGroup>
                </Form>
                <Button className={styles["btns", "cancel-btns"]}>
                  <MdCancel size="1.6rem" />
                </Button>
              </div>
            )}
          </Card.Header>
          <Card.Body className={styles["card-body"]}>
            {/* A list will be populated via a custom component */}
            {mode === "view-all" && fullList}
            {mode === "search" && matchingList}
          </Card.Body>
        </Card>
    </>
  );
}
