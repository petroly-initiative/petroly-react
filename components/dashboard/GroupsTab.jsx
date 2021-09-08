import {
  Col,
  Card,
  Button,
  Row,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
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

  const switchMode = () => {
    setMode(mode === "view-all" ? "search" : "view-all");
  };

  return (
    <>
      <Card className={styles["card-containers"] + " shadow"}>
        <Card.Header className={styles["header-containers"]}>
          {mode === "view-all" && (
            <Fade>
              <div className={styles["card-headers"]}>
                <span className={styles["card-title"]}>مجتمعاتي</span>
                <Button onClick={switchMode} className={styles["btns"]}>
                  <FiSearch size="1.6rem" />
                </Button>
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade className={styles["fader"]}>
              <div className={styles["card-headers"]}>
                <Form className={styles["header-search"]}>
                  <InputGroup>
                    <FormControl />
                  </InputGroup>
                </Form>
                <div className={styles["search-set"]}>
                  <Button onClick={switchMode} className={styles["btns"]}>
                    <FiSearch size="1.6rem" />
                  </Button>
                </div>
              </div>
            </Fade>
          )}
        </Card.Header>
        <Card.Body className={styles["card-body"] + " " + styles["eval-cards"]}>
          {/* A list will be populated via a custom component */}
          <Row>
            <Fade triggerOnce className={"col col-xs-12"}>
              <GroupPreview />
              <GroupPreview />
              <GroupPreview />
              <GroupPreview />

              <GroupPreview />
              <GroupPreview />
              <GroupPreview />
            </Fade>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
