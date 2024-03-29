import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import Modal from "react-bootstrap/Modal";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
  CloseButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaTelegramPlane, FaSave } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  MdWarning,
  MdNotificationsActive,
  MdEmail,
  MdCancel,
} from "react-icons/md";
import Script from "next/script";
import { BiInfoCircle } from "react-icons/bi";
import TelegramLoginButton from "react-telegram-login";
import styles from "../../styles/notifier-page/settings-modal.module.scss";

import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/notifier/settings-modal";
import { langDirection, L, M, USER } from "../../constants";

import {
  trackingListChannelsQuery,
  trackedCoursesQuery,
} from "../../api/notifierQueries";
import { updateTrackingListChannelsMutation } from "../../api/notifierMutations";
import { useQuery, useMutation } from "@apollo/client";
import { toInteger } from "lodash";

/**
 * a modal for both editing and creating a new community
 * ? params
 * @visisble controlls modal visibility
 * @handleClose the state hook controlling the visibility of the modal
 * @handleMsg a controller for the utility PopMsg component
 * @firstSetup a boolean to indicate a first setup or settings changing
 *
 * ! when the modal is in first setup mode, block the ability to exit the modal without specifying settings
 * ! user cannot confirm the submission without selecting a single channel
 *
 *
 * @returns a modal to control user settings to specify notification channel options
 */
