import { useState, useContext, useEffect, useRef, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Alert, Spinner, CloseButton } from "react-bootstrap";
import { TbReplaceFilled } from "react-icons/tb";
import { BsLightning } from "react-icons/bs";
import { LuServerCog } from "react-icons/lu";
import { BiInfoCircle } from "react-icons/bi";
import { CiCloudOff } from "react-icons/ci";
import { GiAtom } from "react-icons/gi";
import styles from "../../styles/notifier-page/register-settings-modal.module.scss";

import { UserContext } from "../../state-management/user-state/UserContext";
import translator from "../../dictionary/components/notifier/register-settings-modal";
import { langDirection, L, M, REG_STRATEGY } from "../../constants";

import { registerCourseByCRN } from "../../api/notifierQueries";
import { registerCourseMutation } from "../../api/notifierMutations";
import { useMutation, useLazyQuery } from "@apollo/client";

/**
 * a modal for both editing how user wants a section to be registered
 * ? params
 * @visisble controlls modal visibility
 * @handleClose the state hook controlling the visibility of the modal
 * @handleMsg a controller for the utility PopMsg component
 *
 * @returns a modal to control user settings to specify notification channel options
 */
function RegisterModal(props) {
  // UI control state

  // ? base state
  const { user } = useContext(UserContext);
  const [langState, setLang] = useState(() => translator(user.lang));

  // ? instance state
  // ! initial values of checkboxes need to be provided in props
  const [invalidInput, setInvalidInput] = useState(null);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    strategy: "",
    withAddCrn: "",
    withDropCrn: "",
  });
  const debounceRef = useRef(null);

  ///////////////////////////////////////
  //////// GraqphQL Operations //////////
  const [
    fetchRegisterCourse,
    { data: registerCourseData, loading: registerCourseLoading },
  ] = useLazyQuery(registerCourseByCRN);

  const [updateRegisterCourse, { data: rcData, loading: rcLoading }] =
    useMutation(registerCourseMutation, {
      variables: {
        ...formData,
      },
      refetchQueries: [registerCourseByCRN],
    });

  useEffect(() => {
    if (rcData?.registerCourseUpdate.code === "SUCCESS") setInvalidInput(null);
    else setInvalidInput(rcData?.registerCourseUpdate.message);
  }, [rcData]);

  useEffect(() => {
    if (registerCourseData) {
      const newData = {
        id: registerCourseData.registerCourseByCrn.id,
        strategy: registerCourseData.registerCourseByCrn.strategy,
        withAddCrn: registerCourseData.registerCourseByCrn.withAdd?.crn || "",
        withDropCrn: registerCourseData.registerCourseByCrn.withDrop?.crn || "",
      };
      setFormData(newData);
    }
  }, [registerCourseData]);

  useEffect(() => {
    if (!(registerCourseLoading || rcLoading)) setUpdateLoading(false);
    else setUpdateLoading(true);
  }, [registerCourseLoading, rcLoading]);

  // Debounced API call function
  const debouncedApiCall = useCallback((type, inputValue) => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setUpdateLoading(true);
    debounceRef.current = setTimeout(() => {
      updateRegisterCourse();
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Needed to avoid stale closure on formData
  useEffect(() => {
    if (registerCourseData) debouncedApiCall();
  }, [formData]);

  const cancel = async () => {
    props.handleClose();
  };

  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  // Load the corresponding user's section register settings
  // when the component becomes visible.
  useEffect(() => {
    if (props.visible) {
      console.log(props.id);
      fetchRegisterCourse({ variables: { crn: props.id } });
    }
  }, [props.visible]);

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
              {props.id}
              {langState.header}

              {updateLoading ? (
                <Spinner
                  animation="border"
                  className={styles.icons}
                  role="status"
                />
              ) : (
                <LuServerCog color="#00ead3" className={styles.icons} />
              )}
            </div>
          </Modal.Title>

          <CloseButton
            style={{ marginLeft: user.lang === L.AR_SA ? "0" : "auto" }}
            onClick={cancel}
            variant={`${user.theme === M.DARK ? "white" : ""}`}
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
              <div>{invalidInput}</div>
            </Alert>
          )}
          <div style={{ marginBottom: 12 }}>{langState.instructions}</div>
          <Form className={styles.group} noValidate>
            <Form.Check
              className={styles.radio}
              type="radio"
              id="type-off-button"
            >
              <Form.Check.Input
                name="strategy"
                value={REG_STRATEGY.OFF}
                type="radio"
                onChange={handleChange}
                className={styles.checkers}
                checked={formData.strategy === REG_STRATEGY.OFF}
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
                      <CiCloudOff
                        color="#00D7FF"
                        className={styles["channel-icon"]}
                      />{" "}
                      {langState.offHeader}
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
                      {langState.offContent}
                    </span>
                  </div>
                </div>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check
              type="radio"
              className={styles.radio}
              id="type-default-button"
            >
              <Form.Check.Input
                name="strategy"
                type="radio"
                className={styles.checkers}
                value={REG_STRATEGY.DEFAULT}
                onChange={handleChange}
                checked={formData.strategy === REG_STRATEGY.DEFAULT}
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
                      <BsLightning
                        color="#00D7FF"
                        className={styles["channel-icon"]}
                      />{" "}
                      {langState.defaultHeader}
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
                      {langState.defaultContent}
                    </span>
                  </div>
                </div>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check
              className={styles.radio}
              type="radio"
              id="type-linkedlab-button"
            >
              <Form.Check.Input
                name="strategy"
                type="radio"
                className={styles.checkers}
                onChange={handleChange}
                value={REG_STRATEGY.LINKED_LAB}
                checked={formData.strategy === REG_STRATEGY.LINKED_LAB}
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
                      <GiAtom
                        color="#00D7FF"
                        className={styles["channel-icon"]}
                      />{" "}
                      {langState.linkedLabHeader}
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
                      {langState.linkedLabContent}
                      {formData.strategy === REG_STRATEGY.LINKED_LAB && (
                        <Form.Control
                          className={styles["tele-button"]}
                          placeholder="Linked Lab's CRN"
                          style={{ width: 130 }}
                          value={formData.withAddCrn}
                          onChange={handleChange}
                          name="withAddCrn"
                          type="number"
                        />
                      )}
                    </span>
                  </div>
                </div>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check
              className={styles.radio}
              type="radio"
              id="type-replace-button"
            >
              <Form.Check.Input
                name="strategy"
                type="radio"
                onChange={handleChange}
                className={styles.checkers}
                value={REG_STRATEGY.REPLACE_WITH}
                checked={formData.strategy === REG_STRATEGY.REPLACE_WITH}
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
                      <TbReplaceFilled
                        color="#00D7FF"
                        className={styles["channel-icon"]}
                      />{" "}
                      {langState.replaceHeader}
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
                      {langState.replaceContent}
                      {formData.strategy === REG_STRATEGY.REPLACE_WITH && (
                        <Form.Control
                          className={styles["tele-button"]}
                          placeholder="Course's CRN"
                          style={{ width: 130 }}
                          value={formData.withDropCrn}
                          onChange={handleChange}
                          name="withDropCrn"
                          type="number"
                        />
                      )}
                    </span>
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
          <ul>
            <li>
              Using this feature without cloning your Banner cookies is like
              having good grades but no job.
            </li>
            <li>We use `conditionalAddDrop` when replacing courses.</li>
            <li>We'll notify you thru the same Radar channel.</li>
          </ul>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;
