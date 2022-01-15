import {
  Spinner,
  Card,
  Button,
  Row,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import styles from "../../styles/dashboard-page/dashboard-tabs.module.scss";
import GroupPreview from "./GroupPrev";
import { MdCancel } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { FiSearch } from "react-icons/fi";
import { myCommunities } from "../../api/queries";
import { useQuery } from "@apollo/client";
import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/groups-tab-dict";
import { M } from "../../constants";

/**
 * ? Groups tab setup
 * - There will be two states for this tab
 * *view-all: header is visible and all evals are showing
 * *search: a searchbar is visible with a cancel btn, only matching names will be showing
 
 */

export default function GroupsTab(props) {
  const { data, loading, error, refetch } = useQuery(myCommunities, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  const [mode, setMode] = useState("view-all");
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  useEffect(() => {
    // console.log(userContext.user.lang);
    setLang(() => translator(user.lang));
    console.log("changed language!");
  }, [user.lang]);

  const fullList = "all of it";
  const matchingList = "matching only";
  const switchMode = () => {
    setMode(mode === "view-all" ? "search" : "view-all");
  };

  const myCommunitiesMapper = () =>
    data.me.ownedCommunities.data.map((community) => {
      return (
        <GroupPreview // TODO Modify this component
          refetch={refetch}
          pic="/images/muhabpower.png" // TODO
          id={community.id}
          name={community.name}
          platform={community.platform}
          handleMsg={props.handleMsg}
        />
      );
    });

  if (error) {
    return (
      <div>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <div className={styles["card-headers"]}>
            {/* Edit btn / cancel editing button / Saving button */}
            {mode === "view" && (
              <Fade duration="1200">
                <Button onClick={switchMode} className={styles["btns"]}>
                  <MdModeEdit size="1.6rem" />
                </Button>
              </Fade>
            )}
            {mode === "edit" && (
              <Fade duration="1200">
                <div>
                  <Button
                    onClick={switchMode}
                    className={[styles["btns"], styles["cancel-btns"]]}
                  >
                    <MdCancel size="1.6rem" />
                  </Button>
                  <Button className={styles["btns"]}>
                    {" "}
                    <FaSave size="1.6rem" />
                  </Button>
                </div>
              </Fade>
            )}
          </div>
        </Card.Header>
        {/* The content of the body will be a subject to local state management */}
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={styles["card-body"]}
        >
          {/* Container for stat attributes and profile info */}

          <Spinner
            className={
              styles["loading-spinner"] +
              " shadow" +
              ` ${user.theme === M.DARK ? styles["dark-spinner"] : ""}`
            }
            animation="border"
            role="status"
          />
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={
          styles["card-containers"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        <Card.Header
          className={
            styles["header-containers"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {mode === "view-all" && (
            <Fade triggerOnce>
              <div
                className={
                  styles["card-headers"] +
                  ` ${user.theme === M.DARK ? styles["dark-header"] : ""}`
                }
              >
                <span className={styles["card-title"]}>{langState.header}</span>
                {/* <Button
                  onClick={switchMode}
                  className={
                    styles["btns"] +
                    ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                  }
                >
                  <FiSearch size="1.6rem" />
                </Button> */}
              </div>
            </Fade>
          )}
          {mode === "search" && (
            <Fade triggerOnce className={styles["fader"]}>
              <div className={styles["card-headers"]}>
                <Form className={styles["header-search"]}>
                  <InputGroup>
                    <FormControl
                      className={` ${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`}
                      placeholder={langState.searchbar}
                    />
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
            <Fade
              triggerOnce
              className={
                "col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
              }
            >
              {myCommunitiesMapper()}
            </Fade>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
