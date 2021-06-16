import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { ImBook } from "react-icons/im";
import { FiHelpCircle, FiMenu } from "react-icons/fi";
import { BsChatSquareDotsFill, BsStarFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { normalizeConfig } from "next/dist/next-server/server/config-shared";

export default function Navbar() {
  const [sideVisible, setVisible] = useState(false);
  const [sideBarStyle, setStyle] = useState({ left: "100vw" });
  const [overlayStyle, setOverlay] = useState({ display: "none" });

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
              <Link href="/" className={styles.navbar_link}>
                <Image
                  className={styles.profile}
                  src="/images/muhabpower.png"
                  width="40"
                  height="40"
                />
              </Link>
            </li>
            <div className={styles.nav_pages}>
              <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <AiFillHome className={styles.nav_img} size="1.6em" />
                </Link>
                <div className={styles.link_text}>الرئيسية</div>
              </li>
              <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <ImBook className={styles.nav_img} size="1.6em" />
                </Link>
                <div className={styles.link_text}>الموارد</div>
              </li>
              <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <BsStarFill className={styles.nav_img} size="1.6em" />
                </Link>
                <div className={styles.link_text}>التقييم</div>
              </li>
              <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <BsChatSquareDotsFill
                    className={styles.nav_img}
                    size="1.6em"
                  />
                </Link>
                <div className={styles.link_text}>المحادثات</div>
              </li>
            </div>
            {
              <li className={styles.navbar_item}>
                <Link href="/" className={styles.navbar_link}>
                  <FiHelpCircle className={styles.nav_img} size="1.5em" />
                </Link>
                <div className={styles.link_text}>الدعم </div>
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
              <Image src="/favicon.png" width={40} height={40} />
            </Link>
          </li>
          <li
            className={styles.navbar_item}
            style={{ boxShadow: "0 2px 3px rgb(204, 202, 202)" }}
          >
            <Link href="/" className={styles.navbar_link}>
              <Image
                className={styles.profile}
                src="/images/muhabpower.png"
                width="40"
                height="40"
              />
            </Link>
          </li>
          <div className={styles.nav_pages}>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <AiFillHome className={styles.nav_img} size="1.6em" />
              </Link>
              <div className={styles.link_text}>الرئيسية</div>
            </li>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <ImBook className={styles.nav_img} size="1.6em" />
              </Link>
              <div className={styles.link_text}>الموارد</div>
            </li>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <BsStarFill className={styles.nav_img} size="1.6em" />
              </Link>
              <div className={styles.link_text}>التقييم</div>
            </li>
            <li className={styles.navbar_item}>
              <Link href="/" className={styles.navbar_link}>
                <BsChatSquareDotsFill className={styles.nav_img} size="1.6em" />
              </Link>
              <div className={styles.link_text}>المحادثات</div>
            </li>
          </div>
          <li className={styles.navbar_item}>
            <Link href="/" className={styles.navbar_link}>
              <FiHelpCircle className={styles.nav_img} size="1.5em" />
            </Link>
            <div className={[styles.link_text, styles.meowmeomeow]}>الدعم </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
