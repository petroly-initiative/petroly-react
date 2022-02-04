import styles from "../styles/groups-page/groups-list.module.scss";
import ClientOnly from "../components/ClientOnly";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Image from "next/image";
import Head from "next/head";

import { BiSearch } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { AiFillFileAdd } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";
import GroupCard from "../components/Groups/GroupCard";
import { useEffect, useState, useContext, useRef } from "react";
import { useQuery } from "@apollo/client";
import { CommunitiesQuery } from "../api/queries";
import GroupsFilter from "../components/Groups/GroupsFilter";
import GroupCreationCard from "../components/Groups/GroupCreationCard";
import { UserContext } from "../state-management/user-state/UserContext";
import translator from "../dictionary/pages/groups-dict";
import { NavContext } from "../state-management/navbar-state/NavbarContext";
import { langDirection, L, M, USER } from "../constants";
import PopMsg from "../components/utilities/PopMsg";

function Groups(state, action) {
  const { user } = useContext(UserContext);
  const { navDispatch } = useContext(NavContext);

  const [filterVisible, setVisible] = useState(false);
  const [msgVisible, setMsg] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // search filter modal state
  const [platform, setPlatform] = useState("ALL");
  const [type, setType] = useState({ type: "ALL" });
  const name = useRef("");

  /** 
   * ? state inputs can be the following
   * {
   {type: "Educational"}
    type: "Entertainment",
    {type: "Section", course: "ABCDXXX"}
  }
   */

  const { data, loading, error, refetch } = useQuery(CommunitiesQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  // language state
  const [langState, setLang] = useState(() => translator(user.lang));
  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  const launchModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const changePlatform = (obj) => {
    if(obj !== platform)
    setPlatform(obj);
  };

  const changeType = (obj) => {
    if (obj.type !== type.type || (obj.type === "SECTION" && obj.course !== type.course)) {
      setType(obj);
    }
  };

  const search = () => {
    refetch({
      name: name.current.value,
      category: type.type === "ALL" ? null : type.type,
      platform: platform === "ALL" ? null : platform,
      section: type.course,
    });
  };

  const enterSearch = (event) => {
    if (event.key === "Enter") search();
  };

  useEffect(() => {
    navDispatch("communities");
  }, []);

  useEffect(() => {
    search()
  }, [type, platform])

  // ? Mappers
  // ? We will use a show-more mehcanism instead of pagination

  if (loading) {
    return (
      <Container className={"mt-4 " + styles.list_container}>
        <Button className={styles["loading-container"] + " shadow"} disabled>
          <Spinner
            className={styles["loading-spinner"]}
            as="div"
            animation="grow"
            size="xl"
            role="status"
            aria-hidden="true"
          />
        </Button>
      </Container>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (data.communities.count === 0) {
    return (
      <ClientOnly>
        <>
          <Head>
            <title>Petroly | Groups</title>
          </Head>
          {/* <Navbar page="communities" /> */}
          <Container className={"mt-4 " + styles.list_container}>
            <Row style={{ justifyContent: "center" }}>
              <Col
                l={8}
                xs={11}
                md={9}
                xl={7}
                style={{ width: "100% !important" }}
              >
                <InputGroup
                  style={langDirection(user.lang)}
                  className={styles["search-container"]}
                >
                  <Form.Control
                    id="name"
                    ref={name}
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                    type="text"
                    placeholder={langState.searchbar}
                    className={`${
                      user.theme === M.DARK ? styles["dark-mode-input"] : ""
                    }`}
                    // onChange={ref}
                    onKeyDown={enterSearch}
                  />
                  <InputGroup.Append style={{ height: 38 }}>
                    <Button
                      type="submit"
                      onClick={search}
                      className={
                        styles["search_btn"] +
                        ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                      }
                    >
                      <BiSearch size="1.5rem" />
                    </Button>
                  </InputGroup.Append>

                  <InputGroup.Append>
                    {/*popover for filters and order*/}
                    <Button
                      className={
                        styles["filter-btn"] +
                        ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                      }
                      align="start"
                      id="dropdown-menu-align-right"
                      onClick={launchModal}
                    >
                      <GoSettings size="1.5rem" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
            <div className={styles["error-container"]}>
              <div className={styles["error-img"]}>
                <Image
                  src="/images/errors/NotFoundE2.svg"
                  width="440"
                  height="386"
                />
              </div>
              <div className={styles["error-txt"]}>No Reesult Found :(</div>
            </div>
            <GroupsFilter
              close={closeModal}
              changePlatform={changePlatform}
              changeType={changeType}
              visible={filterVisible}
              type={type}
              platform={platform}
            />
          </Container>
          {user.status !== USER.LOGGED_IN ? (
            <OverlayTrigger
              trigger={"hover"}
              placement="top"
              delay={{ show: 100, hide: 300 }}
              overlay={<Tooltip>{langState.createBlock}</Tooltip>}
            >
              <Button
                className={styles.modalButton}
                onClick={() => setModalVisible(true)}
                disabled
              >
                <AiFillFileAdd size={32} />
              </Button>
            </OverlayTrigger>
          ) : (
            <Button
              className={styles.modalButton}
              onClick={() => setModalVisible(true)}
            >
              <AiFillFileAdd size={32} />
            </Button>
          )}
        </>

        {
          <GroupCreationCard
            visible={modalVisible}
            handleClose={setModalVisible}
            refetch={refetch}
            handleMsg={setMsg}
            create
          /> /* Show only when the user is logged in */
        }
        <PopMsg
          visible={msgVisible}
          msg={
            user.lang === L.AR_SA
              ? "تم إنشاءالمجتمع"
              : "Group Created successfully"
          }
          handleClose={setMsg}
          success
          // you can use failure or none for different message types
        />
      </ClientOnly>
    );
  }

  const groupMapper = () =>
    data.communities.data.map((community) => {
      const icon = community.icon;
      return (
        <GroupCard
          id={community.id}
          name={community.name}
          section={community.section}
          date={community.date}
          key={community.id}
          platform={community.platform}
          type={community.category}
          link={community.link}
          likesCount={community.likes.count}
          image={
            <Image
              className={styles.picDiv}
              src={icon ? icon.url : "/images/share.png"} // TODO
              width="70"
              height="70"
            />
          }
          description={community.description}
        />
      );
    });
  var communities = groupMapper();

  return (
    <ClientOnly>
      <>
        <Head>
          <title>Petroly | Groups</title>
        </Head>
        {/* <Navbar page="communities" /> */}
        <Container className={"mt-4 " + styles.list_container}>
          <Row style={{ justifyContent: "center" }}>
            <Col
              l={8}
              xs={11}
              md={9}
              xl={7}
              style={{ width: "100% !important" }}
            >
              <InputGroup
                style={langDirection(user.lang)}
                className={styles["search-container"]}
              >
                <Form.Control
                  id="name"
                  ref={name}
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  type="text"
                  placeholder={langState.searchbar}
                  className={`${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`}
                  // onChange={ref}
                  onKeyDown={enterSearch}
                />
                <InputGroup.Append style={{ height: 38 }}>
                  <Button
                    type="submit"
                    onClick={search}
                    className={
                      styles["search_btn"] +
                      ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                    }
                  >
                    <BiSearch size="1.5rem" />
                  </Button>
                </InputGroup.Append>

                <InputGroup.Append>
                  {/*popover for filters and order*/}
                  <Button
                    className={
                      styles["filter-btn"] +
                      ` ${user.theme === M.DARK ? styles["dark-btn"] : ""}`
                    }
                    align="start"
                    id="dropdown-menu-align-right"
                    onClick={launchModal}
                  >
                    <GoSettings size="1.5rem" />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className={styles.groups_list}>
            {" "}
            <Fade
              className={"col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4"}
              cascade
              damping={0.02}
              triggerOnce
              direction="up"
            >
              {/**!Number of pages should be provided by the api*/}

              {communities}
            </Fade>
          </Row>
          <GroupsFilter
            close={closeModal}
            changePlatform={changePlatform}
            changeType={changeType}
            visible={filterVisible}
            type={type}
            platform={platform}
          />
        </Container>
      </>

      {
        <GroupCreationCard
          visible={modalVisible}
          handleClose={setModalVisible}
          refetch={refetch}
          handleMsg={setMsg}
          create
        /> /* Show only when the user is logged in */
      }
      <PopMsg
        visible={msgVisible}
        msg={
          user.lang === L.AR_SA
            ? "تم إنشاءالمجتمع"
            : "Group Created successfully"
        }
        handleClose={setMsg}
        success
        // you can use failure or none for different message types
      />
      {user.status !== USER.LOGGED_IN ? (
        <OverlayTrigger
          trigger={"hover"}
          placement="top"
          delay={{ show: 100, hide: 300 }}
          overlay={<Tooltip>{langState.createBlock}</Tooltip>}
        >
          <Button
            className={styles.modalButton}
            onClick={() => setModalVisible(true)}
            disabled
          >
            <AiFillFileAdd size={32} />
          </Button>
        </OverlayTrigger>
      ) : (
        <Button
          className={styles.modalButton}
          onClick={() => setModalVisible(true)}
        >
          <AiFillFileAdd size={32} />
        </Button>
      )}
    </ClientOnly>
  );
}

export default Groups;