function NotificationsModal(props) {
  // UI control state

  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  // ? instance state
  // ! initial values of checkboxes need to be provided in props
  const [telegramChecked, settelegram] = useState(false);
  const [TelegramId, setTelegramId] = useState(null);
  const [telegramHash, setTelegramHash] = useState(null);
  const [telegramDataCheck, setDataCheck] = useState(null);
  const [invalidInput, setinvalidInput] = useState(false);
  const [TelegramSuccess, setTelegramSuccess] = useState(false);

  // GraqphQL Operations
  const {
    data: trackingListChannelsData,
    loading: trackingListChannelsLoading,
    refetch: refetchChannels,
  } = useQuery(trackingListChannelsQuery, { skip: props.firstSetup });

  const [updateTrackingListChannels, { loading: updateLoading }] = useMutation(
    updateTrackingListChannelsMutation,
    {
      variables: {
        TELEGRAM: telegramChecked,
        telegramId: TelegramId,
        hash: telegramHash,
        dataCheckString: telegramDataCheck,
      },
      refetchQueries: [trackedCoursesQuery],
    }
  );

  // ? utility functions
  // TOOD: sovling anomalous email checker
  const checkChannel = (e) => {
    settelegram((state) => !state);
  };

  const onTelegramAuth = (user) => {
    // TODO: sending a mutation with the user_id (after directly launching our bot from the widget)
    // TODO: certifiying authnetication using the hash value, as mentioned in the docs at https://core.telegram.org/widgets/login,
    // ? as the bot key is not available in the frontend
    setTelegramSuccess(true);
    setinvalidInput(false);

    props.handleMsg(true, langState.successTele);
    setTelegramId(user.id.toString()); // ! necessary to avoid integer range overflow in graphQL
    setTelegramHash(user.hash);

    var check_array = [];
    for (const key in user) {
      if (key !== "hash") {
        check_array.push(`${key}=${user[key]}`);
      }
    }
    check_array.sort();
    const check_string = check_array.join("\n");

    setDataCheck(check_string);
  };

  const submitChannels = async () => {
    const result = await updateTrackingListChannels();
    if (result.data.updateTrackingListChannels) {
      setinvalidInput(false);
      props.handleClose(false);
    } else {
      setinvalidInput(true);
    }

    // if (telegramChecked && !result.data.updateTrackingListChannels) {
    //   props.handleMsg(true, langState.failEdit);
    //   setinvalidInput(true);
    // } else if (!telegramChecked && result.data.updateTrackingListChannels) {
    // } else {
    // }
  };

  const cancel = async () => {
    props.handleClose();
    await refetchChannels();

    settelegram(trackingListChannelsData.trackingListChannels.TELEGRAM);
    setinvalidInput(false);
  };

  useEffect(() => {
    if (trackingListChannelsData) {
      settelegram(trackingListChannelsData.trackingListChannels.TELEGRAM);
      setinvalidInput(false);
    }
  }, [trackingListChannelsData]);

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  return (
    <>
      <style jsx>
        {`
        .label, .title{
          direction: ${
            user.lang === L.AR_SA ? "ltr !important" : "ltr !important"
          },
          textAlign: ${
            user.lang === L.AR_SA ? "left !important" : "left !important"
          }
          }
          .label-content {
          direction: ${
            user.lang === L.AR_SA ? "rtl !important" : "ltr !important"
          },
          textAlign: ${
            user.lang === L.AR_SA ? "right !important" : "left !important"
          }
          }

       
          
          `}
      </style>
      <Modal
        backdrop="static"
        contentClassName={
          styles.layout + ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
        // controlling visibility from outer button for flexibility
        onHide={() => props.handleClose(false)}
        show={props.visible}
        aria-labelledby="contained-modal-title-vcenter"
        style={langDirection(user.lang)}
        dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
      >
        <Modal.Header
          style={langDirection(user.lang)}
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          className={`${user.theme === M.DARK ? styles["dark-mode"] : ""}`}
        >
          <Modal.Title
            className={styles.title + " title"}
            id="contained-modal-title-vcenter"

            // dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
          >
            <div
              style={{
                direction: user.lang === L.AR_SA ? "ltr" : "rtl",
                display: "flex",
                alignItems: "center",
              }}
            >
              {langState.header}{" "}
              <MdNotificationsActive
                color="#00ead3"
                className={styles["icons"]}
              />
            </div>
          </Modal.Title>

          <CloseButton
            style={{ marginLeft: user.lang === L.AR_SA ? "0" : "auto" }}
            onClick={cancel}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
            disabled={props.firstSetup}
          />
        </Modal.Header>

        <Modal.Body
          className={
            "show-grid " +
            styles["modal-body"] +
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
          }
        >
          {invalidInput && (
            <Alert
              dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
              style={{
                textAlign: `${user.lang === L.AR_SA ? "right" : "left"}`,
              }}
              className={styles["rules"]}
              key={0}
              variant="danger"
            >
              <BiInfoCircle className={styles["rules-icon"]} size="1.4rem" />
              <div>{langState.failEdit}</div>
            </Alert>
          )}
          <div style={{ marginBottom: 12 }}>{langState.instructions}</div>
          <Form className={styles.group} noValidate>
            <Form.Check
              defaultChecked={telegramChecked}
              className={styles.radio}
              name="type"
              type={"switch"}
            >
              <Form.Check.Input
                onClick={checkChannel}
                checked={telegramChecked}
                value="TELEGRAM"
                className={styles["checkers"]}
              />
              <Form.Check.Label>
                <div className={styles["channel-container"]}>
                  <div className={styles["channel-text"]}>
                    <h6
                      style={{ marginLeft: 8, marginRight: 8 }}
                      className={` ${
                        user.theme === M.DARK
                          ? styles["dark-header"] +
                            " " +
                            styles["channel-header"]
                          : styles["channel-header"]
                      }`}
                    >
                      <FaTelegramPlane
                        color="#00D7FF"
                        className={styles["channel-icon"]}
                      />{" "}
                      {langState.teleHeader}
                    </h6>
                    <span
                      style={{ marginLeft: 8, marginRight: 8 }}
                      className={` ${
                        user.theme === M.DARK
                          ? styles["dark-check"] +
                            " " +
                            styles["channel-content"]
                          : styles["channel-content"]
                      }`}
                    >
                      {langState.teleContent}
                    </span>
                    {telegramChecked && (
                      <div className={styles["tele-button"]}>
                        <TelegramLoginButton
                          botName={"petroly_bot"}
                          dataOnauth={onTelegramAuth}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Form.Check.Label>
            </Form.Check>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className={
            styles["modal-footer"] +
            ` ${user.theme === M.DARK ? styles["dark-footer"] : ""}`
          }
          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
        >
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2">{langState.cancelTooltip}</Tooltip>
            }
          >
            <Button
              id="create-group-btn"
              onClick={cancel}
              className={[styles["btns"], styles["cancel-btn"]]}
              disabled={props.firstSetup}
            >
              <MdCancel size="1.2rem" /> {langState.cancel}
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip-2">
                {" "}
                {langState.confirmTooltip}
              </Tooltip>
            }
          >
            {updateLoading ? (
              <Button
                onClick={submitChannels}
                className={[styles["btns"], styles["submit-btn"]]}
                style={{ color: "white " }}
              >
                <Spinner animation="border" role="status" />
              </Button>
            ) : (
              <Button
                onClick={submitChannels}
                className={[styles["btns"], styles["submit-btn"]]}
                disabled={invalidInput || !TelegramSuccess}
                style={{ color: "white" }}
              >
                <FaSave size="1.2rem" /> {langState.confirm}
              </Button>
            )}
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationsModal;
