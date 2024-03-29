import { Col, Row, Container, Card, Spinner } from "react-bootstrap";
import EvaluationsTab from "../components/dashboard/EvalsTab";
import ProfileTab from "../components/dashboard/ProfileTab";
import GroupsTab from "../components/dashboard/GroupsTab";
import styles from "../styles/dashboard-page/dashboard-container.module.scss";
import { Fade } from "react-awesome-reveal";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { useQuery, useLazyQuery } from "@apollo/client";
import { meQuery, meEvaluationSetQuery, myCommunities } from "../api/queries";
import { USER, L } from "../constants";
import PopMsg from "../components/utilities/PopMsg";
import Head from "next/head";
import { NavContext } from "../state-management/navbar-state/NavbarContext";

/**
 *
 * ? Dasboard page setup:
 * -  Custom components for each tab to avoid a clutter of state management
 * - all components will share the same style file for uniform look
 * - the page will contain two modals:
 *  *Create group modal
 *  *Edit an evaluation
 */

export default function Dashboard(props) {
  const { user } = useContext(UserContext);
  const { navDispatch } = useContext(NavContext);

  const [msgVisible, setMsg] = useState(false);

  // fetching profile data
  const {
    data: dataMe,
    loading: loadingMe,
    error: errorMe,
    refetch: refetchMe,
  } = useQuery(meQuery, {
    notifyOnNetworkStatusChange: true,
    skip: user.status !== USER.LOGGED_IN,
    fetchPolicy: "network-only",
  });

  // fetching evaluations
  const {
    data: dataEval,
    loading: loadingEval,
    error: errorEval,
    refetch: refetchEval,
  } = useQuery(meEvaluationSetQuery, {
    notifyOnNetworkStatusChange: true,
    skip: user.status !== USER.LOGGED_IN,
    fetchPolicy: "no-cache",
  });

  const {
    data: dataComms,
    loading: loadingComms,
    error: errorComms,
    refetch: refetchComms,
  } = useQuery(myCommunities, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    skip: user.status !== USER.LOGGED_IN,
  });

  useEffect(() => {
    navDispatch("");
  }, []);

  return (
    <>
      <Head>
        <title>Petroly | Dashboard</title>
      </Head>
      <PopMsg
        visible={msgVisible}
        msg={
          user.lang === L.AR_SA
            ? "تم حفظ التغييرات بنجاح"
            : "Changes Updated successfully successfully"
        }
        handleClose={setMsg}
        success
        // you can use failure or none for different message types
      />
      {/* <Navbar /> */}
      <Container className={styles["main-container"]}>
        {/* It will be responsible for the main shadow drop */}
        {/* The title */}
        <div className={styles["title"]}>
          {user.lang === L.AR_SA ? "لوحة المعلومات" : "Dashboard"}
        </div>
        <Row className={styles["cards-holder"]}>
          <Fade
            triggerOnce
            direction="up"
            damping="0.02"
            className={
              styles["tab-containers"] +
              "col col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-6"
            }
          >
            <ProfileTab
              loadingMe={loadingMe}
              dataMe={dataMe}
              errorMe={errorMe}
              refetchMe={refetchMe}
            />
            <EvaluationsTab
              loadingEval={loadingEval}
              dataEval={dataEval}
              errorEval={errorEval}
              refetchEval={refetchEval}
              handleMsg={setMsg}
            />
            <GroupsTab
              handleMsg={setMsg}
              dataComms={dataComms}
              loadingComms={loadingComms}
              errorComms={errorComms}
              refetchComms={refetchComms}
            />
          </Fade>
        </Row>
      </Container>
    </>
  );
}
