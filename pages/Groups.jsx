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
import GroupsFilter from "../components/Groups/GroupsFilter";
import GroupCreationCard from "../components/Groups/GroupCreationCard";

function Groups(state, action) {
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

  useEffect(() => {
    console.log(platform);
  }, [platform]);
  useEffect(() => {
    console.log(type);
  }, [type]);
  //
  // ? API hooks
  //   const {
  //     data: dataDept,
  //     error: errorDept,
  //     loading: loadingDept,
  //   } = useQuery(getDepartments, {
  //     variables: { short: true },
  //   });

  //   const { data, loading, error, refetch, networkStatus, variables } = useQuery(
  //     groupssQuery,
  //     {
  //       variables: groupssState,
  //       notifyOnNetworkStatusChange: true,
  //       fetchPolicy: "network-only",
  //       nextFetchPolicy: "cache-first",
  //     }
  //   );

  //  ? To handle the search event
  //   const selectDept = (e) => {
  //     var value = e.target.id;
  //     if (value == "null") value = null;
  //     groupssDispatch({ changeIn: "department", department: value });
  //     refetch(groupssState);
  //   };

  //   const search = (e) => {
  //     var value = name;
  //     groupssDispatch({ changeIn: "name", name: value });
  //     refetch(groupssState);
  //   };

  //   const enterSearch = (event) => {
  //     if (event.key === "Enter") search();
  //   };

  // ? detect page-number switching

  // ? Mappers
  const groupMapper = () => {
    return (
      <GroupCard
        date={"9-21-2021"}
        platform="Telegram"
        type="educationa"
        likes={201}
        image={
          <Image
            className={styles.picDiv}
            src={"/images/spongy.png"}
            width="70"
            height="70"
          />
        }
      />
    );
  };
  // Loading status

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
                  placeholder="أدخِل اسم المحاضِر"
                  defaultValue={"name"}
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
              <GroupCard
                date={"9-21-2021"}
                name=" CS Nerds"
                platform="Telegram"
                type="تعليمي"
                likes={201}
                image={
                  <Image
                    className={styles.picDiv}
                    src={"/images/spongy.png"}
                    width="70"
                    height="70"
                  />
                }
              />
              <GroupCard
                date={"9-21-2021"}
                platform="Whatsapp"
                type="ترفيهي"
                likes={201}
                name="Computer Club yuh yuh yuh yuh"
                image={
                  <Image
                    className={styles.picDiv}
                    src={"/images/spongy.png"}
                    width="70"
                    height="70"
                  />
                }
              />
              <GroupCard
                date={"9-21-2021"}
                platform="Discord"
                type="شعبة"
                likes={201}
                image={
                  <Image
                    className={styles.picDiv}
                    src={"/images/spongy.png"}
                    width="70"
                    height="70"
                  />
                }
              />
              <GroupCard
                date={"9-21-2021"}
                platform="Telegram"
                type="شعبة"
                likes={201}
                image={
                  <Image
                    className={styles.picDiv}
                    src={"/images/spongy.png"}
                    width="70"
                    height="70"
                  />
                }
              />
              <GroupCard
                date={"9-21-2021"}
                platform="Telegram"
                type="ترفيهي"
                likes={201}
                image={
                  <Image
                    className={styles.picDiv}
                    src={"/images/spongy.png"}
                    width="70"
                    height="70"
                  />
                }
              />
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
      <GroupCreationCard />
    </ClientOnly>
  );
}

export default Groups;
