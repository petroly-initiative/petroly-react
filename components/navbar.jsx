import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImBook } from "react-icons/im";
import { FiHelpCircle, FiMenu } from "react-icons/fi";
import {
  BsChatSquareDotsFill,
  BsStarFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import SignInModal from "./SignInModal";
import { userContext } from "../state-management/user-state/userContext";
import { FaSignInAlt } from "react-icons/fa";
import { OverlayTrigger } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import { useQuery } from "@apollo/client";
import { meQuery } from "../api/queries"
import ClientOnly from "./ClientOnly";

/**
 * TODO:
 * - Loading state before updating the context
 *
 */

export default function Navbar(props) {

  const userInfo = useContext(userContext);
  const [sideVisible, setVisible] = useState(false);
  const [sideBarStyle, setStyle] = useState({ left: "100vw" });
  const [overlayStyle, setOverlay] = useState({ display: "none" });
  const [showSignIn, setShowSignIn] = useState(false);

  //--- signed off state

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("/favicon.png");

  //--------

  // ---- query state
  // !WARNING: Use a loading component inplace of the profile image
  const { data, loading, error, refetch, networkStatus } = useQuery(
    meQuery,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      skip: !userInfo.status.logged
    }
  );

// -------------



  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => setShowSignIn(true);

  const signOut = async () => {
    await userInfo.userDispatch({ type: "sign-out" });
    console.log(userInfo)
  };

  var navStyles = {
    home: { color: props.page == "home" ? "#2ea5eb" : "" },
    rating: { color: props.page == "rating" ? "#2ea5eb" : "" },
    resources: { color: props.page == "resources" ? "#2ea5eb" : "" },
    communities: { color: props.page == "communities" ? "#2ea5eb" : "" },
    chat: { color: props.page == "chat" ? "#2ea5eb" : "" },
  };

  // useEffect(() => {
  //   userInfo.userDispatch({ type: "sign-in", credentials: Object.assign(data, {logged: true}) });
  //   }, [data])

  useEffect(() => {
    if(data){
      setUsername(data.me.username, setProfilePic(data.me.profile.profilePic));
      
    }
  }, [data])

  useEffect(() => {
    setStyle(() => {
      if (sideVisible) {
        return { left: "calc(100vw - 5rem)" };
      } else return { left: "100vw" };
    });
    setOverlay(() => {
      if (sideVisible) {
        return { display: "block" };
      } else return { display: "none" };
    });
  }, [sideVisible]);

  // force refresh
  useEffect(() => {
    // refresh token
    console.log(userInfo.status.logged)
  }, [])

  const showSidebar = () => {
    console.log(sideVisible);
    setVisible((prev) => !prev);
  };

  console.log('loading', loading);
  console.log('Me', data);
  console.log('userInfo', userInfo);
  if (error)
    console.log('error', error);

  if (loading)
    return (
      <nav className={styles.navbar}>
        <SignInModal visible={showSignIn} close={handleSignInClose} />
        <div className={styles.navbar_top}>
          <li className={styles.navbar_item}>
            <Image
              style={{ margin: 0 }}
              src="/favicon.png"
              width={35}
              height={35}
            />
          </li>
          <Button className={styles.collapser} onClick={showSidebar}>
            <FiMenu className={styles.collapse_icon} size="1.6em" />
          </Button>
          <div className={styles.navbar_side} style={sideBarStyle}>
            <div
              onClick={showSidebar}
              className={styles.nav_overlay}
              style={overlayStyle}
            ></div>
            <ul>
              <li className={styles.navbar_item}>
                <Spinner animation="border" role="status"/>
              </li>
              <div className={styles.nav_pages}>
                <li style={navStyles.home} className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <AiFillHome className={styles.nav_img} size="1.6em" />
                      <div className={styles.link_text}>الرئيسية</div>
                    </div>
                  </Link>
                </li>
                <li style={navStyles.resources} className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <ImBook className={styles.nav_img} size="1.6em" />
                      <div className={styles.link_text}>الموارد</div>
                    </div>
                  </Link>
                </li>
                <li style={navStyles.rating} className={styles.navbar_item}>
                  <Link href="/instructors" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <BsStarFill className={styles.nav_img} size="1.6em" />
                      <div className={styles.link_text}>التقييم</div>
                    </div>
                  </Link>
                </li>
                <li style={navStyles.chat} className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <BsChatSquareDotsFill
                        className={styles.nav_img}
                        size="1.6em"
                      />
                      <div className={styles.link_text}>المحادثات</div>
                    </div>
                  </Link>
                </li>
                <li
                  style={navStyles.communities}
                  className={styles.navbar_item}
                >
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <BsFillPeopleFill
                        className={styles.nav_img}
                        size="1.6em"
                      />
                      <div className={styles.link_text}>المجتمعات</div>
                    </div>
                  </Link>
                </li>
              </div>
              {
                <li className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <FiHelpCircle className={styles.nav_img} size="1.2em" />
                    </div>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
        {/*layout for big screens*/}
        <div className={styles.navbar_main}>
          <ul className={styles.navbar_nav}>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <Image src="/favicon.png" width={35} height={35} />
              </Link>
            </li>

            <li
              className={styles.navbar_item}
              style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
            >
             <Spinner animation="border" role="status"/>
            </li>
            <div className={styles.nav_pages}>
              <li style={navStyles.home} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <AiFillHome className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>الرئيسية</div>
                  </div>
                </Link>
              </li>

              <li style={navStyles.resources} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <ImBook className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>الموارد</div>
                  </div>
                </Link>
              </li>
              <li style={navStyles.rating} className={styles.navbar_item}>
                <Link href="/instructors" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <BsStarFill className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>التقييم</div>
                  </div>
                </Link>
              </li>
              <li style={navStyles.chat} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <BsChatSquareDotsFill
                      className={styles.nav_img}
                      size="1.6em"
                    />
                    <div className={styles.link_text}>المحادثات</div>
                  </div>
                </Link>
              </li>
              <li style={navStyles.communities} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <BsFillPeopleFill className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>المجتمعات</div>
                  </div>
                </Link>
              </li>
            </div>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <div className={styles.link_btn}>
                  <FiHelpCircle className={styles.nav_img} size="1.2em" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );

  

  return (
    <ClientOnly>
      <nav className={styles.navbar}>
        <SignInModal visible={showSignIn} close={handleSignInClose} />
        <div className={styles.navbar_top}>
          <li className={styles.navbar_item}>
            <Image
              style={{ margin: 0 }}
              src="/favicon.png"
              width={35}
              height={35}
            />
          </li>
          <Button className={styles.collapser} onClick={showSidebar}>
            <FiMenu className={styles.collapse_icon} size="1.6em" />
          </Button>
          <div className={styles.navbar_side} style={sideBarStyle}>
            <div
              onClick={showSidebar}
              className={styles.nav_overlay}
              style={overlayStyle}
            ></div>
            <ul>
              <li className={styles.navbar_item}>
                {userInfo.status.logged ? (
                  <OverlayTrigger
                    trigger="click"
                    className={styles.navbar_link}
                    placement={"left"}
                    delay={{ show: 350, hide: 400 }}
                    overlay={
                      <Popover
                        id="meow"
                        style={{ marginRight: "12 !important" }}
                        id="popover-basic"
                        show={{ show: 350, hide: 400 }}
                      >
                        <Popover.Content
                          style={{ marginRight: "12 !important" }}
                        >
                          <strong style={{ color: "#2ea5eb", fontSize: 18 }}>
                            {username}
                          </strong>
                          <br />
                          {userInfo.status.email}
                          <Button onClick={signOut}>
                            <strong>sign out</strong>
                          </Button>
                        </Popover.Content>
                      </Popover>
                    }
                    rootClose
                  >
                    <Button className={styles.navbar_link}>
                      <Image
                        style={{ margin: 0 }}
                        src={profilePic}
                        width={35}
                        height={35}
                        className={styles.profile}
                      />
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <Button
                    onClick={handleSignInShow}
                    className={styles.navbar_link}
                  >
                    <FaSignInAlt size="1.4rem" />
                  </Button>
                )}
              </li>
              <div className={styles.nav_pages}>
                <li style={navStyles.home} className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <AiFillHome className={styles.nav_img} size="1.6em" />
                      <div className={styles.link_text}>الرئيسية</div>
                    </div>
                  </Link>
                </li>
                <li style={navStyles.resources} className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <ImBook className={styles.nav_img} size="1.6em" />
                      <div className={styles.link_text}>الموارد</div>
                    </div>
                  </Link>
                </li>
                <li style={navStyles.rating} className={styles.navbar_item}>
                  <Link href="/instructors" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <BsStarFill className={styles.nav_img} size="1.6em" />
                      <div className={styles.link_text}>التقييم</div>
                    </div>
                  </Link>
                </li>
                <li style={navStyles.chat} className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <BsChatSquareDotsFill
                        className={styles.nav_img}
                        size="1.6em"
                      />
                      <div className={styles.link_text}>المحادثات</div>
                    </div>
                  </Link>
                </li>
                <li
                  style={navStyles.communities}
                  className={styles.navbar_item}
                >
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <BsFillPeopleFill
                        className={styles.nav_img}
                        size="1.6em"
                      />
                      <div className={styles.link_text}>المجتمعات</div>
                    </div>
                  </Link>
                </li>
              </div>
              {
                <li className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn}>
                      <FiHelpCircle className={styles.nav_img} size="1.2em" />
                    </div>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
        {/*layout for big screens*/}
        <div className={styles.navbar_main}>
          <ul className={styles.navbar_nav}>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <Image src="/favicon.png" width={35} height={35} />
              </Link>
            </li>

            <li
              className={styles.navbar_item}
              style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
            >
              {userInfo.status.logged ? (
                <OverlayTrigger
                  trigger="click"
                  className={styles.navbar_link}
                  placement={"left"}
                  delay={{ show: 350, hide: 400 }}
                  overlay={
                    <Popover
                      id="meow"
                      style={{ marginRight: "12 !important" }}
                      id="popover-basic"
                      show={{ show: 350, hide: 400 }}
                    >
                      <Popover.Content style={{ marginRight: "12 !important" }}>
                        <strong style={{ color: "#2ea5eb", fontSize: 18 }}>
                          {username}
                        </strong>
                        <br />
                        <div>{userInfo.status.email}</div>
                        <Button
                          variant="danger"
                          style={{ marginTop: 12, fontSize: 12 }}
                          onClick={signOut}
                        >
                          <strong>sign out</strong>
                        </Button>
                      </Popover.Content>
                    </Popover>
                  }
                  rootClose
                >
                  <Button className={styles.navbar_link}>
                    <Image
                      style={{ margin: 0 }}
                      src={profilePic}
                      width={35}
                      height={35}
                      className={styles.profile}
                    />
                  </Button>
                </OverlayTrigger>
              ) : (
                <Button
                  onClick={handleSignInShow}
                  className={styles.navbar_link}
                >
                  <FaSignInAlt size="1.4rem" />
                </Button>
              )}
            </li>
            <div className={styles.nav_pages}>
              <li style={navStyles.home} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <AiFillHome className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>الرئيسية</div>
                  </div>
                </Link>
              </li>

              <li style={navStyles.resources} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <ImBook className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>الموارد</div>
                  </div>
                </Link>
              </li>
              <li style={navStyles.rating} className={styles.navbar_item}>
                <Link href="/instructors" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <BsStarFill className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>التقييم</div>
                  </div>
                </Link>
              </li>
              <li style={navStyles.chat} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <BsChatSquareDotsFill
                      className={styles.nav_img}
                      size="1.6em"
                    />
                    <div className={styles.link_text}>المحادثات</div>
                  </div>
                </Link>
              </li>
              <li style={navStyles.communities} className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn}>
                    <BsFillPeopleFill className={styles.nav_img} size="1.6em" />
                    <div className={styles.link_text}>المجتمعات</div>
                  </div>
                </Link>
              </li>
            </div>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <div className={styles.link_btn}>
                  <FiHelpCircle className={styles.nav_img} size="1.2em" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </ClientOnly>
  );
}
