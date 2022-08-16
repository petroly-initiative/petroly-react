import styles from "../../styles/utilities/profile_widget.module.scss"
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { M } from "../../constants";
import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";


export default function ProfileWidget(props) {
  return (
    <OverlayTrigger
      trigger="click"
      className={styles.navbar_link}
      placement={"left"}
      delay={{
        show: 350,
        hide: 400,
      }}
      overlay={
        <Popover
          className={` ${props.theme === M.DARK ? styles["dark-mode"] : ""}`}
          style={{
            marginRight: "12 !important",
          }}
          id="popover-basic"
          show={{
            show: 350,
            hide: 400,
          }}
        >
          <Popover.Body
            style={{
              marginRight: "12 !important",
            }}
          >
            <div className={styles["popup-info"]}>
              <div className={styles["popup-pic"]}>
                <Image
                  style={{
                    margin: 0,
                  }}
                  src={props.profilePic}
                  width={22}
                  height={22}
                  className={styles.profile}
                  alt="Petroly Icon"
                />
              </div>
              <div className={styles["popup-txt"]}>
                <strong
                  style={{
                    color: "#2ecfeb",
                    fontSize: 18,
                  }}
                >
                  {props.username}
                </strong>
                <br />
                <span
                  className={` ${
                    props.theme === M.DARK ? styles["dark-mode"] : ""
                  }`}
                >
                  {props.email}
                </span>
              </div>
            </div>
            <div className={styles["btn-container"]}>
              <Link href="/Dashboard">
                <div className={styles["info-btn"]}>
                  <MdDashboard
                    size="1rem"
                    style={{
                      marginLeft: 8,
                    }}
                  />
                  {props.langState.dashboard}
                </div>
              </Link>
              <Button
                className={styles["signout-btn"]}
                onClick={props.signOut}
                aria-label="sign-out"
              >
                <div>
                  {" "}
                  <FaSignInAlt
                    size="1rem"
                    style={{
                      marginLeft: 8,
                    }}
                  />
                  {props.langState.logout}
                </div>
              </Button>
            </div>
          </Popover.Body>
        </Popover>
      }
      rootClose
    >
      <Button
        id="profile-btn"
        aria-label="profile"
        className={styles.navbar_link}
      >
        <Image
          style={{
            margin: 0,
          }}
          src={props.profilePic}
          width={30}
          height={30}
          className={styles.profile}
          alt="Petroly Icon"
        />
      </Button>
    </OverlayTrigger>
  );
}