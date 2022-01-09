import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImBook } from "react-icons/im";
import { MdLanguage, MdSettings } from "react-icons/md";
import { FiHelpCircle, FiMenu } from "react-icons/fi";
import {
  BsChatSquareDotsFill,
  BsStarFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../state-management/user-state/UserContext";
import { FaSignInAlt } from "react-icons/fa";
import { OverlayTrigger } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import { useQuery, useMutation } from "@apollo/client";
import { meQuery } from "../api/queries";
import { revokeTokenMutation, profileUpdateMutation } from "../api/mutations";
import ClientOnly from "./ClientOnly";
import { USER, T, L } from "../constants";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import translator from "../dictionary/components/navbar-dict";

const SignInModal = dynamic(() => import("./SignInModal"));
/**
 * TODO:
 * - Loading state before updating the context
 *- use context instead of local storage to handle language
 */

export default function Navbar(props) {
  const { user, userDispatch } = useContext(UserContext);
  const [sideVisible, setVisible] = useState(false);
  const [sideBarStyle, setStyle] = useState({ left: "100vw" });
  const [overlayStyle, setOverlay] = useState({ display: "none" });
  const [showSignIn, setShowSignIn] = useState(false);
  
  const [SaveMsg, setSaveMsg] = useState("");

  //--- signed off state

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("/favicon.png");
  const [email, setEmail] = useState("");

  // language state
  const [lang, setLang] = useState(user.lang);
  const [langState, setLangState] = useState(() => translator(user.lang))
  useEffect(() => {
    updateLang()
  }, [lang]);

  const updateLang = 
    useCallback(() => {
      userDispatch({ type: T.CHANGE_LANG, lang: lang });
      setLangState(translator(user.lang))
    if (dataMe) profileUpdate();
  }, [lang])
  

  //--------

  // ---- query state
  // !WARNING: Use a loading component inplace of the profile image
  const {
    data: dataMe,
    loading: loadingMe,
    error: errorMe,
  } = useQuery(meQuery, {
    notifyOnNetworkStatusChange: true,
    skip: user.status !== USER.LOGGED_IN,
  });
  const [revokeToken] = useMutation(revokeTokenMutation);

  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => {
    setShowSignIn(true);
    document.body.click();
  };

  const signOut = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : "";
    await revokeToken({ variables: { refreshToken } });
    await userDispatch({
      type: T.LOGOUT,
      lang: localStorage.getItem("lang") || L.EN_US,
    });
  };

  var navStyles = {
    home: props.page === "home" ? styles["active-link"] : "",
    rating: props.page === "rating" ? styles["active-link"] : "",
    resources: props.page == "resources" ? styles["active-link"] : "",
    communities: props.page == "communities" ? styles["active-link"] : "",
    chat: props.page == "chat" ? styles["active-link"] : "",
  };

  useEffect(() => {
    if (dataMe && !loadingMe) {
      setUsername(dataMe.me.username);
      setProfilePic(dataMe.me.profile.profilePic);
      setEmail(dataMe.me.email);
      setLang(dataMe.me.profile.language);

      userDispatch({
        type: T.SET_CLIENT,
        profileId: dataMe.me.profile.id,
      });
    }
  }, [dataMe]);

  // updating user's profile
  const [
    profileUpdate,
    {
      data: dataProfileUpdate,
      loading: loadingProfileUpdate,
      error: errorProfileUpdate,
    },
  ] = useMutation(profileUpdateMutation, {
    notifyOnNetworkStatusChange: true,
    variables: { id: user.profileId, lang: lang },
  });

  useEffect(() => {
    if (loadingProfileUpdate) {
      setSaveMsg("Saving");
    } else if (dataProfileUpdate && dataProfileUpdate.profileUpdate.ok) {
      setSaveMsg("Saved");
    } else if (errorProfileUpdate) {
      setSaveMsg("Error");
    }
  }, [loadingProfileUpdate, dataProfileUpdate]);
  // -------------------------------------

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

  const showSidebar = () => {
    setVisible((prev) => !prev);
  };

  
  return (
    <ClientOnly>
      <nav className={styles.navbar}>
        <SignInModal visible={showSignIn} close={handleSignInClose} />
        <div className={styles.navbar_top}>
          <div className={styles.navbar_item}>
            <Image
              style={{ margin: 0 }}
              src="/favicon.webp"
              width={30}
              height={30}
              alt="Petroly icon"
            />
          </div>
          <Button
            aria-label="show sidebar"
            className={styles.collapser}
            onClick={showSidebar}
          >
            <FiMenu className={styles.collapse_icon} size="1.3em" />
          </Button>
          <div className={styles.navbar_side} style={sideBarStyle}>
            <div
              onClick={showSidebar}
              className={styles.nav_overlay}
              style={overlayStyle}
            ></div>
            <ul>{loadingMe ? 
             <li className={styles.navbar_item}>
                  <Spinner animation="border" role="status" />
                </li> :
              <li className={styles.navbar_item}>
                {user.status === USER.LOGGED_IN ? (
                  <OverlayTrigger
                    trigger="click"
                    className={styles.navbar_link}
                    placement={"left"}
                    delay={{ show: 350, hide: 400 }}
                    overlay={
                      <Popover
                        style={{ marginRight: "12 !important" }}
                        id="popover-basic"
                        show={{ show: 350, hide: 400 }}
                      >
                        <Popover.Content
                          style={{ marginRight: "12 !important" }}
                        >
                          <div className={styles["popup-info"]}>
                            <div className={styles["popup-pic"]}>
                              <Image
                                style={{ margin: 0 }}
                                src={profilePic}
                                width={22}
                                height={22}
                                className={styles.profile}
                                alt="Petroly Icon"
                              />
                            </div>
                            <div className={styles["popup-txt"]}>
                              <strong
                                style={{ color: "#2ecfeb", fontSize: 18 }}
                              >
                                {username}
                              </strong>
                              <br />
                              {email}
                            </div>
                          </div>
                          <div className={styles["btn-container"]}>
                            <Link href="/Dashboard">
                              <div className={styles["info-btn"]}>
                                <MdDashboard
                                  size="1rem"
                                  style={{ marginLeft: 8 }}
                                />
                                {langState.dashboard}
                              </div>
                            </Link>
                            <Button
                              className={styles["signout-btn"]}
                              onClick={signOut}
                              aria-label="sign-out"
                            >
                              <div>
                                {" "}
                                <FaSignInAlt
                                  size="1rem"
                                  style={{ marginLeft: 8 }}
                                />
                                {langState.logout}
                              </div>
                            </Button>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                    rootClose
                  >
                    <Button aria-label="profile" className={styles.navbar_link}>
                      <Image
                        style={{ margin: 0 }}
                        src={profilePic}
                        width={30}
                        height={30}
                        className={styles.profile}
                        alt="Petroly Icon"
                      />
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <Button
                    onClick={handleSignInShow}
                    className={styles.navbar_link}
                    aria-label="sign-in"
                  >
                    <FaSignInAlt size="1rem" />{" "}
                  </Button>
                )}
              </li>}
              <li
                className={styles.navbar_item}
                style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
              >
                {user.status === USER.LOGGED_IN ? (
                  <OverlayTrigger
                    trigger="click"
                    className={styles.navbar_link}
                    placement={"left"}
                    delay={{ show: 350, hide: 400 }}
                    overlay={
                      <Popover
                        style={{ marginRight: "12 !important" }}
                        id="popover-basic"
                        show={{ show: 350, hide: 400 }}
                      >
                        <Popover.Content
                          style={{ marginRight: "12 !important" }}
                        >
                          <div className={styles["popup-info"]}>settings</div>
                          <div className={styles["btn-container"]}>
                            {lang === L.AR_SA ? (
                              <div
                                className="mb-2"
                                style={{ direction: "rtl", fontSize: 12 }}
                              >
                                <MdLanguage
                                  size="1.4rem"
                                  style={{ margin: "5px !important" }}
                                  color="rgb(170, 170, 170)"
                                />
                                <span style={{ marginRight: 6 }}> اللغة</span>
                              </div>
                            ) : (
                              <div className="mb-2" style={{ fontSize: 12 }}>
                                {" "}
                                <MdLanguage
                                  color="rgb(170, 170, 170)"
                                  size="1.4rem"
                                />
                                <span style={{ marginRight: 6 }}>
                                  language <strong>{SaveMsg}</strong>
                                </span>
                              </div>
                            )}
                            <ButtonGroup className={styles["lang-switch"]}>
                              <Button
                                onClick={() => {
                                  setLang(L.AR_SA);
                                }}
                                className={
                                  styles["lang-switch"] +
                                  ` ${
                                    lang === L.AR_SA
                                      ? styles["lang-active"]
                                      : ""
                                  }`
                                }
                              >
                                العربية
                              </Button>
                              <Button
                                onClick={() => {
                                  setLang(L.EN_US);
                                }}
                                className={
                                  styles["lang-switch"] +
                                  ` ${
                                    lang === L.EN_US
                                      ? styles["lang-active"]
                                      : ""
                                  }`
                                }
                              >
                                English
                              </Button>
                            </ButtonGroup>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                    rootClose
                  >
                    <Button aria-label="profile" className={styles.navbar_link}>
                      <MdSettings size="24px" />
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    trigger="click"
                    className={styles.navbar_link}
                    placement={"left"}
                    delay={{ show: 350, hide: 400 }}
                    overlay={
                      <Popover
                        style={{ marginRight: "12 !important" }}
                        id="popover-basic"
                        show={{ show: 350, hide: 400 }}
                      >
                        <Popover.Content
                          style={{ marginRight: "12 !important" }}
                        >
                          <div className={styles["popup-info"]}>settings</div>
                          <div className={styles["btn-container"]}>
                            {lang === L.AR_SA ? (
                              <div
                                className="mb-2"
                                style={{ direction: "rtl", fontSize: 12 }}
                              >
                                <MdLanguage
                                  size="1.4rem"
                                  style={{ margin: "5px !important" }}
                                  color="rgb(170, 170, 170)"
                                />
                                <span style={{ marginRight: 6 }}> اللغة</span>
                              </div>
                            ) : (
                              <div
                                className="mb-2"
                                style={{
                                  fontSize: 12,
                                  color: "rgb(170, 170, 170)",
                                }}
                              >
                                {" "}
                                <MdLanguage
                                  color="rgb(170, 170, 170)"
                                  size="1.4rem"
                                />
                                <span
                                  style={{
                                    marginRight: 6,
                                    color: "rgb(170, 170, 170)",
                                  }}
                                >
                                  language
                                </span>
                              </div>
                            )}
                            <ButtonGroup className={styles["lang-switch"]}>
                              <Button
                                onClick={() => {
                                  setLang(L.AR_SA);
                                }}
                                className={
                                  styles["lang-switch"] +
                                  ` ${
                                    lang === L.AR_SA
                                      ? styles["lang-active"]
                                      : ""
                                  }`
                                }
                              >
                                العربية
                              </Button>
                              <Button
                                onClick={() => {
                                  setLang(L.EN_US);
                                }}
                                className={
                                  styles["lang-switch"] +
                                  ` ${
                                    lang === L.EN_US
                                      ? styles["lang-active"]
                                      : ""
                                  }`
                                }
                              >
                                English
                              </Button>
                            </ButtonGroup>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                    rootClose
                  >
                    <Button aria-label="profile" className={styles.navbar_link}>
                      <MdSettings size="24px" />
                    </Button>
                  </OverlayTrigger>
                )}
              </li>
              <div className={styles.nav_pages}>
                <li className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn + " " + navStyles.home}>
                      <AiFillHome className={styles.nav_img} size="1.3em" />
                      <div className={styles.link_text}>{langState.home}</div>
                    </div>
                  </Link>ت
                </li>
                {/* <li className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div
                      className={styles.link_btn + " " + navStyles.resources}
                    >
                      <ImBook className={styles.nav_img} size="1.3em" />
                      <div className={styles.link_text}>الموارد</div>
                    </div>
                  </Link>
                </li> */}
                <li className={styles.navbar_item}>
                  <Link href="/instructors" className={styles.navbar_link}>
                    <div className={styles.link_btn + " " + navStyles.rating}>
                      <BsStarFill className={styles.nav_img} size="1.3em" />
                      <div className={styles.link_text}>{langState.rating}</div>
                    </div>
                  </Link>
                </li>
                {/* <li className={styles.navbar_item}>
                  <Link href="/" className={styles.navbar_link}>
                    <div className={styles.link_btn + " " + navStyles.chat}>
                      <BsChatSquareDotsFill
                        className={styles.nav_img}
                        size="1.3em"
                      />
                      <div className={styles.link_text}>المحادثات</div>
                    </div>
                  </Link>
                </li> */}
                <li className={styles.navbar_item}>
                  <Link href="/Groups" className={styles.navbar_link}>
                    <div className={styles.link_btn + " " + navStyles.chat}>
                      <BsFillPeopleFill
                        className={styles.nav_img}
                        size="1.3em"
                      />
                      <div className={styles.link_text}>{langState.Groups}</div>
                    </div>
                  </Link>
                </li>
              </div>
              {
                <li className={styles.navbar_item}>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://forms.gle/dFhnn6qSeTJBfc5ZA"
                    className={styles.navbar_link}
                  >
                    <div className={styles.link_btn}>
                      <FiHelpCircle className={styles.nav_img} size="1.2em" />
                      <div className={styles.link_text}>{langState.support}</div>
                    </div>
                  </a>
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
                <Image
                  alt="Petroly Icon"
                  src="/favicon.webp"
                  width={30}
                  height={30}
                />
              </Link>
            </li>
            { loadingMe ?
             <li className={styles.navbar_item}>
                  <Spinner animation="border" role="status" />
                </li> :
            <li className={styles.navbar_item}>
              {user.status === USER.LOGGED_IN ? (
                <OverlayTrigger
                  trigger="click"
                  className={styles.navbar_link}
                  placement={"left"}
                  delay={{ show: 350, hide: 400 }}
                  overlay={
                    <Popover
                      style={{ marginRight: "12 !important" }}
                      id="popover-basic"
                      show={{ show: 350, hide: 400 }}
                    >
                      <Popover.Content style={{ marginRight: "12 !important" }}>
                        <div className={styles["popup-info"]}>
                          <div className={styles["popup-pic"]}>
                            <Image
                              style={{ margin: 0 }}
                              src={profilePic}
                              width={22}
                              height={22}
                              className={styles.profile}
                              alt="Petroly Icon"
                            />
                          </div>
                          <div className={styles["popup-txt"]}>
                            <strong style={{ color: "#2ecfeb", fontSize: 18 }}>
                              {username}
                            </strong>
                            <br />
                            {email}
                          </div>
                        </div>
                        <div className={styles["btn-container"]}>
                          <Link href="/Dashboard">
                            <div className={styles["info-btn"]}>
                              <MdDashboard
                                size="1rem"
                                style={{ marginLeft: 8 }}
                              />
                              {langState.dashboard}
                            </div>
                          </Link>
                          <Button
                            className={styles["signout-btn"]}
                            onClick={signOut}
                            aria-label="sign-out"
                          >
                            <div>
                              {" "}
                              <FaSignInAlt
                                size="1rem"
                                style={{ marginLeft: 8 }}
                              />
                              {langState.logout}
                            </div>
                          </Button>
                        </div>
                      </Popover.Content>
                    </Popover>
                  }
                  rootClose
                >
                  <Button aria-label="profile" className={styles.navbar_link}>
                    <Image
                      style={{ margin: 0 }}
                      src={profilePic}
                      width={30}
                      height={30}
                      className={styles.profile}
                      alt="Petroly Icon"
                    />
                  </Button>
                </OverlayTrigger>
              ) : (
                <Button
                  onClick={handleSignInShow}
                  className={styles.navbar_link}
                  aria-label="sign-in"
                >
                  <FaSignInAlt size="1rem" />{" "}
                </Button>
              )}
            </li>}
            <li
              className={styles.navbar_item}
              style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
            >
              {user.status === USER.LOGGED_IN ? (
                <OverlayTrigger
                  trigger="click"
                  className={styles.navbar_link}
                  placement={"left"}
                  delay={{ show: 350, hide: 400 }}
                  overlay={
                    <Popover
                      style={{ marginRight: "12 !important" }}
                      id="popover-basic"
                      show={{ show: 350, hide: 400 }}
                    >
                      <Popover.Content style={{ marginRight: "12 !important" }}>
                        <div
                          style={{
                            direction: `${
                              lang === L.EN_US ? "ltr" : "rtl"
                            }`,
                          }}
                          className={styles["popup-info"]}
                        >{langState.settings}</div>
                        <div className={styles["btn-container"]}>
                          {lang === L.AR_SA ? (
                            <div
                              className="mb-2"
                              style={{ direction: "rtl", fontSize: 12 }}
                            >
                              <MdLanguage
                                size="1.4rem"
                                style={{ margin: "5px !important" }}
                                color="rgb(170, 170, 170)"
                              />
                              <span style={{ marginRight: 6 }}> اللغة</span>
                            </div>
                          ) : (
                            <div
                              className="mb-2"
                              style={{
                                direction: "ltr",
                                fontSize: 12,
                                width: "100%",
                              }}
                            >
                              {" "}
                              <MdLanguage
                                color="rgb(170, 170, 170)"
                                size="1.4rem"
                              />
                              <span style={{ marginLeft: 6 }}>
                                language <strong>{SaveMsg}</strong>
                              </span>
                            </div>
                          )}
                          <ButtonGroup className={styles["lang-switch"]}>
                            <Button
                              onClick={() => {
                                setLang(L.AR_SA);
                              }}
                              className={
                                styles["lang-switch"] +
                                ` ${
                                  lang === L.AR_SA
                                    ? styles["lang-active"]
                                    : ""
                                }`
                              }
                            >
                              العربية
                            </Button>
                            <Button
                              onClick={() => {
                                setLang(L.EN_US);
                              }}
                              className={
                                styles["lang-switch"] +
                                ` ${
                                  lang === L.EN_US
                                    ? styles["lang-active"]
                                    : ""
                                }`
                              }
                            >
                              English
                            </Button>
                          </ButtonGroup>
                        </div>
                      </Popover.Content>
                    </Popover>
                  }
                  rootClose
                >
                  <Button aria-label="profile" className={styles.navbar_link}>
                    <MdSettings size="24px" />
                  </Button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  trigger="click"
                  className={styles.navbar_link}
                  placement={"left"}
                  delay={{ show: 350, hide: 400 }}
                  overlay={
                    <Popover
                      style={{ marginRight: "12 !important" }}
                      id="popover-basic"
                      show={{ show: 350, hide: 400 }}
                    >
                      <Popover.Content style={{ marginRight: "12 !important" }}>
                        <div className={styles["popup-info"]}>settings</div>
                        <div className={styles["btn-container"]}>
                          {lang === L.AR_SA ? (
                            <div
                              className="mb-2"
                              style={{ direction: "rtl", fontSize: 12 }}
                            >
                              <MdLanguage
                                size="1.4rem"
                                style={{ margin: "5px !important" }}
                                color="rgb(170, 170, 170)"
                              />
                              <span style={{ marginRight: 6 }}> اللغة</span>
                            </div>
                          ) : (
                            <div
                              className="mb-2"
                              style={{
                                fontSize: 12,
                                color: "rgb(170, 170, 170)",
                              }}
                            >
                              {" "}
                              <MdLanguage
                                color="rgb(170, 170, 170)"
                                size="1.4rem"
                              />
                              <span
                                style={{
                                  marginRight: 6,
                                  color: "rgb(170, 170, 170)",
                                }}
                              >
                                language
                              </span>
                            </div>
                          )}
                          <ButtonGroup className={styles["lang-switch"]}>
                            <Button
                              onClick={() => {
                                setLang(L.AR_SA);
                              }}
                              className={
                                styles["lang-switch"] +
                                ` ${
                                  lang === L.AR_SA
                                    ? styles["lang-active"]
                                    : ""
                                }`
                              }
                            >
                              العربية
                            </Button>
                            <Button
                              onClick={() => {
                                setLang(L.EN_US);
                              }}
                              className={
                                styles["lang-switch"] +
                                ` ${
                                  lang === L.EN_US
                                    ? styles["lang-active"]
                                    : ""
                                }`
                              }
                            >
                              English
                            </Button>
                          </ButtonGroup>
                        </div>
                      </Popover.Content>
                    </Popover>
                  }
                  rootClose
                >
                  <Button aria-label="profile" className={styles.navbar_link}>
                    <MdSettings size="24px" />
                  </Button>
                </OverlayTrigger>
              )}
            </li>
            <div className={styles.nav_pages}>
              <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn + " " + navStyles.home}>
                    <AiFillHome className={styles.nav_img} size="1.3em" />
                    <div className={styles.link_text}>{langState.home}</div>
                  </div>
                </Link>
              </li>

              {/* <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn + " " + navStyles.resources}>
                    <ImBook className={styles.nav_img} size="1.3em" />
                    <div className={styles.link_text}>الموارد</div>
                  </div>
                </Link>
              </li> */}
              <li className={styles.navbar_item}>
                <Link href="/instructors" className={styles.navbar_link}>
                  <div className={styles.link_btn + " " + navStyles.rating}>
                    <BsStarFill className={styles.nav_img} size="1.3em" />
                    <div className={styles.link_text}>{langState.rating}</div>
                  </div>
                </Link>
              </li>
              {/* <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <div className={styles.link_btn + " " + navStyles.chat}>
                    <BsChatSquareDotsFill
                      className={styles.nav_img}
                      size="1.3em"
                    />
                    <div className={styles.link_text}>المحادثات</div>
                  </div>
                </Link>
              </li> */}
              <li className={styles.navbar_item}>
                <Link href="/Groups" className={styles.navbar_link}>
                  <div
                    className={styles.link_btn + " " + navStyles.communities}
                  >
                    <BsFillPeopleFill className={styles.nav_img} size="1.3em" />
                    <div className={styles.link_text}>{langState.groups}</div>
                  </div>
                </Link>
              </li>
            </div>
            <li className={styles.navbar_item}>
              <a
                target="_blank"
                rel="noopener"
                href="https://forms.gle/dFhnn6qSeTJBfc5ZA"
                className={styles.navbar_link}
              >
                <div className={styles.link_btn}>
                  <FiHelpCircle className={styles.nav_img} size="1.2em" />

                  <div className={styles.link_text}>{langState.support}</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </ClientOnly>
  );
}
