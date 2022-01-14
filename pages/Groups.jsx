import styles from "../styles/groups-page/groups-list.module.scss";
import ClientOnly from "../components/ClientOnly";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/navbar";
import { BiSearch } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { Fade } from "react-awesome-reveal";
import GroupCard from "../components/Groups/GroupCard";
import { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { CommunitiesQuery } from "../api/queries";
import GroupsFilter from "../components/Groups/GroupsFilter";
import GroupCreationCard from "../components/Groups/GroupCreationCard";
import { UserContext } from "../state-management/user-state/UserContext";
import translator from "../dictionary/pages/groups-dict";
import { langDirection, L, M } from "../constants";

function Groups(state, action) {
  const { user, userDispatch } = useContext(UserContext);
  const [modalVisible, setVisible] = useState(false);
  // search filter modal state
  const [searchTerm, setSearchTerm] = useState("");
  const [platform, setPlatform] = useState({
    DISCORD: true,
    TELEGRAM: true,
    WHATSAPP: true,
  });
  const [type, setType] = useState({
    EDU: true,
    ENTERTAINING: true,
    SECTION: { find: false, course: "" },
  });

  const { data, loading, error, refetch } = useQuery(CommunitiesQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  // language state
  const [langState, setLang] = useState(() => translator(user.lang));
  useEffect(() => {
    setLang(() => translator(user.lang));
    console.log("changed language!");
  }, [user.lang]);

  const launchModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const changePlatform = (obj) => {
    setPlatform(obj);
  };

  const changeType = (obj) => {
    setType(obj);
  };

  //  ? To handle the search event
  // const selectDept = (e) => {
  //   var value = e.target.id;
  //   if (value == "null") value = null;
  //   groupssDispatch({ changeIn: "department", department: value });
  //   refetch(groupssState);
  // };

  const search = () => {
    const term = searchTerm.trim();
    if (term != "") refetch({ name: term });
  };

  const enterSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.key === "Enter") search();
  };

  // ? Mappers
  // ? We will use a show-more mehcanism instead of pagination

  if (loading) {
    return (
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
  const groupMapper = () =>
    data.communities.data.map((community) => {
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
              src={"/images/spongy.png"} // TODO
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
          <title>Petroly | Rating</title>
        </Head>
        <Navbar page="communities" />
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
                  dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                  type="text"
                  placeholder={langState.searchbar}
                  className={`${
                    user.theme === M.DARK ? styles["dark-mode-input"] : ""
                  }`}
                  //   onChange={"changeName"}
                  //   onKeyDown={"enterSearch"}
                />
                <InputGroup.Append style={{ height: 38 }}>
                  <Button
                    type="submit"
                    // onClick={"search"}
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
            visible={modalVisible}
            type={type}
            platform={platform}
          />
        </Container>
      </>

      <GroupCreationCard refetch={refetch} />
    </ClientOnly>
  );
}

export default Groups;
