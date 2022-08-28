import styles from "../../styles/navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImBook } from "react-icons/im";
import { FaMoon, FaSignInAlt } from "react-icons/fa";
import { MdLanguage, MdSettings, MdRadar } from "react-icons/md";
import { FiHelpCircle, FiMenu } from "react-icons/fi";
import {
  BsChatSquareDotsFill,
  BsStarFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { FaPatreon } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import { useContext, useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Tooltip, OverlayTrigger, Popover } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../../state-management/user-state/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import { meQuery } from "../../api/queries";
import {
  revokeTokenMutation,
  profileUpdateMutation,
} from "../../api/mutations";
import ClientOnly from "../ClientOnly";
import {
  USER,
  T,
  L,
  M,
  langDirection,
  DEF_LANG,
  DEF_THEME,
} from "../../constants";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import translator from "../../dictionary/components/navbar-dict";
import { NavContext } from "../../state-management/navbar-state/NavbarContext";
import SignInModal from "./SignInModal";
import { useRouter } from "next/router";
import ProfileWidget from "./ProfileWidget";
import SettingsWidget from "./SettingsWidget";

/**
 * TODO:
 * - Loading state before updating the context
 *- use context instead of local storage to handle language
 */

export default function Navbar(props) {
  const { user, userDispatch } = useContext((() => UserContext)());
  const { navState } = useContext((() => NavContext)());

  const [sideVisible, setVisible] = useState(false);
  const [sideBarStyle, setStyle] = useState({ left: "100vw", display: "flex" });
  const [overlayStyle, setOverlay] = useState({ display: "none" });
  const [showSignIn, setShowSignIn] = useState(false);
  const [SaveMsg, setSaveMsg] = useState("");
  const [activated, setActive] = useState(true);
  const router = useRouter();
  //--- signed off state

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("/favicon.png");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(user.theme);
  // language state
  const [lang, setLang] = useState(user.lang);
  const [langState, setLangState] = useState(() => translator(user.lang));
  useEffect(() => {
    updateLang();
  }, [lang]);

  const updateLang = useCallback(() => {
    userDispatch({ type: T.CHANGE_LANG, lang: lang });
    setLangState(translator(lang));
    console.log(translator(lang));
  }, [lang, user.status]);

  useEffect(() => {
    userDispatch({ type: T.CHANGE_THEME, theme: theme });
  }, [theme, user.status]);

  useEffect(() => {
    // console.log(user);
    if (document && sideVisible)
      document.getElementById("navbar-overlay").click();
  }, [navState]);

  //--------

  // ---- query state

  const {
    data: dataMe,
    loading: loadingMe,
    error: errorMe,
  } = useQuery(meQuery, {
    notifyOnNetworkStatusChange: true,
    skip: user.status !== USER.SETTING,
    initialFetchPolicy: "cache-first",
    fetchPolicy: "cache-first",
  });
  const [revokeToken] = useMutation(revokeTokenMutation);

  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => {
    // console.log(user.theme);
    document.querySelector("#navbar-overlay").click();
    setShowSignIn(true);
  };

  const signOut = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : "";

    if (navState.current === "notifier") {
      router.push("/home").then(async () => {
        await revokeToken({ variables: { refreshToken } });
        await userDispatch({
          type: T.LOGOUT,
          lang: localStorage.getItem("lang") || L.EN_US,
        });
      });
    } else {
      await revokeToken({ variables: { refreshToken } });
      await userDispatch({
        type: T.LOGOUT,
        lang: localStorage.getItem("lang") || L.EN_US,
      });
    }
  };

  var navStyles = {
    home: navState.current === "home" ? styles["active-link"] : "",
    rating: navState.current === "rating" ? styles["active-link"] : "",
    resources: navState.current === "resources" ? styles["active-link"] : "",
    communities:
      navState.current === "communities" ? styles["active-link"] : "",
    notifier: navState.current === "notifier" ? styles["active-link"] : "",
  };

  useEffect(() => {
    if (dataMe && !loadingMe) {
      setUsername(dataMe.me.username);
      setProfilePic(dataMe.me.profile.profilePic);
      setEmail(dataMe.me.email);
      setLang(dataMe.me.profile.language);
      setTheme(dataMe.me.profile.theme);
      userDispatch({
        type: T.SET_ME,
        profileId: dataMe.me.profile.pk,
        id: dataMe.me.pk,
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
    variables: { id: user.profileId, theme, lang },
  });

  useEffect(() => {
    if (loadingProfileUpdate) {
      setSaveMsg("Saving");
    } else if (dataProfileUpdate && dataProfileUpdate.profileUpdate.pk) {
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

  useEffect(() => {
    if (user.status === USER.LOGGED_IN) {
      profileUpdate();
    }
  }, [lang, theme]);

  return (
    <ClientOnly>
      <nav className={styles.navbar}>
        <SignInModal visible={showSignIn} close={handleSignInClose} />
        <div
          className={
            styles.navbar_top +
            ` ${theme === M.DARK ? styles["dark-topper"] : ""}`
          }
        >
          <div className={styles.navbar_item}>
            <Link href="/" className={styles.navbar_link}>
              <Image
                style={{ margin: 0 }}
                src="/favicon.svg"
                width={30}
                height={30}
                alt="Petroly icon"
              />
            </Link>
          </div>
          <Button
            aria-label="show sidebar"
            className={
              styles.collapser +
              ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
            }
            onClick={showSidebar}
          >
            <FiMenu className={styles.collapse_icon} size="1.3em" />
          </Button>
          <div
            className={
              styles.navbar_side +
              ` ${user.theme === M.DARK ? styles["dark-topper"] : ""}`
            }
            style={sideBarStyle}
          >
            <div
              id="navbar-overlay"
              onClick={showSidebar}
              className={styles.nav_overlay}
              style={overlayStyle}
            ></div>
            <ul>
              {loadingMe ? (
                <li className={styles.navbar_item}>
                  <Spinner animation="border" role="status" />
                </li>
              ) : (
                <li className={styles.navbar_item}>
                  {user.status === USER.LOGGED_IN ? (
                    <ProfileWidget
                      username={username}
                      profilePic={profilePic}
                      email={email}
                      theme={theme}
                      langState={langState}
                      signOut={signOut}
                    />
                  ) : (
                    <Button
                      onClick={handleSignInShow}
                      className={styles.navbar_link}
                      aria-label="sign-in"
                      id="sign-in"
                    >
                      <FaSignInAlt size="1rem" />{" "}
                    </Button>
                  )}
                </li>
              )}
              <li
                className={styles.navbar_item}
                // style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
              >
                <SettingsWidget
                  user={user}
                  SaveMsg={SaveMsg}
                  theme={theme}
                  setTheme={setTheme}
                  lang={lang}
                  setLang={setLang}
                  langState={langState}
                />
              </li>
              <OverlayTrigger
                placement="left"
                trigger={"hover"}
                delay={{ show: 0, hide: 50 }}
                overlay={
                  <Tooltip id="button-tooltip-2">{langState.patreon}</Tooltip>
                }
              >
                <li
                  className={styles.navbar_item}
                  style={{ marginBottom: "auto" }}
                >
                  <a
                    href="https://patreon.com/petroly_initiative"
                    target={"_blank"}
                    rel="noreferrer"
                    className={
                      styles["support-btn"] +
                      ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                    }
                  >
                    <div className={styles.link_btn}></div>
                    <FaPatreon className={styles["btn-icons"]} />
                  </a>
                </li>
              </OverlayTrigger>
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
                    <div
                      className={styles.link_btn + " " + navStyles.resources}
                    >
                      <ImBook className={styles.nav_img} size="1.3em" />
                      <div className={styles.link_text}>الموارد</div>
                    </div>
                  </Link>
                </li> */}
                <li id="rating" className={styles.navbar_item}>
                  <Link href="/instructors" className={styles.navbar_link}>
                    <div className={styles.link_btn + " " + navStyles.rating}>
                      <BsStarFill className={styles.nav_img} size="1.3em" />
                      <div className={styles.link_text}>{langState.rating}</div>
                    </div>
                  </Link>
                </li>
                <li id="notifier-btn" className={styles.navbar_item}>
                  <Link href="/Notifier" className={styles.navbar_link}>
                    <div className={styles.link_btn + " " + navStyles.notifier}>
                      <MdRadar className={styles.nav_img} size="1.3em" />
                      <div className={styles.link_text}>{langState.radar}</div>
                    </div>
                  </Link>
                </li>
                <li id="groups-btn" className={styles.navbar_item}>
                  <Link href="/Groups" className={styles.navbar_link}>
                    <div
                      className={styles.link_btn + " " + navStyles.communities}
                    >
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
                <li
                  style={{ marginTop: "auto" }}
                  className={styles.navbar_item}
                >
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://forms.gle/dFhnn6qSeTJBfc5ZA"
                    className={styles.navbar_link}
                  >
                    <div className={styles.link_btn}>
                      <FiHelpCircle className={styles.nav_img} size="1.2em" />
                      <div className={styles.link_text}>
                        {langState.support}
                      </div>
                    </div>
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
        {/*layout for big screens*/}
        <div
          className={
            styles.navbar_main +
            ` ${theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          <ul
            className={
              styles.navbar_nav +
              ` ${theme === M.DARK ? styles["dark-mode"] : ""}`
            }
          >
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <Image
                  alt="Petroly Icon"
                  src="/favicon.svg"
                  width={30}
                  height={30}
                />
              </Link>
            </li>
            {loadingMe ? (
              <li className={styles.navbar_item}>
                <Spinner animation="border" role="status" />
              </li>
            ) : (
              <li className={styles.navbar_item}>
                {user.status === USER.LOGGED_IN ? (
                  <ProfileWidget
                    username={username}
                    profilePic={profilePic}
                    email={email}
                    theme={theme}
                    langState={langState}
                    signOut={signOut}
                  />
                ) : (
                  <Button
                    onClick={handleSignInShow}
                    className={styles.navbar_link}
                    aria-label="sign-in"
                    id="sign-in"
                  >
                    <FaSignInAlt size="1rem" />{" "}
                  </Button>
                )}
              </li>
            )}
            <li
              className={styles.navbar_item}
              // style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
            >
              <SettingsWidget
                user={user}
                SaveMsg={SaveMsg}
                theme={theme}
                setTheme={setTheme}
                lang={lang}
                setLang={setLang}
                langState={langState}
              />
            </li>
            <OverlayTrigger
              placement="left"
              trigger={"hover"}
              delay={{ show: 0, hide: 50 }}
              overlay={
                <Tooltip id="button-tooltip-2">{langState.patreon}</Tooltip>
              }
            >
              <li
                style={{ marginBottom: "auto" }}
                className={styles.navbar_item}
              >
                <a
                  href="https://patreon.com/petroly_initiative"
                  target={"_blank"}
                  rel="noreferrer"
                  className={
                    styles["support-btn"] +
                    ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                  }
                >
                  <div className={styles.link_btn}></div>
                  <FaPatreon className={styles["btn-icons"]} />
                </a>
              </li>
            </OverlayTrigger>
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
              <li id="rating" className={styles.navbar_item}>
                <Link href="/instructors" className={styles.navbar_link}>
                  <div className={styles.link_btn + " " + navStyles.rating}>
                    <BsStarFill className={styles.nav_img} size="1.3em" />
                    <div className={styles.link_text}>{langState.rating}</div>
                  </div>
                </Link>
              </li>
              <li id="notifier-btn" className={styles.navbar_item}>
                <Link href="/Notifier" className={styles.navbar_link}>
                  <div className={styles.link_btn + " " + navStyles.notifier}>
                    <MdRadar className={styles.nav_img} size="1.3em" />
                    <div className={styles.link_text}>{langState.radar}</div>
                  </div>
                </Link>
              </li>
              <li id="groups-btn" className={styles.navbar_item}>
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
            <li style={{ marginTop: "auto" }} className={styles.navbar_item}>
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
