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
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import GroupsFilter from "../components/Groups/GroupsFilter";
import GroupCreationCard from "../components/Groups/GroupCreationCard";
import { CommunitiesQuery } from "../api/queries";
import { USER } from "../constants";

function Groups(state, action) {
  const { data, loading, error, refetch, networkStatus, variables } = useQuery(
    CommunitiesQuery,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    }
  );

  // search filter modal state
  const [modalVisible, setVisible] = useState(false);
  const [platform, setPlatform] = useState({
    Discord: true,
    Telegram: true,
    Whatsapp: true,
  });
  const [type, setType] = useState({
    Educational: true,
    Entertainment: true,
    Section: { find: false, course: "" },
  });

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

  // const search = (e) => {
  //   var value = name;
  //   groupssDispatch({ changeIn: "name", name: value });
  //   refetch(groupssState);
  // };

  // const enterSearch = (event) => {
  //   if (event.key === "Enter") search();
  // };

  // ? Mappers
  // ? We will use a show-more mehcanism instead of pagination

  const groupMapper = () =>
    data.communities.data.map((community) => {
      return (
        <GroupCard
          id={community.id}
          name={community.name}
          date={community.date}
          key={community.id}
          platform={community.platform}
          type={community.category}
          link={community.link}
          likes={community.likes}
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
    ); // TODO: return somthing while loading
  }

  if (error) {
    return (
      <div>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
      </div>
    );
  }

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
              <InputGroup className={styles["search-container"]}>
                <Form.Control
                  id="name"
                  style={{ direction: "rtl" }}
                  type="text"
                  placeholder="أدخِل اسم القروب"
                  //   onChange={"changeName"}
                  //   onKeyDown={"enterSearch"}
                ></Form.Control>
                <InputGroup.Append style={{ height: 38 }}>
                  <Button
                    type="submit"
                    // onClick={"search"}
                    className={styles["search_btn"]}
                  >
                    <BiSearch size="1.5rem" />
                  </Button>
                </InputGroup.Append>

                <InputGroup.Append>
                  {/*popover for filters and order*/}
                  <Button
                    className={styles["filter-btn"]}
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

      {<GroupCreationCard /> /* Show only when the user is logged in */}
    </ClientOnly>
  );
}

export default Groups;
