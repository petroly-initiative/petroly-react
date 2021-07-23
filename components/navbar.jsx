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
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import SignInModal from "./SignInModal";

/**
 * TODO:
 * -  Create slots for the new services
 * -  Creat an indication in the props to light up the current page
 *
 */

export default function Navbar(props) {
  const [sideVisible, setVisible] = useState(false);
  const [sideBarStyle, setStyle] = useState({ left: "100vw" });
  const [overlayStyle, setOverlay] = useState({ display: "none" });

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  var navStyles = {
    home: { color: props.page == "home" ? "#00dfc8" : "" },
    rating: { color: props.page == "rating" ? "#00dfc8" : "" },
    resources: { color: props.page == "resources" ? "#00dfc8" : "" },
    communities: { color: props.page == "communities" ? "#00dfc8" : "" },
    chat: { color: props.page == "chat" ? "#00dfc8" : "" },
  };

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
    console.log(sideVisible);
    setVisible((prev) => !prev);
  };

  const overlayExit = () => {
    setVisible(false);
  };

  return (
    <nav className={styles.navbar}>
      <SignInModal visible={showModal} close={handleClose} />
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
              <Button
                style={{ background: "none !important" }}
                onClick={handleShow}
                className={styles.navbar_link}
              >
                <Image
                  className={styles.profile}
                  src="/images/muhabpower.png"
                  width="35"
                  height="35"
                />
              </Button>
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
            <Button onClick={handleShow} className={styles.navbar_link}>
              <Image
                className={styles.profile}
                src="/images/muhabpower.png"
                width="30"
                height="30"
              />
            </Button>
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
}
