import styles from "../../styles/utilities/settings_widget.module.scss";
import {ButtonGroup, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { M, L, langDirection } from "../../constants";
import { MdLanguage, MdSettings } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { RiSunFill } from "react-icons/ri";

export default function SettingsWidget(props) {
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
            <div
              className={
                styles["popup-info"] +
                ` ${props.user.theme === M.DARK ? styles["dark-mode"] : ""}`
              }
            >
              {props.langState.settings}
            </div>
            <div className={styles["btn-container"]}>
              {props.lang === L.AR_SA ? (
                <div
                  className={"mb-2 " + styles["lang-icon"]}
                  style={{
                    direction: "rtl",
                    fontSize: 12,
                  }}
                >
                  <MdLanguage
                    size="1.4rem"
                    style={{
                      margin: "5px !important",
                    }}
                    color="rgb(170, 170, 170)"
                  />
                  <span
                    className={` ${
                      props.user.theme === M.DARK ? styles["dark-mode"] : ""
                    }`}
                    style={{
                      marginRight: 6,
                    }}
                  >
                    {" "}
                    {props.langState.language}
                  </span>
                </div>
              ) : (
                <div
                  className={"mb-2 " + styles["lang-icon"]}
                  style={{
                    fontSize: 12,
                  }}
                >
                  {" "}
                  <MdLanguage color="rgb(170, 170, 170)" size="1.4rem" />
                  <span
                    className={` ${
                      props.theme === M.DARK ? styles["dark-mode"] : ""
                    }`}
                    style={{
                      marginRight: 6,
                    }}
                  >
                    language <strong>{props.SaveMsg}</strong>
                  </span>
                </div>
              )}
              {/* Language Switch */}
              <ButtonGroup
                className={
                  styles["lang-switch"] +
                  ` ${props.theme === M.DARK ? styles["dark-mode"] : ""}`
                }
              >
                <Button
                  onClick={() => {
                    props.setLang(L.AR_SA);
                  }}
                  className={
                    styles["lang-switch"] +
                    ` ${props.lang === L.AR_SA ? styles["lang-active"] : ""}` +
                    ` ${props.theme === M.DARK ? styles["dark-mode"] : ""}`
                  }
                >
                  العربية
                </Button>
                <Button
                  onClick={() => {
                    props.setLang(L.EN_US);
                  }}
                  className={
                    styles["lang-switch"] +
                    ` ${props.lang === L.EN_US ? styles["lang-active"] : ""}` +
                    ` ${props.theme === M.DARK ? styles["dark-mode"] : ""}`
                  }
                >
                  English
                </Button>
              </ButtonGroup>
              <div
                className="mb-2"
                style={{
                  fontSize: 12,
                }}
              >
                <span
                  className={` ${
                    props.user.theme === M.DARK ? styles["dark-mode"] : ""
                  }`}
                  style={Object.assign(
                    {
                      marginRight: 6,
                    },
                    langDirection(props.user.lang)
                  )}
                >
                  {props.langState.theme}
                </span>
              </div>
              {/* Theme switch */}
              <ButtonGroup
                className={
                  styles["lang-switch"] +
                  ` ${props.theme === M.DARK ? styles["dark-mode"] : ""}`
                }
              >
                <Button
                  onClick={() => {
                    props.setTheme(M.DARK);
                  }}
                  className={
                    styles["lang-switch"] +
                    ` ${props.theme === M.DARK ? styles["lang-active"] : ""}`
                  }
                >
                  <FaMoon />
                </Button>
                <Button
                  onClick={() => {
                    props.setTheme(M.LIGHT);
                  }}
                  className={
                    styles["lang-switch"] +
                    ` ${
                      props.theme === M.LIGHT
                        ? styles["lang-active"]
                        : styles["dark-mode"]
                    }`
                  }
                >
                  <RiSunFill />
                </Button>
              </ButtonGroup>
            </div>
          </Popover.Body>
        </Popover>
      }
      rootClose
    >
      <Button
        aria-label="profile"
        className={styles.navbar_link}
        id="profile-btn"
      >
        <MdSettings size="24px" />
      </Button>
    </OverlayTrigger>
  );
}
